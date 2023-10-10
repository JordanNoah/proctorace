import { CustomError } from "../../domain";
import { RoleDatasource } from "../../domain/datasources/role.datasource";
import { RegisterRoleDto } from "../../domain/dtos/role/register-role.dto";
import { RoleEntity } from "../../domain/entities/role.entity";
import { SequelizeInstitution } from "../database/models/Institution";
import { SequelizeRole } from "../database/models/Role";
import { InstitutionDatasourceImpl } from "./instutution.datasource.impl";

export class RoleDatasourceImpl implements RoleDatasource {
    async register(registerRoleDto: RegisterRoleDto): Promise<RoleEntity> {
        try {
            const {institution,role} = registerRoleDto
            if(typeof institution != 'object') throw CustomError.internalSever('Missing institution structure')

            var institutionDb = await new InstitutionDatasourceImpl().getByShortnameAndModality(institution)
            
            if (!institutionDb) throw CustomError.notFound('Institution not found')

            var [roleDb, created] = await SequelizeRole.findOrCreate({
                where:{
                    externalId:role.id,
                    institutionId:institutionDb.id
                },
                defaults:{
                    externalId: role.id,
                    name: role.name,
                    shortname: role.shortname,
                    institutionId: institutionDb.id,
                    description: role.description,
                    archetype: role.archetype
                },
                include:[
                    {
                        model:SequelizeInstitution,
                        as:"institution"
                    }
                ]
            })

            if(!roleDb) throw CustomError.notFound('Role not found')

            var roleWithInstitution = await this.getById(roleDb.id)

            return roleWithInstitution ?? roleDb;
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async getById(id: number): Promise<RoleEntity | null> {
        try {
            return await SequelizeRole.findOne({
                include:[
                    {
                        model:SequelizeInstitution,
                        as:"institution"
                    }
                ],
                where:{
                    id:id
                }
            })
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async getAll(): Promise<RoleEntity[]> {
        try {
            return await SequelizeRole.findAll(
                {
                    include:[
                        {
                            model:SequelizeInstitution,
                            as:"institution"
                        }
                    ]
                }
            )
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async deleteById(id: number): Promise<RoleEntity> {
        try {
            var role = await this.getById(id)
            if(!role) throw CustomError.notFound('Role not found')

            await SequelizeRole.destroy({
                where:{
                    id:id
                }
            })
            return role
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async update(registerRoleDto: RegisterRoleDto): Promise<RoleEntity | null> {
        const {institution,role} = registerRoleDto
            if(typeof institution != 'object') throw CustomError.internalSever('Missing institution structure')

            var institutionDb = await new InstitutionDatasourceImpl().getByShortnameAndModality(institution)
            
            if (!institutionDb) throw CustomError.notFound('Institution not found')

            var roleDb = await this.getByExternalidAndInstitutionId(role.id,institutionDb.id)
            if(!roleDb) throw CustomError.notFound('Role not found')
            await SequelizeRole.update({
                externalId: role.id,
                name: role.name,
                shortname: role.shortname,
                institutionId: institutionDb.id,
                description: role.description,
                archetype: role.archetype
            },{
                where:{
                    externalId:role.id,
                    institutionId:institutionDb.id
                }
            })

            return await this.getByExternalidAndInstitutionId(role.id,institutionDb.id)
    }
    async getByExternalidAndInstitutionId(externalId: number, institutionId: number): Promise<RoleEntity | null> {
        try {
            if(!externalId) throw CustomError.badRequest('missing external id')
            if(!institutionId) throw CustomError.badRequest('missing institution id')

            return await SequelizeRole.findOne({
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