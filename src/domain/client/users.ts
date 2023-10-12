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

    constructor(
        institution: InstitutionEntity
    ){
        this.axios = Axios.getInstance(`${institution.website}${institution.rest_path}`)
        this.institution = institution
    }

    public async syncUserMdl(){
        try {

            await SequelizeUser.destroy({
                where:{},
                truncate: true
            })

            const datasource = new UserDatasourceImpl()
            const userRepository = new UserRepositoryImpl(datasource)

            const usersCounter = (await this.axios.post(
                {
                    'moodlewsrestformat':'json',
                    'wsfunction':'local_collector_alert_bun_get_users_counter',
                    'wstoken':this.institution.token
                }
            )).data.totalusers
            console.log(usersCounter);
            
            for (let index = 0; index < usersCounter; index++) {
                const users = (await this.axios.post(
                    {
                        'moodlewsrestformat':'json',
                        'wsfunction':'local_collector_alert_bun_get_users_data',
                        'wstoken':this.institution.token,
                        'page': index
                    }
                )).data.users

                for (let j = 0; j < users.length; j++) {
                    const element = users[j];
                    var objDto = {
                        "institution": {
                            "institution_abbreviation":this.institution.abbreviation,
                            "modality":this.institution.modality
                        },
                        "user":element
                    }
                    const [error,registerUserDto] = RegisterUserDto.create(objDto)
                    if(error) throw CustomError.internalSever(error)
                    userRepository.register(registerUserDto!).then((user) => {
                        console.log(`Created user; ${user.fullName}`);
                    })
                }                
            }
            
        } catch (error) {
            console.log(error);
            
            if (error instanceof CustomError) {
                throw error.message;
            }
                        
            throw CustomError.internalSever()
        }
    }
}