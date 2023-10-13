import { CustomError, RegisterInstitutionDto } from "../../../domain";
import { InstitutionDatasourceImpl } from "../../../infrastructure";
import { InstitutionRepositoryImpl } from "../../../infrastructure";
import {items} from "./institutions"

export class SequelizeSeeders{
    public static async run(){
        try {
            await this.institution()
        } catch (error) {
            if (error instanceof CustomError) {
                throw error.message;
            }
                        
            throw CustomError.internalSever()
        }
    }

    public static async institution(){
        const datasource = new InstitutionDatasourceImpl();
        const institutionRepository = new InstitutionRepositoryImpl(datasource)

        for (let index = 0; index < items.length; index++) {
            const element = items[index];
            const [error, registerInstitutionDto] = RegisterInstitutionDto.create(element)
            if (error) throw CustomError.internalSever()
            await institutionRepository.register(registerInstitutionDto!)
        }
    }
}