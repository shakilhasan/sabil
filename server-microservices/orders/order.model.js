const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./db');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    products: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
    },
    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    creator: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Order;
