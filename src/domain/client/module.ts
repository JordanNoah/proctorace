import { ModuleDatasourceImpl } from "../../infrastructure/datasource/module.datasource.impl";
import { ModuleRepositoryImpl } from "../../infrastructure/repositories/module.repository.impl";
import { RegisterModuleDto } from "../dtos/modules/register-module.dto";
import { InstitutionEntity } from "../entities/institution.entity";
import { CustomError } from "../errors/custom.error";
import { ModuleRepository } from "../repositories/module.reposirty";
import Axios from "./axios";

export class ModuleClient {
    private axios: Axios;
    private institution: InstitutionEntity;
    private moduleRepository:ModuleRepository
    
    constructor(
        institution:InstitutionEntity
    ){
        this.axios = Axios.getInstance(`${institution.website}${institution.rest_path}`)
        this.institution = institution
        const datasource = new ModuleDatasourceImpl()
        this.moduleRepository = new ModuleRepositoryImpl(datasource)
    }

    public async sync(){
        try {
            var modulescounter:any = await this.getModulesCounter()
            for (let i = 0; i < modulescounter.length; i++) {
                const element = modulescounter[i];
                var modulesData:any = await this.getModulesData(i,element.type)
                if (modulesData.length > 0) {
                    for (let j = 0; j < modulesData.length; j++) {
                        const module = modulesData[j];
                        var objDto = {
                            "institution": {
                                "institution_abbreviation":this.institution.abbreviation,
                                "modality":this.institution.modality
                            },
                            "module":module
                        }

                        const [error,registerModuleDto] = RegisterModuleDto.create(objDto)
                        if(error) throw CustomError.internalSever(error)
                        await this.moduleRepository.register(registerModuleDto!)
                    }
                }                
            }
            
        } catch (error) {
            if (error instanceof CustomError) {
                throw error.message;
            }
                        
            throw CustomError.internalSever()
        }
    }

    public async getGeneralModules(){
        return await this.axios.post(
            {
                'moodlewsrestformat':'json',
                'wsfunction':'local_collector_alert_bun_get_general_modules_data',
                'wstoken':this.institution.token
            }
        )
    }

    public async getModulesCounter(){
        return await this.axios.post(
            {
                'moodlewsrestformat':'json',
                'wsfunction':'local_collector_alert_bun_get_modules_counter',
                'wstoken':this.institution.token
            }
        )
    }

    public async getModulesData(page:number,type:string){
        return await this.axios.post(
            {
                'moodlewsrestformat':'json',
                'wsfunction':'local_collector_alert_bun_get_modules_data',
                'wstoken':this.institution.token,
                'page':page,
                'type':type
            }
        )
    }
}