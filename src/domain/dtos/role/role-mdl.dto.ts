export class RoleMdlDto{
    private constructor(
        public id: number,
        public name: string | null,
        public shortname: string,
        public description: string | null,
        public sortorder: number,
        public archetype: string
    ){}
}