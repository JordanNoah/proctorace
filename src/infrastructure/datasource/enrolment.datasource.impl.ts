import { CustomError } from "../../domain";
import { EnrolmentDatasource } from "../../domain/datasources/enrolment.datasource";
import { RegisterEnrolmentDto } from "../../domain/dtos/enrolment/register-enrolment.dto";
import { EnrolmentEntity } from "../../domain/entities/enrolment.entity";
import { SequelizeCourse } from "../database/models/Course";
import { SequelizeEnrolment } from "../database/models/Enrolment";
import { SequelizeInstitution } from "../database/models/Institution";
import { SequelizeUser } from "../database/models/User";
import { CourseDatasourceImpl } from "./course.datasource.impl";
import { InstitutionDatasourceImpl } from "./instutution.datasource.impl";
import { UserDatasourceImpl } from "./user.datasource.impl";

export class EnrolmentDatasourceImpl implements EnrolmentDatasource {
    async register(registerEnrolmentDto: RegisterEnrolmentDto): Promise<EnrolmentEntity> {
        try {
            const {institution, enrolment} = registerEnrolmentDto

            if(typeof institution != 'object') throw CustomError.internalSever('Missing institution structure')

            var institutionDb = await new InstitutionDatasourceImpl().getByShortnameAndModality(institution)
            
            if (!institutionDb) throw CustomError.notFound('Institution not found')

            var courseDb = await new CourseDatasourceImpl().getByExternalIdAndInstitutionId(enrolment.courseid,institutionDb.id)

            if(!courseDb) throw CustomError.notFound('Course not found')

            var userDb = await new UserDatasourceImpl().getByExternalidAndInstitutionId(enrolment.userid,institutionDb.id)

            if(!userDb) throw CustomError.notFound('User not found')

            var [enrolmentDb,created] = await SequelizeEnrolment.findOrCreate({
                where:{
                    externalId:enrolment.id,
                    institutionId:institutionDb.id,
                    courseId:courseDb.id
                },
                defaults:{
                    externalId: enrolment.id,
                    institutionId: institutionDb.id,
                    userId: userDb.id,
                    courseId: courseDb.id,
                    status: enrolment.status,
                    startDate: enrolment.timestart,
                    endDate: enrolment.timeend
                },
                include:[
                    {
                        model:SequelizeInstitution,
                        as:"institution"
                    },
                    {
                        model:SequelizeCourse,
                        as:"course"
                    },
                    {
                        model:SequelizeUser,
                        as:"user"
                    }
                ]
            })

            var enrolmentWithInstitution = await this.getById(enrolmentDb.id)

            return enrolmentWithInstitution ?? enrolmentDb
        } catch (error) {
            if (error instanceof CustomError) {
                throw error.message;
            }
                        
            throw CustomError.internalSever()
        }
    }
    async getById(id: number): Promise<EnrolmentEntity | null> {
        try {
            return await SequelizeEnrolment.findOne({
                where:{
                    id
                },
                include:[
                    {
                        model:SequelizeInstitution,
                        as:"institution"
                    },
                    {
                        model:SequelizeCourse,
                        as:"course"
                    },
                    {
                        model:SequelizeUser,
                        as:"user"
                    }
                ]
            })
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async getAll(): Promise<EnrolmentEntity[]> {
        try {
            return await SequelizeEnrolment.findAll({
                include:[
                    {
                        model:SequelizeCourse,
                        as:"course"
                    },
                    {
                        model:SequelizeInstitution,
                        as:"institution"
                    },
                    {
                        model:SequelizeUser,
                        as:"user"
                    }
                ]
            })
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async deleteById(id: number): Promise<EnrolmentEntity> {
        try {
            var enrolment = await this.getById(id)
            if(!enrolment) throw CustomError.notFound('Enrolment not found')

            await SequelizeEnrolment.destroy({
                where:{
                    id
                }
            })
            return enrolment
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async update(registerEnrolmentDto: RegisterEnrolmentDto): Promise<EnrolmentEntity | null> {
        try {
            const {institution, enrolment} = registerEnrolmentDto

            if(typeof institution != 'object') throw CustomError.internalSever('Missing institution structure')

            var institutionDb = await new InstitutionDatasourceImpl().getByShortnameAndModality(institution)
            if (!institutionDb) throw CustomError.notFound('Institution not found')

            var courseDb = await new CourseDatasourceImpl().getByExternalIdAndInstitutionId(enrolment.courseid,institutionDb.id)
            if(!courseDb) throw CustomError.notFound('Course not found')

            var userDb = await new UserDatasourceImpl().getByExternalidAndInstitutionId(enrolment.userid,institutionDb.id)
            if(!userDb) throw CustomError.notFound('User not found')

            var enrolmentDb = await this.getByExternalidInstitutionCourseUser(
                enrolment.id,
                institutionDb.id,
                courseDb.id,
                userDb.id
            )
            if(!enrolmentDb) throw CustomError.notFound('Enrolment not found')

            await SequelizeEnrolment.update({
                externalId: enrolment.id,
                institutionId: institutionDb.id,
                userId: userDb.id,
                courseId: courseDb.id,
                status: enrolment.status,
                startDate: enrolment.timestart,
                endDate: enrolment.timeend
            },{
                where:{
                    externalId:enrolment.id,
                    institutionId:institutionDb.id,
                    courseId:courseDb.id,
                    userId:userDb.id
                }
            })

            return await this.getByExternalidInstitutionCourseUser(
                enrolment.id,
                institutionDb.id,
                courseDb.id,
                userDb.id
            )
        } catch (error) {
            if (error instanceof CustomError) {
                throw error.message;
            }
            throw CustomError.internalSever()
        }
    }

    async getByExternalidInstitutionCourseUser(externalId: number, institutionId: number, courseId: number, userId: number): Promise<EnrolmentEntity | null> {
        try {
            if(!externalId) throw CustomError.badRequest('Missing external id')                
            if(!institutionId) throw CustomError.badRequest('Missing institution id')
            if(!courseId) throw CustomError.badRequest('Missing course id')
            if(!userId) throw CustomError.badRequest('Missing user id')

            return await SequelizeEnrolment.findOne({
                where:{
                    externalId:externalId,
                    institutionId:institutionId,
                    courseId:courseId,
                    userId:userId
                }
            })
        } catch (error) {
            console.log(error);
            
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
}