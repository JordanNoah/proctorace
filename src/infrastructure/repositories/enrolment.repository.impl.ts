import { EnrolmentDatasource } from "../../domain/datasources/enrolment.datasource";
import { DeleteEnrolmentMdlDto } from "../../domain/dtos/enrolment/delete-enrolment.dto";
import { RegisterEnrolmentDto } from "../../domain/dtos/enrolment/register-enrolment.dto";
import { EnrolmentEntity } from "../../domain/entities/enrolment.entity";
import { EnrolmentRepository } from "../../domain/repositories/enrolment.repository";

export class EnrolmentRepositoryImpl implements EnrolmentRepository{
    constructor(
        private readonly enrolmentDatasource: EnrolmentDatasource
    ){}
    
    register(registerEnrolmentDto: RegisterEnrolmentDto): Promise<EnrolmentEntity> {
        return this.enrolmentDatasource.register(registerEnrolmentDto)
    }
    getAll(): Promise<EnrolmentEntity[]> {
        return this.enrolmentDatasource.getAll()
    }
    getById(id: number): Promise<EnrolmentEntity | null> {
        return this.enrolmentDatasource.getById(id)
    }
    deleteById(id: number): Promise<EnrolmentEntity> {
        return this.enrolmentDatasource.deleteById(id)
    }
    update(registerEnrolmentDto: RegisterEnrolmentDto): Promise<EnrolmentEntity | null> {
        return this.enrolmentDatasource.update(registerEnrolmentDto)
    }
    getByExternalidInstitutionCourseUser(externalId: number, institutionId: number, courseId: number, userId: number): Promise<EnrolmentEntity | null> {
        return this.enrolmentDatasource.getByExternalidInstitutionCourseUser(
            externalId,
            institutionId,
            courseId,
            userId
        )
    }
    deleteByExternalId(deleteEnrolmentMdlDto: DeleteEnrolmentMdlDto): Promise<EnrolmentEntity> {
        return this.enrolmentDatasource.deleteByExternalId(deleteEnrolmentMdlDto)
    }
}