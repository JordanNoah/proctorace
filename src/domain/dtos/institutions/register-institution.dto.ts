export class RegisterInstitutionDto {
    private constructor(
        public uuid: string,
        public name: string,
        public fullname: string,
        public abbreviation: string,
        public domain: string,
        public token: string,
        public website: string,
        public rest_path: string,
        public modality: string,
        public translations: Object
    ){}

    static create(object: {[key:string]:any}):[string?,RegisterInstitutionDto?] {
        const {
                uuid,
                name,
                fullname,
                abbreviation,
                domain,
                token,
                website,
                rest_path,
                modality,
                translations
            } = object

            if(!uuid) return ['Missing uuid'];
            if(!name) return ['Missing name'];
            if(!fullname) return ['Missing fullname'];
            if(!abbreviation) return ['Missing abbreviation'];
            if(!domain) return ['Missing domain'];
            if(!token) return ['Missing token'];
            if(!website) return ['Missing website'];
            if(!rest_path) return ['Missing rest_path'];
            if(!modality) return ['Missing modality'];
            if(!translations) return ['Missing translations'];

        return [
            undefined,
            new RegisterInstitutionDto(
                uuid,
                name,
                fullname,
                abbreviation,
                domain,
                token,
                website,
                rest_path,
                modality,
                translations
            )
        ];
    }
}