import { Request, Response, response } from "express";
import { RegisterEnrolmentDto } from "../../domain/dtos/enrolment/register-enrolment.dto";
import { EnrolmentRepository } from "../../domain/repositories/enrolment.repository";

export class EnrolmentController {
    constructor(
        private readonly enrolmentRepository:EnrolmentRepository
    ){}

    createEnrolment = (req: Request, res: Response) => {
        const [error,registerEnrolmentDto] = RegisterEnrolmentDto.create(req.body)
        if(error) return res.status(400).json({error})
        this.enrolmentRepository.register(registerEnrolmentDto!).then((enrolment) => {
            res.json(enrolment)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }

    getAllEnrolments = (req: Request, res: Response) => {
        this.enrolmentRepository.getAll().then((enrolments) => {
            res.json(enrolments)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }

    getbyId = (req: Request, res:Response) => {
        this.enrolmentRepository.getById(Number(req.params.id)).then((enrolment) => {
            res.json(enrolment)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }

    deleteById = (req: Request, res: Response) => {
        this.enrolmentRepository.deleteById(Number(req.params.id)).then((response) =>{
            res.json(response)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }

    updateEnrolment = (req: Request, res: Response) => {
        const [error,registerEnrolmentDto] = RegisterEnrolmentDto.create(req.body)
        if(error) return res.status(400).json({error})
        this.enrolmentRepository.update(registerEnrolmentDto!).then((enrolment) => {
            res.json(enrolment)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }
}