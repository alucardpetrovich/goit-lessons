import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
  @IsEmail()
  email = "";

  @IsString()
  @IsNotEmpty()
  password = "";
}
