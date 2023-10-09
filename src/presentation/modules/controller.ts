import { Request, Response } from "express";
import { RegisterModuleDto } from "../../domain/dtos/modules/register-module.dto";
import { ModuleRepository } from "../../domain/repositories/module.reposirty";

export class ModuleController {
    constructor(
        private readonly moduleRepository:ModuleRepository
    ){}
    
    createModule = (req: Request, res: Response) => {
        const [error,registerModuleDto] = RegisterModuleDto.create(req.body)
        if(error) return res.status(400).json({error})
        this.moduleRepository.register(registerModuleDto!).then((module) => {
            res.json(module)
        }).catch((error) => {            
            res.status(500).json({error})
        })
    }

    getAllModules = (req: Request, res: Response) => {
        this.moduleRepository.getAll().then((modules) => {
            res.json(modules)
        })
    }

    getById = (req:Request, res:Response) => {
        this.moduleRepository.getById(Number(req.params.id)).then((module) => {
            res.json(module)
        }).catch((error) =>{
            res.status(500).json(error)
        })
    }

    deleteById = (req:Request, res:Response) => {
        this.moduleRepository.deleteById(Number(req.params.id)).then((deltedModule) => {
            res.json(deltedModule)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }

    updateModule = (req:Request, res:Response) => {
        const [error,registerModuleDto] = RegisterModuleDto.create(req.body)
        if(error) return res.status(400).json({error})
        this.moduleRepository.update(registerModuleDto!).then((module) => {
            res.json(module)
        }).catch((error)=>{
            console.log(error);
            
            res.status(500).json(error)
        })
    }
}