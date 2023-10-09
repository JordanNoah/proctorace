import { RegisterEnrolmentDto } from "../dtos/enrolment/register-enrolment.dto";
import { EnrolmentEntity } from "../entities/enrolment.entity";

export abstract class EnrolmentRepository{
    abstract register(registerEnrolmentDto:RegisterEnrolmentDto):Promise<EnrolmentEntity>
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
}