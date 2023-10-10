import { RoleDatasource } from "../../domain/datasources/role.datasource";
import { RegisterRoleDto } from "../../domain/dtos/role/register-role.dto";
import { RoleEntity } from "../../domain/entities/role.entity";
import { RoleRepository } from "../../domain/repositories/role.repository";

export class RoleRepositoryImpl implements RoleRepository {
    constructor(
        private readonly roleDatasource: RoleDatasource
    ){}
    register(registerRoleDto: RegisterRoleDto): Promise<RoleEntity> {
        return this.roleDatasource.register(registerRoleDto)
    }
    getAll(): Promise<RoleEntity[]> {
        return this.roleDatasource.getAll()
    }
    getById(id: number): Promise<RoleEntity | null> {
        return this.roleDatasource.getById(id)   
    }
    deleteById(id: number): Promise<RoleEntity> {
        return this.roleDatasource.deleteById(id)
    }
    update(registerRoleDto: RegisterRoleDto): Promise<RoleEntity | null> {
        return this.roleDatasource.update(registerRoleDto)
    }
}