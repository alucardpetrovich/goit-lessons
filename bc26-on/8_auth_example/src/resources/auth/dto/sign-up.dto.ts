import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  username = "";

  @IsEmail()
  email = "";

  @IsString()
  @IsNotEmpty()
  password = "";
}
