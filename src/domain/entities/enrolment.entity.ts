export class EnrolmentEntity {
    constructor(
        public id: number,
        public externalId: number, 
        public institutionId: number,
        public status: boolean,
        public startDate: number,
        public endDate: number,
        public createdAt: Date,
        public updatedAt: Date
    ){}
}