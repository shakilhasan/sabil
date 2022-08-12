// external imports
const express = require("express");
const { faker } = require("@faker-js/faker");

// internal imports
const { Model: Blog } = require("../../src/modules/blog/model");
const mongoose = require("mongoose");

const router = express.Router();

const findAll = async (req, res) => {
  const items = await Blog.find();
  res.send(items);
};
const getFakeUniqueProductName = () => faker.fake("{{commerce.productName}}");
const getFakeBlog = async () => {
  const user = await mongoose.models.User.aggregate([{$sample: {size: 1}}]);
  return ({
  cover: faker.image.food(640, 480, true),
  title: faker.unique(getFakeUniqueProductName),
  description: faker.commerce.productDescription(),
  view: faker.datatype.number({ max: 20000 }),
  comment: faker.datatype.number({ max: 20000 }),
  share: faker.datatype.number({ max: 20000 }),
  favorite: faker.datatype.number({ max: 20000 }),
  author: {
    name: faker.name.findName(),
    avatarUrl: faker.image.avatar(),
  },
  authorId: user.length && user[0]._id,
  avatarUrl: faker.image.avatar(),
  tags: faker.random.arrayElement(["old", "new", ""]),
  body: faker.lorem.paragraphs(2, "<br/>\n"),
  favoritePerson: [
    {
      name: faker.name.findName(),
      avatarUrl: faker.image.avatar(),
    },
    {
      name: faker.name.findName(),
      avatarUrl: faker.image.avatar(),
    },
  ],
  comments: [
    {
      id: faker.random.hexaDecimal(10),
      name: faker.name.findName(),
      avatarUrl: faker.image.avatar(),
      message: faker.lorem.text(),
      postedAt: faker.date.past(),
      users: [
        {
          id: "43f34f34r3fceewf",
          name: faker.name.findName(),
          avatarUrl: faker.image.avatar(),
        },
      ],
      replyComment: [
        {
          id: faker.random.hexaDecimal(10),
          userId: "43f34f34r3fceewf",
          message: faker.lorem.text(),
          postedAt: faker.date.past(),
        },
      ],
    },
  ],
  createdAt: faker.date.past(),
  updatedAt: faker.date.soon(),
});
};

const store = async (req, res) => {
  const item = new Blog(await getFakeBlog());
  await item.save();
  res.send(item);
};

const deleteMany = async (req, res) => {
  try {
    await Blog.deleteMany({});
    res.send({ message: "success" });
  } catch (err) {
    res.send({ message: "error" });
  }
};
router.post("/", store);
router.get("/", findAll);
router.delete("/", deleteMany);

module.exports = { router, getFakeBlog };
