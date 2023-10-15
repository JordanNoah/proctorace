import { EnrolmentDatasourceImpl } from "../../infrastructure/datasource/enrolment.datasource.impl";
import { EnrolmentRepositoryImpl } from "../../infrastructure/repositories/enrolment.repository.impl";
import { RegisterEnrolmentDto } from "../dtos/enrolment/register-enrolment.dto";
import { InstitutionEntity } from "../entities/institution.entity";
import { CustomError } from "../errors/custom.error";
import Axios from "./axios";

export class EnrolmentClient {
    private axios: Axios;
    private institution: InstitutionEntity;
    private enrolmentRepository: EnrolmentRepositoryImpl;

    constructor(
        institution: InstitutionEntity
    ){
        this.axios = Axios.getInstance(`${institution.website}${institution.rest_path}`)
        this.institution = institution
        const datasource = new EnrolmentDatasourceImpl()
        this.enrolmentRepository = new EnrolmentRepositoryImpl(datasource)
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
        for (let index = 0; index < counter; index++) {
            const enrolments:any = await this.axios.post(
                {
                    'moodlewsrestformat':'json',
                    'wsfunction':'local_collector_alert_bun_get_enrolments_data',
                    'wstoken':this.institution.token,
                    'page': index
                }
            )

            for (let j = 0; j < enrolments.enrolments.length; j++) {
                const element = enrolments.enrolments[j];
                var objDto = {
                    "institution": {
                        "institution_abbreviation":this.institution.abbreviation,
                        "modality":this.institution.modality
                    },
                    "enrolment":element
                }
                const [error,registerEnrolmentDto] = RegisterEnrolmentDto.create(objDto)
                if(error) throw CustomError.internalSever(error)
                await this.enrolmentRepository.register(registerEnrolmentDto!)
            }

            console.log(enrolments);
            
        }
    }
}