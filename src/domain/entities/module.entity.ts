export class ModuleEntity{
    constructor(
        public id: number,
        public externalId: number,
        public institutionId: number,
        public courseId: number,
        public name: string,
        public type: string,
        public url: string,
        public startDate: number,
        public endDate: number,
        public createdAt: Date,
        public updatedAt: Date
    ){}
}