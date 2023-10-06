import { IncomeExternalInstitutionDto } from "../institutions/incomeExternal-institution.dto";
import { ModuleMdlDto } from "./module-mdl.dto";

export class RegisterModuleDto {
    private constructor(
        public institution: IncomeExternalInstitutionDto,
        public module: ModuleMdlDto
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterModuleDto?]{
        const {institution,module} = object

        if(!module) return ['Missing module structure']
        if(!module.id) return ['Missing module id']
        if(!module.courseId) return ['Missing module courseId']
        if(!module.name) return ['Missing module name']
        if(!module.type) return ['Missing module type']
        if(!module.url) return ['Missing module url']
        if(!module.startDate) return ['Missing module startDate']
        if(!module.endDate) return ['Missing module endDate']

        return[
            undefined,
            new RegisterModuleDto(
                institution,
                module
            )
        ]
    }
}