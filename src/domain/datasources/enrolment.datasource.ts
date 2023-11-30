import { DeleteEnrolmentMdlDto } from "../dtos/enrolment/delete-enrolment.dto";
import { RegisterEnrolmentDto } from "../dtos/enrolment/register-enrolment.dto";
import { EnrolmentEntity } from "../entities/enrolment.entity";

export abstract class EnrolmentDatasource {
    abstract register(registerEnrolmentDto: RegisterEnrolmentDto):Promise<EnrolmentEntity>
    abstract getAll():Promise<EnrolmentEntity[]>
    abstract getById(id:number):Promise<EnrolmentEntity | null>
    abstract deleteById(id: number):Promise<EnrolmentEntity>
    abstract update(registerEnrolmentDto:RegisterEnrolmentDto):Promise<EnrolmentEntity | null>
    abstract getByExternalidInstitutionCourseUser(
        externalId:number,
        institutionId:number,
        courseId:number,
        userId:number
    ):Promise<EnrolmentEntity | null>
    abstract getByParams(
        externalId?:number,
        institutionId?:number,
        courseId?:number,
        userId?:number
    ): Promise<EnrolmentEntity | null>
    abstract deleteByExternalId(deleteEnrolmentMdlDto:DeleteEnrolmentMdlDto): Promise<EnrolmentEntity>
}