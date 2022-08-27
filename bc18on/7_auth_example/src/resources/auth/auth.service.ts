import * as bcrypt from "bcryptjs";
import { Conflict, NotFound, Forbidden } from "http-errors";
import * as jwt from "jsonwebtoken";
import { User, UserModel } from "../users/user.model";
import { SignInDto, SignUpDto } from "./auth.schemas";
import { conf } from "../../config";

export class AuthService {
  private config = conf;

  async signUp(dto: SignUpDto) {
    const { email, username, password } = dto;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Conflict("User with such email already exists");
    }

    const user = await UserModel.create({
      username,
      email,
      passwordHash: await this.hashPassword(password),
    });

    return user;
  }

  async signIn(dto: SignInDto) {
    const { email, password } = dto;
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new NotFound("User with such email not found");
    }

    const isPasswordCorrect = await this.comparePasswords(
      password,
      user.passwordHash
    );
    if (!isPasswordCorrect) {
      throw new Forbidden("password is wrong");
    }

    const token = this.generateToken(user);

    return { user, token };
  }

  async getCurrentUser(userId: string) {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new NotFound("user was not found");
    }

    return user;
  }

  private async hashPassword(password: string) {
    return bcrypt.hash(password, this.config.saltRounds);
  }

  private async comparePasswords(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  private generateToken(user: User): string {
    return jwt.sign({ sub: user._id.toString() }, this.config.jwt.secret, {
      expiresIn: this.config.jwt.expiresIn,
    });
  }
}

export const authService = new AuthService();
