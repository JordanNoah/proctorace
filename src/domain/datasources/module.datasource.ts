import { RegisterModuleDto } from "../dtos/modules/register-module.dto";
import { ModuleEntity } from "../entities/module.entity";

export abstract class ModuleDatasource {
    abstract register(registerModuleDto: RegisterModuleDto): Promise<ModuleEntity>
    abstract getById(id:number): Promise<ModuleEntity | null>
}