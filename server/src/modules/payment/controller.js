const express = require("express");
const SSLCommerzPayment = require('sslcommerz-lts');
const store_id = 'alama63180fd348dbd';
const store_passwd = 'alama63180fd348dbd@ssl';
const is_live = false; //true for live, false for sandbox
const router = express.Router();

//sslcommerz init, Initialize a Transaction
const initHandler = async (req, res, next) => {
    const body = req.body;
    const data = {
        total_amount: body.total_amount,
        currency: 'BDT',
        tran_id: 'REF123', // use unique tran_id for each api call
        success_url: 'http://localhost:8001/success',
        fail_url: 'http://localhost:8001/fail',
        cancel_url: 'http://localhost:8001/cancel',
        ipn_url: 'http://localhost:8001/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'shakilhasan105268@gmail.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01981998640',
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
        console.log('SSLCommerzPayment apiResponse ------ ', apiResponse);
        return res.status(200).send({GatewayPageURL, apiResponse});
    });
};

//sslcommerz validation, Validate after successful transaction (inside success and ipn controller methods)
const validateHandler = async (req, res, next) => {
    const body = req.body;

    const data = {
        val_id: body.val_id //'ADGAHHGDAKJ456454' //that you go from sslcommerz response
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    sslcz.validate(data).then(data => {
        //process the response that got from sslcommerz
        // https://developer.sslcommerz.com/doc/v4/#order-validation-api
        return res.status(200).send({data});

    });
};

//SSLCommerz initiateRefund, To initiate a refund through API
const initiateRefundHandler = async (req, res, next) => {
    const body = req.body;
    const data = {
        refund_amount: body.refund_amount, //10,
        refund_remarks: body.refund_remarks,//'',
        bank_tran_id: body.bank_tran_id, //"CB5464321445456456",
        refe_id: body.refe_id //"EASY5645415455",
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.initiateRefund(data).then(data => {
        //process the response that got from sslcommerz
        //https://developer.sslcommerz.com/doc/v4/#initiate-the-refund
        return res.status(200).send({data});
    });
};

//SSLCommerz refundQuery, Query the status of a refund request
const refundQueryHandler = async (req, res, next) => {
    const body = req.body;
    const data = {
        refund_ref_id: body.refund_ref_id //"SL4561445410",
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.refundQuery(data).then(data => {
        //process the response that got from sslcommerz
        //https://developer.sslcommerz.com/doc/v4/#initiate-the-refund
        return res.status(200).send({data});
    });
};

//SSLCommerz transactionQueryByTransactionId, Query the status of a transaction (by Transaction ID)
//you also use this as internal method
const transactionQueryByTransactionIdHandler = async (req, res, next) => {
    const body = req.body;
    const data = {
        tran_id: body.tran_id //AKHLAKJS5456454,
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.transactionQueryByTransactionId(data).then(data => {
        //process the response that got from sslcommerz
        //https://developer.sslcommerz.com/doc/v4/#by-session-id
        return res.status(200).send({data});
    });
};


//SSLCommerz transactionQueryBySessionId, Query the status of a transaction (by session ID)
//you also use this as internal method
const transactionQueryBySessionIdHandler = async (req, res, next) => {
    const body = req.body;
    const data = {
        sessionkey: body.sessionkey //AKHLAKJS5456454,
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    sslcz.transactionQueryBySessionId(data).then(data => {
        //process the response that got from sslcommerz
        //https://developer.sslcommerz.com/doc/v4/#by-session-id
        return res.status(200).send({data});
    });
};

router.post("/init", initHandler);
router.post("/validate", validateHandler);
router.post("/initiate-refund", initiateRefundHandler);
router.post("/refund-query", refundQueryHandler);
router.post("/transaction-query-by-transaction-id", transactionQueryByTransactionIdHandler);
router.post("/transaction-query-by-session-id", transactionQueryBySessionIdHandler);

module.exports = router;
