import { IncomeExternalInstitutionDto } from "../institutions/incomeExternal-institution.dto";

export class DeleteCourseMdlDto {
    private constructor(
        public institution: IncomeExternalInstitutionDto,
        public courseid: number
    ){}

    static create(object:{[key:string]:any}):[string?,DeleteCourseMdlDto?]{
        const {
            institution,
            courseid
        } = object

        return [
            undefined,
            new DeleteCourseMdlDto(
                institution,
                courseid
            )
        ]
    }
}