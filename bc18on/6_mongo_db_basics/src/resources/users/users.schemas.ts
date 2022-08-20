import * as Joi from "joi";
import { isValidObjectId } from "mongoose";

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
}

export interface UpdateUserDto {
  username: string;
}

export const createUserSchema = Joi.object<CreateUserDto>({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const updateUserSchema = Joi.object<UpdateUserDto>({
  username: Joi.string().required(),
});

export const validateIdSchema = Joi.object({
  id: Joi.custom((value, helpers) => {
    if (!isValidObjectId(value)) {
      return helpers.message("Invalid mongodb id" as any);
    }

    return true;
  }),
});
