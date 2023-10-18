import { IncomeExternalInstitutionDto } from "../institutions/incomeExternal-institution.dto";

export class DeleteUserMdlDto {
    private constructor(
        public institution: IncomeExternalInstitutionDto,
        public userid: number
    ){}

    static create(object:{[key:string]:any}):[string?,DeleteUserMdlDto?]{
        const {
            institution,
            userid
        } = object
        return[
            undefined,
            new DeleteUserMdlDto(
                institution,
                userid
            )
        ]
    }
}