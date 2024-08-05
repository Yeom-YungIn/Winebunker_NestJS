import { Body, Post, ValidationPipe } from "@nestjs/common";
import { AuthCredentialDto } from "../auth/dto/auth-credential.dto";
import { User } from "../auth/entity/user.entity";
import { UserService } from "./user.service";
import { SignUpUserResponseDTO } from "./common/user.response.dto";

export class UserController {
  constructor(
    private readonly userService: UserService
  ) {
  }

  @Post()
  signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<SignUpUserResponseDTO> {
    return this.userService.signUp(authCredentialDto);
  }

}