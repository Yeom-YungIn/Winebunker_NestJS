import { AuthCredentialDto } from "../auth/dto/auth-credential.dto";
import bcrypt from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./common/entity/user.entity";
import { SignUpUserResponseDTO } from "./common/user.response.dto";
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signUp(authCredentialDto: AuthCredentialDto): Promise<SignUpUserResponseDTO> {
    let {userName, password} = authCredentialDto;

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