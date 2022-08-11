const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId },

    product_id: { type: String, required: false },
    name: {
        label:{ type: String, required: false },
        value : {type : String, required:false}
    },
    account: {
        label:{ type: String, required: false },
        value : {type : String, required:false}
    },
    tax: {
        label:{ type: String, required: false },
        value : {type : String, required:false}
    },
    quantity: { type: String, required: false },
    rate: { type: String, required: false },
    unit: {type: mongoose.Schema.Types.Mixed, require: false, default: null},
    amount: { type: Number, required: false },
    
});


module.exports = productSchema;
