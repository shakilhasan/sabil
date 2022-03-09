const contactValidate = require('./contact-request-model');
const productValidate = require('./product-request-model');

const validators = {
    contactSchemaValidate: contactValidate,
    productValidate
};

module.exports = validators;

