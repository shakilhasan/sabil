// external imports
import express from "express";
import {faker} from "@faker-js/faker";

// internal imports
import {User} from "../../src/modules/user/model";
import bcrypt from "bcrypt";

const router = express.Router();

const findAll = async (req:any, res:any) => {
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

const store = async (req:any, res:any) => {
  const items = new User(await getFakeUser());
  await items.save();
  res.send(items);
};

const deleteMany = async (req:any, res:any) => {
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

export { router, getFakeUser };
