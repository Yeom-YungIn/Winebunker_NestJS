import { PickType } from "@nestjs/swagger";
import { User } from "../entity/user.entity";

export class SignUpUserResponseDTO extends PickType(User, ['userName' , 'issued']){
  static of(user: User): SignUpUserResponseDTO {
    return {
      userName: user.userName,
      issued: user.issued,
    }
  }
}