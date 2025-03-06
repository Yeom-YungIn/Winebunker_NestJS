import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './common/entity/user.entity';
import { SignUpUserResponseDTO } from './common/dto/response/user.response.dto';
import { CreateUserDto } from './common/dto/request/create-user.dto';
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { name, password } = createUserDto;

    const hashedPassword = await this.getHashedPassword(password);

    const user: User = this.userRepository.create({
      name,
      password: hashedPassword,
    });

    await this.userRepository.save(user);
  }

  async findUserByName(name: string) {
    return await this.userRepository.findOneBy({ name });
  }

  async updateUserRefreshToken(id: string, refreshToken: string) {
    await this.userRepository.update(id, { refreshToken });
  }

  async getHashedPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
}
