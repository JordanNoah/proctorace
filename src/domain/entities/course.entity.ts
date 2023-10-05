export class CourseEntity {
    constructor(
        public id: number,
        public externalId: number,
        public institutionId: number,
        public name: string,
        public shortName: string,
        public idNumber: string,
        public startDate: number,
        public endDate: number,
        public createdAt: Date,
        public updatedAt:Date
    ){}
}