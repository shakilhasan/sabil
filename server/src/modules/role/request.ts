import Joi from "joi";

const schema = Joi.object().keys({
  _id: Joi.string().optional(),
  name: Joi.string().min(2).max(30).required(),
  alias: Joi.string().required(),
});

const validate = (data:any, user:any) => {
  const result = schema.validate(data);
  result.value = {
    ...data,
    isSuperAdmin: false,
    isAdmin: false,
    createdBy: user.id,
    updatedBy: user.id,
  };
  return result;
};

export  { validate };
