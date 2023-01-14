const express = require('express');
require('express-async-errors');
const sequelize = require('./db');
const isAuthenticated = require('./isAuth');
const Order = require('./order.model.js');
const amqp = require('amqplib');

let channel;

async function createOrder(products, userEmail) {
    let total = 0;
    for (let t = 0; t < products.length; ++t) {
        total += +products[t].price;
    }

    products = products.map(product => {
        return product.id;
    });

    const newOrder = await Order.create({
        products,
        creator: userEmail,
        totalPrice: total,
    });

    return newOrder;
}

async function connect() {
    const amqpServer = process.env.RABBITMQ_URL;
    const connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue('ORDER');
}

connect().then(() => {
    channel.consume('ORDER', data => {
        console.log('Consuming ORDER service');
        const { products, userEmail } = JSON.parse(data.content);
        createOrder(products, userEmail)
            .then(newOrder => {
                channel.ack(data);
                channel.sendToQueue(
                    'PRODUCT',
                    Buffer.from(JSON.stringify({ newOrder }))
                );
            })
            .catch(err => {
                console.log(err);
            });
    });
});

const app = express();

app.use(express.json());

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
    console.log(`Orders Service at ${port}`);
});

app.get('/orders', async (req, res) => {
    const results = await Order.findAll();

    res.status(200).json(results);
});

sequelize.sync();
