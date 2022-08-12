const mongoose = require("mongoose");

// schema
const schema = new mongoose.Schema(
  {
    cover: { type: String, required: false },
    title: { type: String, required: true },
    description: { type: String, required: false }, // todo: required: true
    view: { type: Number, required: false }, // todo: required: true
    comment: { type: Number, required: false }, // todo: required: true
    share: { type: Number, required: false }, // todo: required: true
    favorite: { type: Number, required: false }, // todo: required: true
    author: {
      name: { type: String, required: false },
      avatarUrl: { type: String, required: false },
    },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    avatarUrl: { type: String, required: false },
    tags: [],
    body: { type: String, required: true },
    favoritePerson: [
      {
        name: { type: String, required: false },
        avatarUrl: { type: String, required: false },
      },
    ],
    comments: [
      {
        id: { type: String, required: false },
        name: { type: String, required: false },
        avatarUrl: { type: String, required: false },
        message: { type: String, required: false },
        postedAt: { type: Date, required: false },
        users: [
          {
            id: { type: String, required: false },
            name: { type: String, required: false },
            avatarUrl: { type: String, required: false },
          },
        ],
        replyComment: [
          {
            id: { type: String, required: false },
            userId: { type: String, required: false },
            message: { type: String, required: false },
            postedAt: { type: Date, required: false },
          },
        ],
      },
    ],
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
const Blog = mongoose.model("Blog", schema);
const ModelName = "Blog";

module.exports = { Model: Blog, name: ModelName };
