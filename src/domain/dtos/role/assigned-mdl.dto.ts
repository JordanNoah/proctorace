import { IncomeExternalInstitutionDto } from "../institutions/incomeExternal-institution.dto";
import { ActionRoleDto } from "./action-role.dto";

export class AssignedMdlDto {
    private constructor(
        public institution: IncomeExternalInstitutionDto,
        public role: ActionRoleDto
    ){}

    static create(object:{[key:string]:any}):[string?,AssignedMdlDto?]{
        const {
            institution,
            role
        } = object

        if(!role) return ['Missing role structure']

        if(!role.id) return ['Missing external role assigment id']
        if(!role.roleid) return ['Missing external role id']
        if(!role.userid) return ['Missing external user id']
        if(!role.courseid) return ['Missing external course id']

        return[
            undefined,
            new AssignedMdlDto(
                institution,
                role
            )
        ]
    }
}