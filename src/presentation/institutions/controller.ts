import {Request, Response, response} from 'express'
import { InstitutionRepository, RegisterInstitutionDto } from '../../domain'

export class InstitutionsController {
    constructor(
        private readonly institutionRepository:InstitutionRepository
    ){}
    
    createInstitution = (req: Request, res: Response) => {
        const [error,registerInstitutionDto] = RegisterInstitutionDto.create(req.body)
        if( error ) return res.status(400).json({ error })
        this.institutionRepository.register(registerInstitutionDto!).then((institution) => {
            res.json(institution)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }

    getAllInstitutions = (req: Request, res: Response) => {
        this.institutionRepository.getAll().then((institutions)=>{
            res.json(institutions)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }

    getByUuid = (req: Request, res: Response) => {
        this.institutionRepository.getByUuid(req.params.uuid).then((institution)=>{
            res.json(institution)
        }).catch((error)=>{
            res.status(500).json(error)
        })
    }

    deleteByUuid = (req: Request, res: Response) => {
        this.institutionRepository.deleteByUuid(req.params.uuid).then((response)=>{
            res.json(response)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }

    updateInstitutionByUuid = (req: Request, res: Response) => {
        const [error,registerInstitutionDto] = RegisterInstitutionDto.create(req.body)
        if( error ) return res.status(400).json({ error })
        this.institutionRepository.updatebyUuid(registerInstitutionDto!).then((institution) => {
            res.json(institution)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }
}