import { IncomeExternalInstitutionDto } from "../institutions/incomeExternal-institution.dto";
import { EnrolmentMdlDto } from "./enrolment-mdl.dto";

export class RegisterEnrolmentDto {
    private constructor(
        public institution: IncomeExternalInstitutionDto,
        public enrolment: EnrolmentMdlDto
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterEnrolmentDto?]{
        const {
            institution,
            enrolment
        } = object

        if(!enrolment) return ['Missing enrolment structure']

        if(!enrolment.id) return ['Missing external id']
        if(!enrolment.userid) return ['Missing user external id']
        if(!enrolment.timestart) return ['Missing time start']
        if(!enrolment.timeend) return ['Missing time end']
        if(!enrolment.courseid) return ['Missing course external id']
        if(!enrolment.status) return['Missing enrolment status']

        return [ 
            undefined,
            new RegisterEnrolmentDto(
                institution,
                enrolment
            )
        ]
    }
}