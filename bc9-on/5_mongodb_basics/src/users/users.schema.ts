import * as Joi from "joi";
import { isValidObjectId } from "mongoose";

export const createUserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export interface CreateUserParams {
  username: string;
  email: string;
  password: string;
}

export const updateUserSchema = Joi.object({
  username: Joi.string().required(),
});

export type UpdateUserParams = Pick<CreateUserParams, "username">;

export const idParamSchema = Joi.object({
  id: Joi.string()
    .required()
    .custom((value, helper) => {
      if (!isValidObjectId(value)) {
        return helper.message(`'${value} is not valid object id'` as any);
      } else {
        return true;
      }
    }),
});
