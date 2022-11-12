import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username = "";

  @IsEmail()
  email = "";

  @IsString()
  @IsNotEmpty()
  password = "";
}
