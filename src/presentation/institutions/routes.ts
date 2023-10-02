import { Router } from "express";
import { InstitutionsController } from "./controller";
import { InstitutionDatasourceImpl, InstitutionRepositoryImpl } from "../../infrastructure";

export class InstitutionsRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new InstitutionDatasourceImpl();
        const institutionRepository = new InstitutionRepositoryImpl(datasource)

        const controller = new InstitutionsController(institutionRepository);
        router.get('/', controller.getAllInstitutions)
        router.get('/:uuid', controller.getByUuid)
        router.post('/save', controller.createInstitution)
        router.delete('/:uuid', controller.deleteByUuid)
        router.put('/', controller.updateInstitutionByUuid)
        return router;
    }
}