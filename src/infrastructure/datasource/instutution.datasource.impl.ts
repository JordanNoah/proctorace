import { CustomError, InstitutionDatasource, InstitutionEntity, RegisterInstitutionDto } from "../../domain";
import { IncomeExternalInstitutionDto } from "../../domain/dtos/institutions/incomeExternal-institution.dto";
import { SequelizeInstitution } from "../database/models/Institution";

export class InstitutionDatasourceImpl implements InstitutionDatasource {   
    async register(registerInstitutionDto: RegisterInstitutionDto): Promise<InstitutionEntity> {
        try{
            const {abbreviation,domain,fullname,modality,name,rest_path,token,translations,uuid,website} = registerInstitutionDto
            
            var [institution,created] = await SequelizeInstitution.findOrCreate({
                where:{
                    uuid
                },
                defaults:{
                    uuid,
                    name,
                    fullname,
                    abbreviation,
                    domain,
                    token,
                    website,
                    rest_path,
                    modality,
                    translations
                }
            })          

            return new InstitutionEntity(
                institution.id,
                institution.uuid,
                institution.name,
                institution.fullname,
                institution.abbreviation,
                institution.domain,
                institution.token,
                institution.website,
                institution.rest_path,
                institution.modality,
                institution.translations,
                institution.createdAt,
                institution.updatedAt
            )
        }catch(error){
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async getAll(): Promise<InstitutionEntity[]> {
        try{
            var institution = await SequelizeInstitution.findAll()
            return institution;
        }catch(error){
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async getByUuid(uuid: string): Promise<InstitutionEntity | null> {        
        try{
            var institution = await SequelizeInstitution.findOne({
                where:{
                    uuid:uuid
                }
            })
            return institution;
        }catch(error){
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()           
        }
    }
    async deleteByUuid(uuid: string): Promise<InstitutionEntity> {
        try {
            var institution = await this.getByUuid(uuid)
            if (!institution) throw CustomError.notFound('Institution not found')
            await SequelizeInstitution.destroy({
                where:{
                    uuid:uuid
                }
            })
            return institution;
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async updatebyUuid(registerInstitutionDto: RegisterInstitutionDto): Promise<InstitutionEntity> {
        try {
            const {abbreviation,domain,fullname,modality,name,rest_path,token,translations,uuid,website} = registerInstitutionDto

            var institution = await this.getByUuid(uuid)
            if (!institution) throw CustomError.notFound('Institution not found')
            await SequelizeInstitution.update({
                uuid:uuid,
                name:name,
                fullname:fullname,
                abbreviation:abbreviation,
                domain:domain,
                token:token,
                website:website,
                rest_path:rest_path,
                modality:modality,
                translations:translations
            },{
                where:{
                    uuid:registerInstitutionDto.uuid
                }
            })
            return new InstitutionEntity(
                institution.id,
                institution.uuid,
                institution.name,
                institution.fullname,
                institution.abbreviation,
                institution.domain,
                institution.token,
                institution.website,
                institution.rest_path,
                institution.modality,
                institution.translations,
                institution.createdAt,
                institution.updatedAt
            )
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async getByShortnameAndModality(incomeExternalInstitutionDto: IncomeExternalInstitutionDto): Promise<InstitutionEntity | null> {
        try{
            return await SequelizeInstitution.findOne({
                where:{
                    abbreviation:incomeExternalInstitutionDto.institution_abbreviation,
                    modality:incomeExternalInstitutionDto.modality
                }
            })
        } catch(error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
}