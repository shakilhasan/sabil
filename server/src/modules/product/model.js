const mongoose = require("mongoose");

// schema
const schema = new mongoose.Schema(
  {
    cover: { type: String, required: false },
    images: [{ type: String, required: false }],
    name: { type: String, required: true },
    code: { type: String, unique: true, required: true },
    sku: { type: String, required: false }, // todo: required: true
    tags: [{ type: String, required: false }],
    price: { type: Number, required: true },
    priceSale: { type: Number, required: true },

    totalRating: { type: Number, required: false },
    totalReview: { type: Number, required: false },
    ratings: [
      {
        name: { type: String, required: false },
        starCount: { type: Number, required: false },
        reviewCount: { type: Number, required: false },
      },
    ],
    reviews: [
      {
        id: { type: String, required: false },
        name: { type: String, required: false },
        avatarUrl: { type: String, required: false },
        rating: { type: Number, required: false },
        isPurchased: { type: Boolean, required: false },
        helpful: { type: Number, required: false },
        postedAt: { type: Date, required: false },
      },
    ],

    status: { type: String, required: false },
    inventoryType: { type: String, required: false },
    sizes: [{ type: String, required: false }],
    available: { type: Number, required: false },
    description: { type: String, required: false }, // todo: required: true
    sold: { type: Number, required: false },
    createdAt: { type: String, required: false },
    category: { type: String, required: false },
    gender: { type: String, required: false },
    colors: [{ type: String, required: false }],

    // added later todo: merge both
    cost: { type: Number, required: false },  // todo: required: true
    size: { type: Number, required: false }, // todo: required: true
    manufacturingDate: { type: Date, required: false }, // todo: required: true
    expiryDate: { type: Date, required: false }, // todo: required: true
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      default: "000000000000",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      default: "000000000000",
    },
  },
  { timestamps: true }
);

// indices
// text index for name
schema.index({ name: "text" });

// index for createdAt and updatedAt
schema.index({ createdAt: 1 });
schema.index({ updatedAt: 1 });

// index for sku and size
schema.index({ sku: 1 });
schema.index({ size: 1 });

// index for dates
schema.index({ manufacturingDate: 1 });
schema.index({ expiryDate: 1 });

// index for price and cost
schema.index({ price: 1 });
schema.index({ cost: 1 });

// reference model
const Product = mongoose.model("Product", schema);

const ModelName = "Product";
// reference model
// const Role = mongoose.model("Role", schema);

module.exports = { Model: Product, name: ModelName };
