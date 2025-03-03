import bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './common/entity/user.entity';
import { SignUpUserResponseDTO } from './common/dto/user.response.dto';
import { UserSignUpDTO } from './common/dto/user.request.dto';
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signUp(userSignUpDTO: UserSignUpDTO): Promise<SignUpUserResponseDTO> {
    let { name, password } = userSignUpDTO;

    password = await this.getHashedPassword(password);

    const user: User = this.userRepository.create({
      name,
      password,
    });
    await this.userRepository.save(user);

    return SignUpUserResponseDTO.of(user);
  }

  async findUserById(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  async updateUserRefreshToken(id: string, refreshToken: string) {
    await this.userRepository.update(id, { refreshToken });
  }
  async getHashedPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
}
