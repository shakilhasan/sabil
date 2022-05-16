// external imports
const express = require("express");
const { faker } = require("@faker-js/faker");

// internal imports
const { Model: Product } = require("../../src/modules/product/model");

const router = express.Router();

const findAll = async (req, res) => {
  const products = await Product.find();
  res.send(products);
};
const getFakeUniqueProductName = () =>
  faker.fake("{{commerce.productName}} {{datatype.uuid}}");
const getFakeProduct = async () => ({
  cover: faker.image.food(640, 480, true),
  images: [
    faker.image.food(640, 480, true),
    faker.image.food(640, 480, true),
    faker.image.food(640, 480, true),
  ],
  name: faker.unique(getFakeUniqueProductName),
  code: faker.random.hexaDecimal(10),
  sku: faker.helpers.slugify(faker.fake("{{commerce.productName}}")),
  tags: [faker.commerce.productAdjective(), faker.commerce.productMaterial()],
  price: parseFloat(faker.commerce.price()),
  priceSale: parseFloat(faker.commerce.price()),

  totalRating: faker.datatype.number({ max: 20000 }),
  totalReview: faker.datatype.number({ max: 2000 }),
  ratings: [
    {
      name: "1 Star",
      starCount: faker.datatype.number({ max: 2000 }),
      reviewCount: faker.datatype.number({ max: 2000 }),
    },
    {
      name: "2 Star",
      starCount: faker.datatype.number({ max: 2000 }),
      reviewCount: faker.datatype.number({ max: 2000 }),
    },
    {
      name: "3 Star",
      starCount: faker.datatype.number({ max: 2000 }),
      reviewCount: faker.datatype.number({ max: 2000 }),
    },
    {
      name: "4 Star",
      starCount: faker.datatype.number({ max: 2000 }),
      reviewCount: faker.datatype.number({ max: 2000 }),
    },
    {
      name: "5 Star",
      starCount: faker.datatype.number({ max: 2000 }),
      reviewCount: faker.datatype.number({ max: 2000 }),
    },
  ],
  reviews: [
    {
      id: faker.random.hexaDecimal(10),
      name: faker.name.findName(),
      avatarUrl: faker.image.avatar(),
      rating: faker.datatype.number({ max: 20 }),
      isPurchased: faker.datatype.boolean(),
      helpful: faker.datatype.number({ max: 1000 }),
      postedAt: faker.datatype.datetime(),
    },
  ],

  status: faker.random.arrayElement(["sale", "new", ""]),
  inventoryType: faker.random.arrayElement(["in_stock", "out_of_stock"]),
  sizes: ["10", "11", "12", "13", "14", "15", "16", "17", "18", "19"],
  available: faker.datatype.number({ max: 2000 }),
  description: faker.commerce.productDescription(),
  sold: faker.datatype.number({ max: 20000 }),
  createdAt: faker.date.past(),
  category: faker.random.arrayElement(["Accessories", "Apparel", "Shose"]),
  gender: faker.random.arrayElement(["Men", "Women", "Kids"]),
  colors: [
    faker.internet.color(),
    faker.internet.color(),
    faker.internet.color(),
  ],

  // added later todo: merge both
  cost: parseInt(faker.commerce.price(), 10),
  manufacturingDate: faker.date.past(),
  expiryDate: faker.date.future(),
  size: faker.helpers.randomize([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  updatedAt: faker.date.soon(),
});

const store = async (req, res) => {
  const product = new Product(await getFakeProduct());
  await product.save();
  res.send(product);
};

const deleteMany = async (req, res) => {
  try {
    await Product.deleteMany({ item_category: null });
    res.send({ message: "success" });
  } catch (err) {
    res.send({ message: "error" });
  }
};
router.post("/", store);
router.get("/", findAll);
router.delete("/", deleteMany);

module.exports = { router, getFakeProduct };
