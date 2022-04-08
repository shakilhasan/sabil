// external imports
const express = require("express");
const { faker } = require('@faker-js/faker');

// internal imports
const Model = require('../../src/models/data-models');
const Product = Model.Product;

const router = express.Router();

const findAll = async (req, res) => {
    const products = await Product.find()
    res.send(products);
}


const getFakeProduct = async () => {
    //Randomly selects the specified number of documents
    // const category=await Model.categoryModel.aggregate([{ $sample: { size: 1 } }]);
    return {
        cover: faker.image.food(640, 480, true),
        images: [faker.image.food(640, 480, false)],
        name: faker.commerce.productName(),
        code: faker.random.hexaDecimal(10),
        sku: faker.random.hexaDecimal(10),
        tags: [faker.commerce.productAdjective(), faker.commerce.productMaterial()],
        price: faker.datatype.number({max:20000}),
        priceSale: faker.datatype.number({max:20000}),

        totalRating: faker.datatype.number({max:20000}),
        totalReview: faker.datatype.number({max:2000}),
        ratings:[{
            name: faker.word.adjective(100),
            starCount: faker.datatype.number({max:20}),
            reviewCount: faker.datatype.number({max:20}),
        }],
        reviews:[{
            id: faker.random.hexaDecimal(10),
            name : faker.name.findName(),
            avatarUrl: faker.image.avatar(),
            rating: faker.datatype.number({max:20}),
            isPurchased: faker.datatype.boolean(),
            helpful: faker.datatype.number({max:1000}),
            postedAt: faker.datatype.datetime(),

        }],

        status: faker.random.arrayElement(['sale','new','' ]),
        inventoryType: faker.random.arrayElement(['in_stock','out_of_stock' ]),
        sizes: ['10','11','12','13','14','15','16','17','18','19'],
        available: faker.datatype.number({max:2000}),
        description: faker.commerce.productDescription(),
        sold: faker.datatype.number({max:20000}),
        createdAt: Date.now().toString(),
        category: faker.commerce.productMaterial(),
        gender: faker.random.arrayElement(['Male', 'Female']),
        colors: [
            faker.internet.color(),
            faker.internet.color(),
            faker.internet.color(),
        ],
    }
}
const store = async (req, res) => {
    const product = new Product(await getFakeProduct());
    await product.save();
    res.send(product);
}

const deleteMany = async (req, res) => {
    try {
        await Product.deleteMany({ item_category: null });
        res.send({ message: 'success' });
    } catch (err) {
        res.send({ message: 'error' });
    }
}
router.post('/', store)
router.get('/', findAll)
router.delete('/', deleteMany)


module.exports = router;