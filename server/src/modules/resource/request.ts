import Joi from "joi";

const schema = Joi.object().keys({
    _id: Joi.string().optional(),
    name: Joi.string().min(2).max(30).required(),
    alias: Joi.string().required(),
    type: Joi.string().required(),
});

const validate = (data: any) => {
    const result = schema.validate(data);
    result.value = data;
    return result;
};

export {validate};
