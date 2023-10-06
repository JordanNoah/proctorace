import { Router } from "express"
import { ModuleController } from "./controller";
import { ModuleDatasourceImpl } from "../../infrastructure/datasource/module.datasource.impl";

export class ModuleRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new ModuleDatasourceImpl()
        const controller = new ModuleController(datasource)
        router.post('/save', controller.createModule)
        return router;
    }
}