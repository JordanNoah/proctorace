import { CourseDatasourceImpl } from "../../infrastructure/datasource/course.datasource.impl";
import { CourseRepositoryImpl } from "../../infrastructure/repositories/course.repository.impl";
import { CourseDatasource } from "../datasources/course.datasource";
import { RegisterCourseDto } from "../dtos/courses/register-course.dto";
import { InstitutionEntity } from "../entities/institution.entity";
import { CustomError } from "../errors/custom.error";
import Axios from "./axios";

export class CoursesClient {
    private axios: Axios;
    private institution: InstitutionEntity;

    constructor(
        institution: InstitutionEntity
    ){
        this.axios = Axios.getInstance(`${institution.website}${institution.rest_path}`)
        this.institution = institution
    }

    public async sync(){
        try {
            const datasource = new CourseDatasourceImpl()
            const courseRepository = new CourseRepositoryImpl(datasource)

            const coursesCounter = (await this.axios.post(
                {
                    'wsfunction':'local_collector_alert_bun_get_courses_counter',
                    'moodlewsrestformat':'json',
                    'wstoken':this.institution.token
                }
            )).data.totalcourses

            for (let index = 0; index < coursesCounter; index++) {
                const courses = (await this.axios.post(
                    {
                        'moodlewsrestformat':'json',
                        'wsfunction':'local_collector_alert_bun_get_courses_data',
                        'wstoken':this.institution.token,
                        'page': index
                    }
                )).data.courses

                for (let j = 0; j < courses.length; j++) {
                    const element = courses[j];
                    var objDto = {
                        "institution": {
                            "institution_abbreviation":this.institution.abbreviation,
                            "modality":this.institution.modality
                        },
                        "course":element
                    }

                    const [error,registerCourseDto] = RegisterCourseDto.create(objDto)
                    if(error) throw CustomError.internalSever(error)
                    await courseRepository.register(registerCourseDto!)
                }
            }            
        } catch (error) {
            console.log(error);
            
            if (error instanceof CustomError) {
                throw error.message;
            }
                        
            throw CustomError.internalSever()
        }
    }
}