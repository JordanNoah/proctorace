import { AssignedMdlDto } from "../dtos/role/assigned-mdl.dto";
import { RegisterRoleDto } from "../dtos/role/register-role.dto";
import { UnassignedMdlDto } from "../dtos/role/unassigned-mdl.dto";
import { RoleEntity } from "../entities/role.entity";
import { RoleAssignedEntity } from "../entities/roleAssigned";

export abstract class RoleDatasource {
    abstract register(registerRoleDto: RegisterRoleDto): Promise<RoleEntity>;
    abstract getById(id:number): Promise<RoleEntity | null>;
    abstract getAll(): Promise<RoleEntity[]>
    abstract deleteById(id:number):Promise<RoleEntity>
    abstract update(registerRoleDto: RegisterRoleDto): Promise<RoleEntity | null>;
    abstract getByExternalidAndInstitutionId(externalId:number,institutionId:number):Promise<RoleEntity | null>;
    abstract assigned(assignedMdlDto: AssignedMdlDto): Promise<RoleAssignedEntity | null>
    abstract unassigned(unassignedMdlDto: UnassignedMdlDto): Promise<RoleAssignedEntity | null>
    abstract getAssignedRole(
        externalId:number,
        roleId:number,
        userId:number,
        enrolmentId:number,
        courseId:number,
        institutionId:number
    ):Promise<RoleAssignedEntity | null>
}