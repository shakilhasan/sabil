const mongoose = require("mongoose");
const productSchema = require('./productSchema');

// schema
const schema = new mongoose.Schema(
    {
        customer: {type : mongoose.Schema.Types.ObjectId, ref: 'customer', required: null},
        invoice: {type : mongoose.Schema.Types.ObjectId, ref: 'invoice', require: false, default: null},
        customer_address: {type: mongoose.Schema.Types.Mixed, require: false, default: null},
        sales_order_number: {type : String, required: true},
        status: {type : String, required: false},
        reference: {type: String, required: false},
        sales_order_date: {type: String, required: true},
        expected_shipment_date: {type: String, required: false},
        payment_terms: {type: String, required: false},
        delivery_method: {type: String, required: false},
        payment_method: {type: mongoose.Schema.Types.Mixed, required: false},
        bdtPromotionList: { type: Array, required: false, default: null },
        percentPromotionList: { type: Array, required: false, default: null },
        totalPromotion: { type: Number, required: false, default: null },
        warehouse: {type: mongoose.Schema.Types.ObjectId, ref: 'warehouse'},
        sales_person: {type: String, required : false},
        // productList: [productSchema],
        products: [],
        discount_value: {type: Number, required: false},
        shipping : {type: Number, required: false},
        delivery_charge : {type: Number, required: false},
        adjustment: {type: Number, required: false},
        taxAmount: {type: Number, required: false},
        customer_notes: { type: String, required: false },
        terms_and_condition: { type: String, required: false },
        attachment: { type: String, required: false },
        subtotal: { type: Number, required: false },
        total: { type: Number, required: false },
        discount_type: { type: String, required: false },
        discount:  { type: Number, required: false },
        total_quantity: { type: Number, required: true, default: 0 },
        total_packaged: { type: Number, required: true, default: 0 },
        total_invoiced: { type: Number, required: true, default: 0 },
    },
  { timestamps: true }
);

// indices
// text index for name
// schema.index({ title: "text" });

// index for createdAt and updatedAt
schema.index({ createdAt: 1 });
schema.index({ updatedAt: 1 });

// reference model
const Blog = mongoose.model("SalesOrder", schema);
const ModelName = "SalesOrder";

module.exports = { Model: Blog, name: ModelName };
