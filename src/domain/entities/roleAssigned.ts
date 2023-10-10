export class RoleAssignedEntity {
    constructor(
        public id: number,
        public externalId: number,
        public roleId: number,
        public userId: number,
        public enrolmentId: number,
        public courseId: number,
        public institutionId: number,
        public createdAt: Date,
        public updatedAt: Date
    ){}
}