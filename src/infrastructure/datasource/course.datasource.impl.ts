import { CustomError } from "../../domain";
import { CourseDatasource } from "../../domain/datasources/course.datasource";
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
            console.log(error);
            
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
}