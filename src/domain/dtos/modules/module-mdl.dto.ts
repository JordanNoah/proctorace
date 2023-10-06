export class ModuleMdlDto {
    private constructor(
        public id: number,
		public courseId: number,
		public name: string,
		public type: string,
		public url: string,
		public startDate: number,
		public endDate: number
    ){}
}