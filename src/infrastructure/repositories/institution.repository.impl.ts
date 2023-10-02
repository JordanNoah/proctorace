import { InstitutionDatasource, InstitutionEntity, InstitutionRepository, RegisterInstitutionDto } from "../../domain";

export class InstitutionRepositoryImpl implements InstitutionRepository {

    constructor(
        private readonly institutionDatasource: InstitutionDatasource
    ){}
    
    register(registerInstitutionDto: RegisterInstitutionDto): Promise<InstitutionEntity> {
        return this.institutionDatasource.register(registerInstitutionDto);
    }
    getAll(): Promise<InstitutionEntity[]> {
        return this.institutionDatasource.getAll()
    }
    getByUuid(uuid:string): Promise<InstitutionEntity | null>{
        return this.institutionDatasource.getByUuid(uuid)
    }
    deleteByUuid(uuid: string): Promise<InstitutionEntity> {
        return this.institutionDatasource.deleteByUuid(uuid )
    }
    updatebyUuid(registerInstitutionDto: RegisterInstitutionDto): Promise<InstitutionEntity> {
        return this.institutionDatasource.updatebyUuid(registerInstitutionDto)
    }
}