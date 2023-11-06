import mongoose from "mongoose";

// schema
const schema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    alias: { type: String, unique: true, required: true },
    type: { type: String, required: true },
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

schema.index({ type: 1 });

// index for createdAt and updatedAt
schema.index({ createdAt: 1 });
schema.index({ updatedAt: 1 });

const resourceModelName = "Resource";
const Resource = mongoose.model(resourceModelName, schema);

export { Resource, resourceModelName };
