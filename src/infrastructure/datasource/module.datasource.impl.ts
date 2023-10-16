import { CustomError } from "../../domain";
import { ModuleDatasource } from "../../domain/datasources/module.datasource";
import { RegisterModuleDto } from "../../domain/dtos/modules/register-module.dto";
import { ModuleEntity } from "../../domain/entities/module.entity";
import { SequelizeCourse } from "../database/models/Course";
import { SequelizeInstitution } from "../database/models/Institution";
import { SequelizeModule } from "../database/models/Module";
import { CourseDatasourceImpl } from "./course.datasource.impl";
import { InstitutionDatasourceImpl } from "./instutution.datasource.impl";

export class ModuleDatasourceImpl implements ModuleDatasource {
    async register(registerModuleDto: RegisterModuleDto): Promise<ModuleEntity> {
        try {
            const {institution,module} = registerModuleDto

            if(typeof institution != 'object') throw CustomError.internalSever('Missing institution structure')

            var institutionDb = await new InstitutionDatasourceImpl().getByShortnameAndModality(institution)
            
            if (!institutionDb) throw CustomError.notFound('Institution not found')
            
            var courseDb = await new CourseDatasourceImpl().getByExternalIdAndInstitutionId(module.courseId,institutionDb.id)

            if(!courseDb) throw CustomError.notFound('Course not found')

            var[moduleDb,created] = await SequelizeModule.findOrCreate({
                where:{
                    externalId:module.id,
                    institutionId:institutionDb.id,
                    courseId:courseDb.id
                },
                defaults:{
                    externalId:module.id,
                    institutionId:institutionDb.id,
                    courseId:courseDb.id,
                    name:module.name,
                    type:module.type,
                    url:module.url,
                    startDate:module.startDate,
                    endDate:module.endDate
                },
                include:[
                    {
                        model:SequelizeInstitution,
                        as:"institution"
                    }
                ]
            })

            var moduleWithInstitution = await this.getById(moduleDb.id)

            return moduleWithInstitution ?? moduleDb
        } catch (error) {
            if (error instanceof CustomError) {
                throw error.message;
            }
            throw CustomError.internalSever()
        }
    }

    async getById(id: number): Promise<ModuleEntity | null> {
        try {
            return await SequelizeModule.findOne({
                where:{
                    id
                },
                include:[
                    {
                        model:SequelizeInstitution,
                        as:"institution"
                    },
                    {
                        model:SequelizeCourse,
                        as:"course"
                    }
                ]
            })
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async getAll(): Promise<ModuleEntity[]> {
        try {
            return await SequelizeModule.findAll({
                include:[
                    {
                        model:SequelizeInstitution,
                        as:"institution"
                    },
                    {
                        model:SequelizeCourse,
                        as:"course"
                    }
                ]
            })
        } catch (error) {           
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async deleteById(id: number): Promise<ModuleEntity> {
        try {
            var module = await this.getById(id)
            if(!module) throw CustomError.notFound('Module not found')

            await SequelizeModule.destroy({
                where:{
                    id:id
                }
            })
            return module
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    
    async update(registerModuleDto: RegisterModuleDto): Promise<ModuleEntity | null> {
        try {
            const {institution,module} = registerModuleDto

            if(typeof institution != 'object') throw CustomError.internalSever('Missing institution structure')

            var institutionDb = await new InstitutionDatasourceImpl().getByShortnameAndModality(institution)
            
            if (!institutionDb) throw CustomError.notFound('Institution not found')

            var courseDb = await new CourseDatasourceImpl().getByExternalIdAndInstitutionId(module.courseId,institutionDb.id)
            if(!courseDb) throw CustomError.notFound('Course not found')

            var moduleDb = await this.getByExternalidAndInstitutionId(module.id,institutionDb.id)
            if (!moduleDb) throw CustomError.notFound("Module not found")
            await SequelizeModule.update({
                externalId:module.id,
                    institutionId:institutionDb.id,
                    courseId:courseDb.id,
                    name:module.name,
                    type:module.type,
                    url:module.url,
                    startDate:module.startDate,
                    endDate:module.endDate
            },{
                where:{
                    externalId:module.id,
                    institutionId:institutionDb.id
                }
            })

            return await this.getByExternalidAndInstitutionId(module.id,institutionDb.id)
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async getByExternalidAndInstitutionId(externalId: number, institutionId: number): Promise<ModuleEntity | null> {
        try {
            if(!externalId) throw CustomError.badRequest('missing external id')
            if(!institutionId) throw CustomError.badRequest('missing institution id')
            return await SequelizeModule.findOne({
                where:{
                    externalId:externalId,
                    institutionId:institutionId
                }
            })
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
}