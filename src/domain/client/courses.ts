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
    private courseRepository: CourseRepositoryImpl;

    constructor(
        institution: InstitutionEntity
    ){
        this.axios = Axios.getInstance(`${institution.website}${institution.rest_path}`)
        this.institution = institution
        const datasource = new CourseDatasourceImpl()
        this.courseRepository = new CourseRepositoryImpl(datasource)
    }

    public async sync(){
        try {
            const coursesCounter: any = await this.getCounter()            
            await this.getData(coursesCounter.totalusers)
        } catch (error) {            
            if (error instanceof CustomError) {
                throw error.message;
            }
                        
            throw CustomError.internalSever()
        }
    }

    public async getCounter(){
        return await this.axios.post(
            {
                'moodlewsrestformat':'json',
                'wsfunction':'local_collector_alert_bun_get_users_counter',
                'wstoken':this.institution.token
            }
        )
    }

    public async getData(counter: number){
        for (let index = 0; index < counter; index++) {
            const courses:any = await this.axios.post(
                {
                    'moodlewsrestformat':'json',
                    'wsfunction':'local_collector_alert_bun_get_courses_data',
                    'wstoken':this.institution.token,
                    'page': index
                }
            )

            for (let j = 0; j < courses.courses.length; j++) {
                const element = courses.courses[j];
                var objDto = {
                    "institution": {
                        "institution_abbreviation":this.institution.abbreviation,
                        "modality":this.institution.modality
                    },
                    "course":element
                }

                const [error,registerCourseDto] = RegisterCourseDto.create(objDto)
                if(error) throw CustomError.internalSever(error)
                await this.courseRepository.register(registerCourseDto!)
            }
        }
    }
}