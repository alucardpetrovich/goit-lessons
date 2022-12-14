import { Conflict, NotFound, Forbidden } from "http-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getUsersRepository } from "../users/users.repository";
import { SignUpDto } from "./dto/sign-up.dto";
import { getConfig } from "../../config";
import { SignInDto } from "./dto/sign-in.dto";

class AuthService {
  async signUp(dto: SignUpDto) {
    const existingUser = await getUsersRepository().findOne({
      where: { email: dto.email },
    });
    if (existingUser) {
      throw new Conflict("User with such email already exists");
    }

    const passwordHash = await bcrypt.hash(
      dto.password,
      getConfig().bcrypt.costFactor
    );

    const newUser = await getUsersRepository().save({
      username: dto.username,
      email: dto.email,
      passwordHash,
    });

    return newUser;
  }

  async signIn(dto: SignInDto) {
    const user = await getUsersRepository().findOne({
      where: { email: dto.email },
    });
    if (!user) {
      throw new NotFound("User not found");
    }

    const isPasswordCorrect = await bcrypt.compare(
      dto.password,
      user.passwordHash
    );
    if (!isPasswordCorrect) {
      throw new Forbidden("Password is wrong");
    }

    const token = jwt.sign({ sub: user.id }, getConfig().jwt.secret, {
      expiresIn: getConfig().jwt.expiresIn,
    });

    return { user, token };
  }
}

export const authService = new AuthService();
