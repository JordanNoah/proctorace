import { RegisterInstitutionDto } from "../dtos/institutions/register-institution.dto";
import { InstitutionEntity } from "../entities/institution.entity";

export abstract class InstitutionRepository {
    abstract register(registerInstitutionDto: RegisterInstitutionDto):Promise<InstitutionEntity>
    abstract getAll():Promise<InstitutionEntity[]>
    abstract getByUuid(uuid:String):Promise<InstitutionEntity | null>
    abstract deleteByUuid(uuid: string):Promise<InstitutionEntity>
    abstract updatebyUuid(registerInstitutionDto: RegisterInstitutionDto):Promise<InstitutionEntity>
}