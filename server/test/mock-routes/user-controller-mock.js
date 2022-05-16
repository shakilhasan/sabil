// external imports
const express = require("express");
const { faker } = require("@faker-js/faker");

// internal imports
const { Model: User } = require("../../src/modules/auth/model");
const bcrypt = require("bcrypt");

const router = express.Router();

const findAll = async (req, res) => {
  const items = await User.find();
  res.send(items);
};

const getFakeUser = async () => ({
  firstName: faker.name.firstName("male"),
  lastName: faker.name.lastName("male"),
  username: faker.internet.userName(),
  displayName: faker.name.title(),
  phoneNumber: faker.phone.phoneNumber('+8801#########'),
  email: faker.internet.email(),
  roleName: 'User', // todo: add real-role
  roleId: "625819b25236a335c166de36", // todo -
  roleAlias: "User", // todo -
  passwordHash: await bcrypt.hash("sabil1234", 10),
  address: faker.address.streetAddress(true),

  photoURL: faker.image.avatar(),
  country: faker.address.county(),
  state: faker.address.state(),
  city: faker.address.cityName(),
  zipCode: faker.address.zipCode(),
  about: faker.name.title() ,
  company: faker.company.companyName(),
  status: faker.random.arrayElement(['active', 'banned']),
  isPublic:  true,
  isVerified: true,

});

const store = async (req, res) => {
  const items = new User(await getFakeUser());
  await items.save();
  res.send(items);
};

const deleteMany = async (req, res) => {
  try {
    await User.deleteMany({});
    res.send({ message: "success" });
  } catch (err) {
    res.send({ message: "error" });
  }
};
router.post("/", store);
router.get("/", findAll);
router.delete("/", deleteMany);

module.exports = { router, getFakeUser };
