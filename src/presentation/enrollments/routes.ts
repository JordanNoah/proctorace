import { Router } from "express";
import { EnrolmentDatasourceImpl } from "../../infrastructure/datasource/enrolment.datasource.impl";
import { EnrolmentRepositoryImpl } from "../../infrastructure/repositories/enrolment.repository.impl";
import { EnrolmentController } from "./controller";

export class EnrolmentRoutes {
    static get routes(): Router{
        const router = Router();

        const datasource = new EnrolmentDatasourceImpl()
        const enrolmentRepository = new EnrolmentRepositoryImpl(datasource)

        const controller = new EnrolmentController(enrolmentRepository)
        
        router.get('/',controller.getAllEnrolments)
        router.post('/save',controller.createEnrolment)
        router.get('/:id',controller.getbyId)
        router.delete('/:id',controller.deleteById)
        router.put('/',controller.updateEnrolment)

        return router;
    }
}