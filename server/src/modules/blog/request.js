const Joi = require("joi");

const schema = Joi.object().keys({
  _id: Joi.string().optional(),
  name: Joi.string().min(3).max(50).required(),
  sku: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(3).max(200),
  cost: Joi.number().required(),
  price: Joi.number().required(),
  size: Joi.number().min(1).max(10).required(),
  manufacturingDate: Joi.date().optional(),
  expiryDate: Joi.date().optional(),
  images: Joi.array().optional(), // todo -
  tags: Joi.array().optional(), // todo -
  sizes: Joi.array().optional(), // todo -
  colors: Joi.array().optional(), // todo -
  ratings: Joi.array().optional(), // todo -
  reviews: Joi.array().optional(), // todo -
  createdBy: Joi.string().optional(),
  updatedBy: Joi.string().optional(),
  status: Joi.string().optional().allow(""),
  cover: Joi.string().optional(),
  code: Joi.string().optional(),
  createdAt: Joi.string().optional(),
  updatedAt: Joi.string().optional(),
  category: Joi.string().optional(),
  gender: Joi.string().optional(),
  inventoryType: Joi.string().optional(),
  priceSale: Joi.number().optional(),
  available: Joi.number().optional(),
  sold: Joi.number().optional(),
  totalRating: Joi.number().optional(),
  totalReview: Joi.number().optional(),
  inStock: Joi.boolean().optional(),
  taxes: Joi.boolean().optional(), // todo -

  __v: Joi.number().optional(),
});

const validate = (data) => {
  const result = schema.validate(data);
  const temp = { ...data };
  if (!data.manufacturingDate) {
    temp.manufacturingDate = new Date();
  } else temp.manufacturingDate = new Date(data.manufacturingDate);

  if (!data.expiryDate) {
    temp.expiryDate = new Date(
      new Date() + data.size * 365 * 24 * 60 * 60 * 1000
    );
  }

  result.value = temp;
  return result;
};

module.exports = { validate };
