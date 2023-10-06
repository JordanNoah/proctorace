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
}