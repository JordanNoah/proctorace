import { UserDatasource, UserEntity, UserRepository, RegisterInstitutionDto, RegisterUserDto } from '../../domain'
import { DeleteUserMdlDto } from '../../domain/dtos/users/delete-user-mdl.dto'

export class UserRepositoryImpl implements UserRepository {
    constructor(
        private readonly userDatasource: UserDatasource
    ){}

    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.userDatasource.register(registerUserDto)
    }

    getAll(): Promise<UserEntity[]> {
        return this.userDatasource.getAll()
    }

    getById(id: Number): Promise<UserEntity | null> {
        return this.userDatasource.getById(id)
    }

    deleteById(id: Number): Promise<UserEntity> {
        return this.userDatasource.deleteById(id)
    }

    update(registerUserDto: RegisterUserDto): Promise<UserEntity | null> {
        return this.userDatasource.update(registerUserDto)
    }

    deleteByExternalId(deleteUserMdlDto: DeleteUserMdlDto): Promise<UserEntity> {
        return this.userDatasource.deleteByExternalId(deleteUserMdlDto)
    }
}