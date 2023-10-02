export class InstitutionEntity {
    constructor(
        public id: number,
        public uuid: string,
        public name: string,
        public fullname: string,
        public abbreviation: string,
        public domain: string,
        public token: string,
        public website: string,
        public rest_path: string,
        public modality: string,
        public translations: Object,
        public createdAt: Date,
        public updatedAt: Date
    ){}
}