import { RegisterRoleDto } from "../dtos/role/register-role.dto";
import { RoleEntity } from "../entities/role.entity";

export abstract class RoleDatasource {
    abstract register(registerRoleDto: RegisterRoleDto): Promise<RoleEntity>;
    abstract getById(id:number): Promise<RoleEntity | null>;
    abstract getAll(): Promise<RoleEntity[]>
    abstract deleteById(id:number):Promise<RoleEntity>
    abstract update(registerRoleDto: RegisterRoleDto): Promise<RoleEntity | null>;
    abstract getByExternalidAndInstitutionId(externalId:number,institutionId:number):Promise<RoleEntity | null>;
}