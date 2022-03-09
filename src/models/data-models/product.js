const mongoose = require('mongoose');

// schema
const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    code: {type: String, unique: true, required: true},
    sku: {type: String, required: false},
    cost: {type: Number, required: true},
    price: {type: Number, required: true},
    clientId: {type: String, required: true},

    createdAt: {type: String, required: true},
    updatedAt: {type: String, required: true}
})

//reference model
Product = new mongoose.model('Product', productSchema);

Product.createNew = async (product) => {
    product._id = new mongoose.Types.ObjectId();
    const model = new Product(product);
    return model;
}

module.exports = Product;
