import { RegisterUserDto } from "../dtos/users/register-user.dto";
import { UserEntity } from "../entities/user.entity"

export abstract class UserRepository {
    abstract register(registerUserDto: RegisterUserDto):Promise<UserEntity>
}