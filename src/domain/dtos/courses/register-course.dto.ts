import { IncomeExternalInstitutionDto } from "../institutions/incomeExternal-institution.dto";
import { CourseMdlDto } from "./course-mdl.dto";

export class RegisterCourseDto {
    private constructor(
        public institution: IncomeExternalInstitutionDto,
        public course: CourseMdlDto
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterCourseDto?]{
        const {
            institution,
            course
        } = object

        if(!course) return ['Missing course structure']

        if(!course.id) return ['Missing external id']
        if(!course.fullname) return ['Missing fullname']
        if(!course.shortname) return ['Missing shortname']
        if(!course.startdate) return ['Missing startdate']
        if(!course.enddate) return ['Missing enddate']

        return[
            undefined,
            new RegisterCourseDto(
                institution,
                course
            )
        ]
    }
}