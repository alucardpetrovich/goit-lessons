import { Router } from "express";
import { validateRequest } from "../../shared/middlewares/validate";
import { transform } from "../../shared/transformer";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserResponseSerializer } from "./serializers/user-response.serializer";
import { UsersListSerializer } from "./serializers/users-list.serializer";
import { usersService } from "./users.service";

const router = Router();

router.post("/", validateRequest(CreateUserDto), (req, res) => {
  // 1. validate req body +
  // 2. create id for user +
  // 3. save user in DB +
  // 4. send successful response

  const user = usersService.create(req.body);

  res.status(201).send(transform(UserResponseSerializer, { user }));
});

router.get("/", (req, res) => {
  const users = usersService.getUsers();

  res.send(transform(UsersListSerializer, { users }));
});

export const usersController = router;
