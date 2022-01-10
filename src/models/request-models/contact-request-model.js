const Joi = require("joi");

const schema = Joi.object().keys({
    name: Joi.string().required(),
    number: Joi.string().regex(/^(?:\+88|01)?(?:\d{11}|\d{13})$/).required(),
});

const validate = (data) => {
    const result = schema.validate(data);
    data.createdAt = new Date();
    data.updatedAt = new Date();
    result.value = data;
    return result;
};

module.exports = validate;