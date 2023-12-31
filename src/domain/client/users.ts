import { UserDatasourceImpl, UserRepositoryImpl } from "../../infrastructure";
import { SequelizeUser } from "../../infrastructure/database/models/User";
import { IncomeExternalInstitutionDto } from "../dtos/institutions/incomeExternal-institution.dto";
import { RegisterUserDto } from "../dtos/users/register-user.dto";
import { InstitutionEntity } from "../entities/institution.entity";
import { CustomError } from "../errors/custom.error";
import { UserRepository } from "../repositories/users.repository";
import Axios from "./axios";

export class UsersClient {
    private axios: Axios;
    private institution: InstitutionEntity;
    private userRepository: UserRepositoryImpl;

    constructor(
        institution: InstitutionEntity
    ){
        this.axios = Axios.getInstance(`${institution.website}${institution.rest_path}`)
        this.institution = institution
        const datasource = new UserDatasourceImpl()
        this.userRepository = new UserRepositoryImpl(datasource)
    }

    public async syncUserMdl(){
        try {
            const usersCounter: any = await this.getCounter();
            await this.getData(usersCounter.totalusers)
            
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
                'wsfunction':'local_collector_alert_bun_get_users_counter',
                'wstoken':this.institution.token
            }
        )
    }

    public async getData(counter: number){
        for (let index = 0; index < counter; index++) {
            const users:any = await this.axios.post(
                {
                    'moodlewsrestformat':'json',
                    'wsfunction':'local_collector_alert_bun_get_users_data',
                    'wstoken':this.institution.token,
                    'page': index
                }
            )
        
            for (let j = 0; j < users.users.length; j++) {
                const element = users.users[j];
                var objDto = {
                    "institution": {
                        "institution_abbreviation":this.institution.abbreviation,
                        "modality":this.institution.modality
                    },
                    "user":element
                }
                const [error,registerUserDto] = RegisterUserDto.create(objDto)
                if(error) throw CustomError.internalSever(error)
                await this.userRepository.register(registerUserDto!)
            }
        }
    }
}