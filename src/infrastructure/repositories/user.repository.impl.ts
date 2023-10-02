import { UserDatasource, UserEntity, UserRepository, RegisterInstitutionDto, RegisterUserDto } from '../../domain'

export class UserRepositoryImpl implements UserRepository {
    constructor(
        private readonly userDatasource: UserDatasource
    ){}

    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.userDatasource.register(registerUserDto)
    }
}