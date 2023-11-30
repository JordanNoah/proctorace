import { ModuleDatasource } from "../../domain/datasources/module.datasource";
import { RegisterModuleDto } from "../../domain/dtos/modules/register-module.dto";
import { ModuleEntity } from "../../domain/entities/module.entity";
import { ModuleRepository } from "../../domain/repositories/module.reposirty";

export class ModuleRepositoryImpl implements ModuleRepository{
    constructor(
        private readonly moduleDatasource: ModuleDatasource
    ){}
    register(registerModuleDto: RegisterModuleDto): Promise<ModuleEntity> {
        return this.moduleDatasource.register(registerModuleDto)
    }
    getById(id: number): Promise<ModuleEntity | null> {
        return this.moduleDatasource.getById(id)
    }
    getAll(): Promise<ModuleEntity[]> {
        return this.moduleDatasource.getAll()
    }
    deleteById(id: number): Promise<ModuleEntity> {
        return this.moduleDatasource.deleteById(id)
    }
    update(registerModuleDto: RegisterModuleDto): Promise<ModuleEntity | null> {
        return this.moduleDatasource.update(registerModuleDto)
    }
    deleteByModuleDto(registerModuleDto: RegisterModuleDto): Promise<ModuleEntity | null> {
        return this.moduleDatasource.deleteByModuleDto(registerModuleDto)
    }
}