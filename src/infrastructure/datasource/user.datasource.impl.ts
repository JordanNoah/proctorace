import { CustomError, UserDatasource, UserEntity, RegisterUserDto } from '../../domain'
import { SequelizeUser } from "../database/models/User"

export class UserDatasourceImpl implements UserDatasource {
    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        try {
            //por hacer
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
}