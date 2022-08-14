import * as Joi from "joi";

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
}

export const createUserSchema = Joi.object<CreateUserDto>({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
