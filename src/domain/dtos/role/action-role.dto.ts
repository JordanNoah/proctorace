export class ActionRoleDto{
    private constructor(
        public id: number,
		public roleid: number,
		public contextid: number,
		public userid: number,
		public timemodified: number,
		public modifierid: number,
		public component: string | null,
		public itemid: number,
		public sortorder: number,
		public enrolmentId: number,
		public courseid: number
    ){}
}