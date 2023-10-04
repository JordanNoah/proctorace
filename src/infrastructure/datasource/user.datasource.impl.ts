import { CustomError, UserDatasource, UserEntity, RegisterUserDto } from '../../domain'
import { InstitutionDatasourceImpl } from './instutution.datasource.impl'
import { SequelizeUser } from "../database/models/User"

export class UserDatasourceImpl implements UserDatasource {
    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        try {
            const {institution,user} = registerUserDto

            var institutionDb = await new InstitutionDatasourceImpl().getByShortnameAndModality(institution)
            
            if (!institutionDb) throw CustomError.notFound('Institution not found')
            
            var [userDb,created] = await SequelizeUser.findOrCreate({
                where:{
                    externalId:user.id,
                    institutionId:institutionDb.id
                },
                defaults:{
                    externalId:user.id,
                    institutionId:institutionDb.id,
                    userName:user.username,
                    fullName:`${user.firstname} ${user.lastname}`
                }
            })
            return new UserEntity(
                userDb.id,
                userDb.externalId,
                userDb.institutionId,
                userDb.userName,
                userDb.fullName,
                userDb.createdAt,
                userDb.updatedAt
            );
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async getAll(): Promise<UserEntity[]> {
        try {
            return await SequelizeUser.findAll({include:'institutions'})
        } catch (error) {
            console.log(error);
            
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
}