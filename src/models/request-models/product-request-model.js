const Joi = require('joi');

const schema = Joi.object().keys({
    name: Joi.string().min(0).max(30).required(),
    code: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().allow('').optional(),
    sku: Joi.string().allow('').optional(),
    cost: Joi.number().required(),
    stock: Joi.number().required(),
    price: Joi.number().required(),
    files: Joi.array().allow('').optional(),
    clientId: Joi.string().required()
});

const validate = (data) => {
    const result = schema.validate(data);
    data.createAt = new Date();
    data.updatedAt = new Date();
    result.value = data;
    return result;
};

module.exports = validate;