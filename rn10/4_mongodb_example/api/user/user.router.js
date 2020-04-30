import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

// 1. CREATE new user
// 2. READ all users
// 3. READ user by id
// 4. UPDATE existing user
// 5. DELETE existing user

router.post("/", userController.validateCreateUser, userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.put("/:id", userController.validateUpdateUser, userController.updateUser);
router.delete('/:id', userController.deleteUser);

export const userRouter = router;
