import { IncomeExternalInstitutionDto } from "../institutions/incomeExternal-institution.dto";
import { UserMdlDto } from "./user-mdl.dto";

export class RegisterUserDto {
    private constructor(
        public institution: IncomeExternalInstitutionDto,
        public user: UserMdlDto
    ){}
    static create(object:{[key:string]:any}):[string?,RegisterUserDto?]{

        const {
            institution,
            user
        } = object

        if(!user.id) return ['Missing external id']
        if(!user.username) return ['Missing username']
        if(!user.firstname) return ['Missing firstname']
        if(!user.lastname) return ['Missing lastname']

        return[
            undefined,
            new RegisterUserDto(
                institution,
                user
            )
        ]
    }
}