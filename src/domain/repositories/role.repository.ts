import { AssignedMdlDto } from "../dtos/role/assigned-mdl.dto";
import { RegisterRoleDto } from "../dtos/role/register-role.dto";
import { UnassignedMdlDto } from "../dtos/role/unassigned-mdl.dto";
import { RoleEntity } from "../entities/role.entity";
import { RoleAssignedEntity } from "../entities/roleAssigned";

export abstract class RoleRepository {
    abstract register(registerRoleDto: RegisterRoleDto): Promise<RoleEntity>;
    abstract getAll(): Promise<RoleEntity[]>
    abstract getById(id:number): Promise<RoleEntity | null>
    abstract deleteById(id:number):Promise<RoleEntity>
    abstract update(registerRoleDto: RegisterRoleDto): Promise<RoleEntity | null>;
    abstract assigned(assignedMdlDto: AssignedMdlDto): Promise<RoleAssignedEntity | null>
    abstract unassigned(unassignedMdlDto: UnassignedMdlDto): Promise<RoleAssignedEntity | null>
}