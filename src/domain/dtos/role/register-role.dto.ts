import { IncomeExternalInstitutionDto } from "../institutions/incomeExternal-institution.dto";
import { RoleMdlDto } from "./role-mdl.dto";

export class RegisterRoleDto {
    private constructor(
        public institution: IncomeExternalInstitutionDto,
        public role: RoleMdlDto
    ){}

    static create(object:{[key:string]:any}):[string?, RegisterRoleDto?] {
        const {
            institution,
            role
        } = object

        if(!role) return ['Missing role structure']

        if(!role.id) return ['Missing external role id']
        if(!role.shortname) ['Missing role shorname']
        if(!role.archetype) ['Missing role archetype']

        return[
            undefined,
            new RegisterRoleDto(
                institution,
                role
            )
        ]
    }
}