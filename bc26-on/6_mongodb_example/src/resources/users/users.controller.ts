import { Router } from "express";
import { catchErrors } from "../../shared/middlewares/catch-error";
import { validateRequest } from "../../shared/middlewares/validate";
import { transform } from "../../shared/transformer";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserResponseSerializer } from "./serializers/user-response.serializer";
import { UsersListSerializer } from "./serializers/users-list.serializer";
import { usersService } from "./users.service";

const router = Router();

router.post(
  "/",
  validateRequest(CreateUserDto),
  catchErrors(async (req, res) => {
    // 1. validate req body +
    // 2. create id for user +
    // 3. save user in DB +
    // 4. send successful response

    const user = await usersService.create(req.body);

    res.status(201).send(transform(UserResponseSerializer, { user }));
  })
);

router.get(
  "/",
  catchErrors(async (req, res) => {
    const users = await usersService.getUsers();

    res.send(transform(UsersListSerializer, { users }));
  })
);

export const usersController = router;
