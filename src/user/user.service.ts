import bcrypt from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./common/entity/user.entity";
import { SignUpUserResponseDTO } from "./common/dto/user.response.dto";
import { UserSignUpDTO } from "./common/dto/user.request.dto";
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signUp(userSignUpDTO: UserSignUpDTO): Promise<SignUpUserResponseDTO> {
    let {userName, password} = userSignUpDTO;

    password = await this.getHashedPassword(password);

    const user: User = this.userRepository.create({
      userName,
      password,
      issued: new Date(),
      modified: new Date()
    });
    await this.userRepository.save(user);

    return SignUpUserResponseDTO.of(user);
  }

  async getHashedPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
}