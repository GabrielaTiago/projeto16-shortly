import joi from "joi";

const signInSchema = joi.object({
  email: joi.string().email().max(50).required(),
  password: joi.string().min(4).max(16).required()
});

const signUpShema = joi.object({
  name: joi.string().max(50).required(),
  email: joi.string().email().max(50).required(),
  password: joi.string().min(4).max(16).required(),
  confirmPassword: joi.ref("password")
});

export { signInSchema, signUpShema };
