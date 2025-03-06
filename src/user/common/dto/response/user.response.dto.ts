import { PickType } from '@nestjs/swagger';
import { User } from '../../entity/user.entity';

export class SignUpUserResponseDTO extends PickType(User, ['name', 'createdAt']) {
  static of(user: User): SignUpUserResponseDTO {
    return {
      name: user.name,
      createdAt: user.createdAt,
    };
  }
}
