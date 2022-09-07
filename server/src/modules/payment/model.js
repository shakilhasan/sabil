const mongoose = require("mongoose");

// schema
const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false }, // todo: required: true
  },
  { timestamps: true }
);

// indices
// text index for name
schema.index({ title: "text" });

// index for createdAt and updatedAt
schema.index({ createdAt: 1 });
schema.index({ updatedAt: 1 });

// reference model
const Payment = mongoose.model("Payment", schema);
const ModelName = "Payment";

module.exports = { Model: Payment, name: ModelName };
