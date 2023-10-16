import { CustomError } from "../../domain";
import { RoleDatasource } from "../../domain/datasources/role.datasource";
import { AssignedMdlDto } from "../../domain/dtos/role/assigned-mdl.dto";
import { RegisterRoleDto } from "../../domain/dtos/role/register-role.dto";
import { UnassignedMdlDto } from "../../domain/dtos/role/unassigned-mdl.dto";
import { RoleEntity } from "../../domain/entities/role.entity";
import { RoleAssignedEntity } from "../../domain/entities/roleAssigned";
import { SequelizeCourse } from "../database/models/Course";
import { SequelizeEnrolment } from "../database/models/Enrolment";
import { SequelizeInstitution } from "../database/models/Institution";
import { SequelizeRole } from "../database/models/Role";
import { SequelizeRoleAssigned } from "../database/models/RoleAssigned";
import { SequelizeUser } from "../database/models/User";
import { CourseDatasourceImpl } from "./course.datasource.impl";
import { EnrolmentDatasourceImpl } from "./enrolment.datasource.impl";
import { InstitutionDatasourceImpl } from "./instutution.datasource.impl";
import { UserDatasourceImpl } from "./user.datasource.impl";

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
    async assigned(assignedMdlDto: AssignedMdlDto): Promise<RoleAssignedEntity | null> {
        try {
            const {institution,role} = assignedMdlDto
            
            if(typeof institution != 'object') throw CustomError.internalSever('Missing institution structure')
            var institutionDb = await new InstitutionDatasourceImpl().getByShortnameAndModality(institution)
            if (!institutionDb) throw CustomError.notFound('Institution not found')

            var courseDb = await new CourseDatasourceImpl().getByExternalIdAndInstitutionId(role.courseid,institutionDb.id)
            if(!courseDb) throw CustomError.notFound('Course not found')

            var userDb = await new UserDatasourceImpl().getByExternalidAndInstitutionId(role.userid,institutionDb.id)
            if(!userDb) throw CustomError.notFound('User not found')

            var enrolmentDb = await new EnrolmentDatasourceImpl().getByExternalidInstitutionCourseUser(
                role.enrolmentId,
                institutionDb.id,
                courseDb.id,
                userDb.id
            )//en este caso el context id es el id de enrolment en moodle

            if(!enrolmentDb) throw CustomError.notFound('Enrollment not found')

            var roleDb = await new RoleDatasourceImpl().getByExternalidAndInstitutionId(role.roleid,institutionDb.id)
            if(!roleDb) throw CustomError.notFound('Role not found')

            var [roleAssignedDb,created] = await SequelizeRoleAssigned.findOrCreate({
                where:{
                    externalId:role.id,
                    roleId:roleDb.id,
                    userId:userDb.id,
                    enrolmentId:enrolmentDb.id,
                    courseId:courseDb.id,
                    institutionId:institutionDb.id
                },
                defaults:{
                    externalId:role.id,
                    roleId:roleDb.id,
                    userId:userDb.id,
                    enrolmentId:enrolmentDb.id,
                    courseId:courseDb.id,
                    institutionId:institutionDb.id
                },
                include:[
                    {
                        model:SequelizeRole,
                        as:"role"
                    },
                    {
                        model:SequelizeUser,
                        as:"user"
                    },
                    {
                        model:SequelizeEnrolment,
                        as:"enrolment"
                    },
                    {
                        model:SequelizeCourse,
                        as:"course"
                    },
                    {
                        model:SequelizeInstitution,
                        as:"institution"
                    }
                ]
            })

            return roleAssignedDb
        } catch (error) {
            if (error instanceof CustomError) {
                throw error.message;
            }
            throw CustomError.internalSever()
        }
    }

    async unassigned(unassignedMdlDto: UnassignedMdlDto): Promise<RoleAssignedEntity | null> {
        try {
            const {institution,role} = unassignedMdlDto

            if(typeof institution != 'object') throw CustomError.internalSever('Missing institution structure')
            var institutionDb = await new InstitutionDatasourceImpl().getByShortnameAndModality(institution)
            if (!institutionDb) throw CustomError.notFound('Institution not found')

            var courseDb = await new CourseDatasourceImpl().getByExternalIdAndInstitutionId(role.courseid,institutionDb.id)
            if(!courseDb) throw CustomError.notFound('Course not found')

            var userDb = await new UserDatasourceImpl().getByExternalidAndInstitutionId(role.userid,institutionDb.id)
            if(!userDb) throw CustomError.notFound('User not found')

            var enrolmentDb = await new EnrolmentDatasourceImpl().getByExternalidInstitutionCourseUser(
                role.enrolmentId,
                institutionDb.id,
                courseDb.id,
                userDb.id
            )//en este caso el context id es el id de enrolment en moodle

            if(!enrolmentDb) throw CustomError.notFound('Enrollment not found')

            var roleDb = await new RoleDatasourceImpl().getByExternalidAndInstitutionId(role.roleid,institutionDb.id)
            if(!roleDb) throw CustomError.notFound('Role not found')

            var roleAssignedDb = await this.getAssignedRole(
                role.id,//external id
                roleDb.id,
                userDb.id,
                enrolmentDb.id,
                courseDb.id,
                institutionDb.id
            )

            if(!roleAssignedDb) throw CustomError.notFound('Role assigned not found')

            await SequelizeRoleAssigned.destroy({
                where:{
                    externalId:role.id,//external id
                    roleId:roleDb.id,
                    userId:userDb.id,
                    enrolmentId:enrolmentDb.id,
                    courseId:courseDb.id,
                    institutionId:institutionDb.id
                }
            })

            return roleAssignedDb;
        } catch (error) {
            if (error instanceof CustomError) {
                throw error.message;
            }
            throw CustomError.internalSever()
        }
    }

    async getAssignedRole(externalId: number, roleId: number, userId: number, enrolmentId: number, courseId: number, institutionId: number): Promise<RoleAssignedEntity | null> {
        return SequelizeRoleAssigned.findOne({
            where:{
                externalId:externalId,//external id
                roleId:roleId,
                userId:userId,
                enrolmentId:enrolmentId,
                courseId:courseId,
                institutionId:institutionId
            }
        })
    }
}