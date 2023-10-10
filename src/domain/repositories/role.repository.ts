import { RegisterRoleDto } from "../dtos/role/register-role.dto";
import { RoleEntity } from "../entities/role.entity";

export abstract class RoleRepository {
    abstract register(registerRoleDto: RegisterRoleDto): Promise<RoleEntity>;
    abstract getAll(): Promise<RoleEntity[]>
    abstract getById(id:number): Promise<RoleEntity | null>
    abstract deleteById(id:number):Promise<RoleEntity>
    abstract update(registerRoleDto: RegisterRoleDto): Promise<RoleEntity | null>;
}