import Joi from "joi";

const schema = Joi.object().keys({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
  address: Joi.string().required(),
  area: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  postcode: Joi.string().alphanum().required(),
  country: Joi.string().required(),
});

const validate = (data:any) => {
  const result = schema.validate(data);
  result.value = data;
  return result;
};

export { validate };
