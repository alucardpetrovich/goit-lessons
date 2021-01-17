import { Router } from "express";

const router = Router();

// /users/:id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log("getting user with id", id);
  res.send(`User ${id} found`);
});

// /users
router.get("/", (req, res) => {
  res.send("users found");
});

export const usersRouter = router;
