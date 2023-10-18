import { CustomError } from "../../domain";
import { CourseDatasource } from "../../domain/datasources/course.datasource";
import { DeleteCourseMdlDto } from "../../domain/dtos/courses/delete-course-mdl.dto";
import { RegisterCourseDto } from "../../domain/dtos/courses/register-course.dto";
import { CourseEntity } from "../../domain/entities/course.entity";
import { SequelizeCourse } from "../database/models/Course";
import { SequelizeInstitution } from "../database/models/Institution";
import { InstitutionDatasourceImpl } from "./instutution.datasource.impl";

export class CourseDatasourceImpl implements CourseDatasource {
    async register(registerCourseDto: RegisterCourseDto): Promise<CourseEntity> {
        try {
            const {institution, course} = registerCourseDto

            if(typeof institution != 'object') throw CustomError.internalSever('Missing institution structure')

            var institutionDb = await new InstitutionDatasourceImpl().getByShortnameAndModality(institution)
            
            if (!institutionDb) throw CustomError.notFound('Institution not found')

            var [courseDb,created] = await SequelizeCourse.findOrCreate({
                where:{
                    externalId:course.id,
                    institutionId:institutionDb.id
                },
                defaults:{
                    externalId:course.id,
                    institutionId:institutionDb.id,
                    name:course.fullname,
                    shortName:course.shortname,
                    idNumber:course.idnumber,
                    startDate:course.startdate,
                    endDate: course.enddate
                },
                include:[
                    {
                        model:SequelizeInstitution,
                        as:"institution"
                    }
                ]
            })

            var courseWithInstitution = await this.getById(courseDb.id)

            return courseWithInstitution ?? courseDb
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async getById(id: number): Promise<CourseEntity | null> {
        try {
            return await SequelizeCourse.findOne({
                where:{
                    id:id
                },
                include:[
                    {
                        model:SequelizeInstitution,
                        as:"institution"
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

    async getAll(): Promise<CourseEntity[]> {
        try {
            return await SequelizeCourse.findAll({
                include:[
                    {
                        model:SequelizeInstitution,
                        as:"institution"
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

    async deleteById(id: number): Promise<CourseEntity> {
        var courseWithInstitution = await this.getById(id)
        if(!courseWithInstitution) throw CustomError.notFound('Course not found')

        await SequelizeCourse.destroy({
            where:{
                id:id
            }
        })
        return courseWithInstitution
    }

    async update(registerCourseDto:RegisterCourseDto): Promise<CourseEntity | null> {
        try {
            const {institution,course} = registerCourseDto          

            if(typeof institution != 'object') throw CustomError.internalSever('Missing institution structure')

            var institutionDb = await new InstitutionDatasourceImpl().getByShortnameAndModality(institution)
            
            if (!institutionDb) throw CustomError.notFound('Institution not found')

            var courseDb = await this.getByExternalIdAndInstitutionId(course.id,institutionDb.id)
            if(!courseDb) throw CustomError.notFound('Course not found')

            await SequelizeCourse.update({
                externalId:course.id,
                institutionId:institutionDb.id,
                name:course.fullname,
                shortName:course.shortname,
                idNumber:course.idnumber,
                startDate:course.startdate,
                endDate:course.enddate
            },{
                where:{
                    externalId:course.id,
                    institutionId:institutionDb.id
                }
            })

            return await this.getByExternalIdAndInstitutionId(course.id,institutionDb.id)
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async getByExternalIdAndInstitutionId(externalId:number,institutionId:number){
        try{
            if(!externalId) throw CustomError.badRequest('missing external id')
            if(!institutionId) throw CustomError.badRequest('missing institution id')

            return await SequelizeCourse.findOne({
                where:{
                    externalId:externalId,
                    institutionId:institutionId
                }
            })
        } catch(error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async deleteByExternalId(deleteByExternalId: DeleteCourseMdlDto): Promise<CourseEntity> {
        try {
            const {institution,courseid} = deleteByExternalId

            if(typeof institution != 'object') throw CustomError.internalSever('Missing institution structure')

            var institutionDb = await new InstitutionDatasourceImpl().getByShortnameAndModality(institution)
            if (!institutionDb) throw CustomError.notFound('Institution not found')

            var course = await this.getByExternalIdAndInstitutionId(courseid,institutionDb.id)
            if(!course) throw CustomError.notFound('Course not found')

            await this.deleteById(course.id)

            return course;
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
}