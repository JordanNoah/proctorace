import { RoleDatasourceImpl } from "../../infrastructure/datasource/role.datasource.impl";
import { RoleRepositoryImpl } from "../../infrastructure/repositories/role.repository.impl";
import { RegisterRoleDto } from "../dtos/role/register-role.dto";
import { InstitutionEntity } from "../entities/institution.entity";
import { CustomError } from "../errors/custom.error";
import Axios from "./axios";

export class RolesClient {
    private axios: Axios;
    private institution: InstitutionEntity;

    constructor(
        institution: InstitutionEntity
    ){
        this.axios = Axios.getInstance(`${institution.website}${institution.rest_path}`)
        this.institution = institution
    }

    public async sync() {
        try {
            const datasource = new RoleDatasourceImpl()
            const roleRepository = new RoleRepositoryImpl(datasource)

            const roles = (await this.axios.post(
                {
                    'wsfunction':'local_collector_alert_bun_get_all_roles',
                    'moodlewsrestformat':'json',
                    'wstoken':this.institution.token
                }
            )).data

            for (let index = 0; index < roles.length; index++) {
                const element = roles[index];

                var objDto = {
                    "institution": {
                        "institution_abbreviation":this.institution.abbreviation,
                        "modality":this.institution.modality
                    },
                    "role":element
                }

                const [error,registerRoleDto] = RegisterRoleDto.create(objDto)
                if(error) throw CustomError.internalSever(error)
                await roleRepository.register(registerRoleDto!)
            }
                        
        } catch (error) {
            if (error instanceof CustomError) {
                throw error.message;
            }
                        
            throw CustomError.internalSever()
        }
    }
}