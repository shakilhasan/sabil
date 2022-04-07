const mongoose = require('mongoose');
const {array} = require("joi");

// schema
const productSchema = new mongoose.Schema({
    cover: {type: String, required: false},
    images: [{type: String, required: false}],
    name: {type: String, required: true},
    code: {type: String, unique: true, required: true},
    sku: {type: String, required: false},
    tags: [{type: String, required: false}],
    price: {type: Number, required: true},
    priceSale: {type: Number, required: true},

    totalRating: {type: Number, required: false},
    totalReview: {type: Number, required: false},
    ratings:[{
        name: {type: String, required: false},
        starCount: { type: Number, required: false },
        reviewCount: { type: Number, required: false },
    }],
    reviews:[{
        id: {type: String, required: false},
        name : {type : String, required : false},
        avatarUrl: {type: String, required: false},
        rating: {type: Number, required: false},
        isPurchased: {type: Boolean, required: false},
        helpful: {type: Number, required: false},
        postedAt: {type: Date, required: false},

    }],

    status: {type: String, required: false},
    inventoryType: {type: String, required: false},
    sizes: [{type: String, required: false}],
    available: {type: Number, required: false},
    description: {type: String, required: false},
    sold: {type: Number, required: false},
    createdAt: {type: String, required: false},
    category: {type: String, required: false},
    gender: {type: String, required: false},
    colors: [{type: String, required: false}],

})

//reference model
Product = new mongoose.model('Product', productSchema);

Product.createNew = async (product) => {
    product._id = new mongoose.Types.ObjectId();
    const model = new Product(product);
    return model;
}

module.exports = Product;
