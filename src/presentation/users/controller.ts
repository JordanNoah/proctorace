import { Request, Response } from "express";
import { UserRepository, RegisterUserDto } from '../../domain'

export class UserController {
    constructor(
        private readonly userRepository:UserRepository
    ){}

    createUser = (req: Request, res: Response) => {
        const [error,registerUserDto] = RegisterUserDto.create(req.body)
        if(error) return res.status(400).json({error})
        this.userRepository.register(registerUserDto!).then((user)=>{
            res.json(user)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }

    getAllUsers = (req: Request, res: Response) => {
        this.userRepository.getAll().then((users)=>{
            res.json(users)
        }).catch((error)=> {
            res.status(500).json(error)
        })
    }

    getById = (req: Request, res: Response) => {
        this.userRepository.getById(Number(req.params.id)).then((user) => {
            res.json(user)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }

    deleteById = (req: Request, res: Response) => {
        this.userRepository.deleteById(Number(req.params.id)).then((response) => {
            res.json(response)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }

    updateUser = (req: Request, res: Response) => {
        const [error,registerUserDto] = RegisterUserDto.create(req.body)
        if(error) return res.status(400).json({error})

        this.userRepository.update(registerUserDto!).then((user) => {
            res.json(user)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }
}