export class UserEntity {
    constructor(
        public id: number,
        public externalId: number,
        public institutionId: number,
        public userName: string,
        public fullName: string,
        public createdAt: Date,
        public updatedAt: Date
    ){}
}