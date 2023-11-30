import { IncomeExternalInstitutionDto } from "../institutions/incomeExternal-institution.dto";

export class DeleteEnrolmentMdlDto {
    private constructor(
        public institution: IncomeExternalInstitutionDto,
        public courseId:number,
        public enrolmentId:number
    ){}

    static create(object:{[key:string]:any}):[string?,DeleteEnrolmentMdlDto?]{
        const {
            institution,
            enrolmentId,
            courseId
        } = object

        if(!enrolmentId) return ['Missing enrolment id']
        if(!courseId) return ['Missing course id']

        return [
            undefined,
            new DeleteEnrolmentMdlDto(
                institution,
                courseId,
                enrolmentId
            )
        ]
    }
}