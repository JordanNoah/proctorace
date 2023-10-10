import { Request, Response, response } from "express";
import { RegisterRoleDto } from "../../domain/dtos/role/register-role.dto";
import { RoleRepository } from "../../domain/repositories/role.repository";
import { AssignedMdlDto } from "../../domain/dtos/role/assigned-mdl.dto";
import { UnassignedMdlDto } from "../../domain/dtos/role/unassigned-mdl.dto";

export class RoleController {
    constructor(
        private readonly roleRepository:RoleRepository
    ){}

    createRole = (req:Request, res:Response) => {
        const [error,registerRoleDto] = RegisterRoleDto.create(req.body)
        if(error) return res.status(400).json({error})
        this.roleRepository.register(registerRoleDto!).then((role)=>{
            res.json(role)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }

    getAllRole = (req:Request, res:Response) => {
        this.roleRepository.getAll().then((roles)=>{
            res.json(roles)
        }).catch((error)=>{
            res.status(500).json(error)
        })
    }
    
    getById = (req:Request, res:Response) => {
        this.roleRepository.getById(Number(req.params.id)).then((role)=>{
            res.json(role)
        }).catch((error)=>{
            res.status(500).json(error)
        })
    }

    deleteById = (req:Request, res:Response) => {
        this.roleRepository.deleteById(Number(req.params.id)).then((response) =>{
            res.json(response)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }

    updateRole = (req:Request,res:Response) => {
        const [error,registerRoleDto] = RegisterRoleDto.create(req.body)
        if(error) return res.status(400).json({error})

        this.roleRepository.update(registerRoleDto!).then((role) => {
            res.json(role)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }

    assignedRole = (req:Request,res:Response) => {
        const [error,assignedMdlDto] = AssignedMdlDto.create(req.body)
        if(error) return res.status(400).json({error})

        this.roleRepository.assigned(assignedMdlDto!).then((roleAssigned) => {
            res.json(roleAssigned)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }

    unassignedRole = (req:Request,res:Response) => {
        const [error,unassignedMdlDto] = UnassignedMdlDto.create(req.body)
        if(error) return res.status(400).json({error})

        this.roleRepository.unassigned(unassignedMdlDto!).then((roleUnassigned) => {
            res.json(roleUnassigned)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }
}