import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSignUpDTO } from './common/dto/user.request.dto';
import { SignUpUserResponseDTO } from './common/dto/user.response.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  signUp(@Body(ValidationPipe) userSignUpDTO: UserSignUpDTO): Promise<SignUpUserResponseDTO> {
    return this.userService.signUp(userSignUpDTO);
  }
}
