import { RoleDatasourceImpl } from "../../infrastructure/datasource/role.datasource.impl";
import { RoleRepositoryImpl } from "../../infrastructure/repositories/role.repository.impl";
import { AssignedMdlDto } from "../dtos/role/assigned-mdl.dto";
import { RegisterRoleDto } from "../dtos/role/register-role.dto";
import { InstitutionEntity } from "../entities/institution.entity";
import { CustomError } from "../errors/custom.error";
import Axios from "./axios";

export class RoleAssigned {
    private axios: Axios;
    private institution: InstitutionEntity;
    private roleRepository: RoleRepositoryImpl;

    constructor(
        institution: InstitutionEntity
    ){
        this.axios = Axios.getInstance(`${institution.website}${institution.rest_path}`)
        this.institution = institution
        const datasource = new RoleDatasourceImpl()
        this.roleRepository = new RoleRepositoryImpl(datasource)
    }

    public async sync(){
        try {
            const enrolmentsCounter: any = await this.getCounter()
            await this.getData(enrolmentsCounter.totalenrolments)
            
        } catch (error) {            
            if (error instanceof CustomError) {
                throw error.message;
            }
                        
            throw CustomError.internalSever()
        }
    }

    public async getCounter(){
        return await this.axios.post(
            {
                'moodlewsrestformat':'json',
                'wsfunction':'local_collector_alert_bun_get_enrolments_counter',
                'wstoken':this.institution.token
            }
        )
    }

    public async getData(counter: number){
        for (let i = 0; i < counter; i++) {
            var roleAssigned:any = await this.axios.post(
                {
                    'wsfunction':'local_collector_alert_bun_get_role_assigned_enrolments_data',
                    'moodlewsrestformat':'json',
                    'wstoken':this.institution.token,
                    'page':i
                }
            )

            for (let j = 0; j < roleAssigned.length; j++) {
                const element:any = roleAssigned[j];
                for (let k = 0; k < element.rolesAssigned.length; k++) {
                    const elementroles = element.rolesAssigned[k];
                    var objDto = {
                        "institution": {
                            "institution_abbreviation":this.institution.abbreviation,
                            "modality":this.institution.modality
                        },
                        "role":elementroles
                    }

                    const [error,assignedMdlDto] = AssignedMdlDto.create(objDto)                    
                    if(error) throw CustomError.internalSever(error)
                    await this.roleRepository.assigned(assignedMdlDto!)
                }
            }
            
        }
    }
}