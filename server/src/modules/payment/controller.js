/* eslint-disable no-undef */
const express = require("express");
const mongoose = require("mongoose");
const eventEmitter = require("nodemon");
const { getQuery } = require("./service");
const {
  getByIdHandler,
  saveHandler,
  updateHandler,
  searchHandler: baseSearchHandler,
  countHandler: baseCountHandler,
  deleteHandler,
} = require("../../core/controller");
const { NotFound } = require("../../common/errors");
const SSLCommerzPayment = require('sslcommerz-lts');
const store_id = 'alama63180fd348dbd';
const store_passwd = 'alama63180fd348dbd@ssl';
const is_live = false; //true for live, false for sandbox
const router = express.Router();

const searchHandler = async (req, res, next) => {
  const user = await mongoose.models.User.findOne({ _id: req.user.id });
  req.searchQuery = getQuery(req.body, user.followings);
  return baseSearchHandler(req, res, next);
};

//sslcommerz init
const getInitHandler = async (req, res, next) => {
  const data = {
    total_amount: 100,
    currency: 'BDT',
    tran_id: 'REF123', // use unique tran_id for each api call
    success_url: 'http://localhost:3030/success',
    fail_url: 'http://localhost:3030/fail',
    cancel_url: 'http://localhost:3030/cancel',
    ipn_url: 'http://localhost:3030/ipn',
    shipping_method: 'Courier',
    product_name: 'Computer.',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: 'Customer Name',
    cus_email: 'customer@example.com',
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '01711111111',
    cus_fax: '01711111111',
    ship_name: 'Customer Name',
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  };
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
  sslcz.init(data).then(apiResponse => {
    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL;
    // res.redirect(GatewayPageURL);
    console.log('Redirecting to: ', GatewayPageURL);
    return res.status(200).send({ GatewayPageURL });
  });
};

//sslcommerz validation
const getValidateHandler = async (req, res, next) => {
  const data = {
    val_id:'ADGAHHGDAKJ456454' //that you go from sslcommerz response
  };
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz.validate(data).then(data => {
    //process the response that got from sslcommerz
    // https://developer.sslcommerz.com/doc/v4/#order-validation-api
  });
};
router.get("/init", getInitHandler);
router.get("/validate", getValidateHandler);
router.get("/detail", getByIdHandler);
router.post(
  "/create",
  // handleValidation(validate),
  saveHandler
);
router.put(
  "/update",
  // handleValidation(validate),
  updateHandler
);
router.post("/search", searchHandler);
router.delete("/delete", deleteHandler);

module.exports = router;
