import { CustomError, UserDatasource, UserEntity, RegisterUserDto } from '../../domain'
import { InstitutionDatasourceImpl } from './instutution.datasource.impl'
import { SequelizeUser } from "../database/models/User"
import { SequelizeInstitution } from '../database/models/Institution'

export class UserDatasourceImpl implements UserDatasource {
    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        try {
            const {institution,user} = registerUserDto          

            if(typeof institution != 'object') throw CustomError.internalSever('Missing institution structure')

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
                },
                include:[
                    {
                        model:SequelizeInstitution,
                        as:"institution"
                    }
                ]
            })
            
            var userWhitInstitution = await this.getById(userDb.id)

            return userWhitInstitution ?? userDb
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async getAll(): Promise<UserEntity[]> {
        try {
            return await SequelizeUser.findAll({include:[
                {
                    model:SequelizeInstitution,
                    as:"institution"
                }
            ]})
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async getById(id: number): Promise<UserEntity | null> {
        return await SequelizeUser.findOne({
            include:[
                {
                    model:SequelizeInstitution,
                    as:"institution"
                }
            ],
            where:{
                id:id
            }
        });
    }

    async deleteById(id: number): Promise<UserEntity> {
        try {
            var user = await this.getById(id)
            if(!user) throw CustomError.notFound('User not found')

            await SequelizeUser.destroy({
                where:{
                    id:id
                }
            })
            return user;
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async update(registerUserDto: RegisterUserDto): Promise<UserEntity | null> {
        try {
            const {institution,user} = registerUserDto          

            if(typeof institution != 'object') throw CustomError.internalSever('Missing institution structure')

            var institutionDb = await new InstitutionDatasourceImpl().getByShortnameAndModality(institution)
            
            if (!institutionDb) throw CustomError.notFound('Institution not found')

            var userDb = await this.getByExternalidAndInstitutionId(user.id,institutionDb.id)
            if(!userDb) throw CustomError.notFound('User not found')
            await SequelizeUser.update({
                externalId:user.id,
                institutionId:institutionDb.id,
                userName:user.username,
                fullName:`${user.firstname} ${user.lastname}`
            },{
                where:{
                    externalId:user.id,
                    institutionId:institutionDb.id,
                }
            })

            return await this.getByExternalidAndInstitutionId(user.id,institutionDb.id)
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }    
    }

    async getByExternalidAndInstitutionId(externalId: number, institutionId: number): Promise<UserEntity | null> {
        try {
            if(!externalId) throw CustomError.badRequest('missing external id')
            if(!institutionId) throw CustomError.badRequest('missing institution id')

            return await SequelizeUser.findOne({
                where:{
                    externalId:externalId,
                    institutionId:institutionId
                }
            })

        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
}