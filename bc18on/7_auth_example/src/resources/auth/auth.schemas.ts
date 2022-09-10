import Joi from "joi";

export interface SignUpDto {
  username: string;
  email: string;
  password: string;
}

export interface SignInDto {
  email: string;
  password: string;
}

export const signUpSchema = Joi.object<SignUpDto>({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
});

export const signInSchema = Joi.object<SignInDto>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
