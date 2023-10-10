export class RoleEntity {
    constructor(
        public id: number,
        public externalId: number,
        public name: string | null,
        public shortname: string,
        public institutionId: number,
        public description: string | null,
        public archetype: string,
        public createdAt: Date,
        public updatedAt: Date
    ){}
}