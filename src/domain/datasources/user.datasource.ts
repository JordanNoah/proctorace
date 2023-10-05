import { RegisterUserDto } from "../dtos/users/register-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class UserDatasource {
    abstract register(registerUserDto: RegisterUserDto):Promise<UserEntity>
    abstract getAll():Promise<UserEntity[]>
    abstract getById(id:Number):Promise<UserEntity | null>
    abstract deleteById(id:Number):Promise<UserEntity>
    abstract update(registerUserDto: RegisterUserDto):Promise<UserEntity | null>
    abstract getByExternalidAndInstitutionId(externalId:number,institutionId:number):Promise<UserEntity | null>
}