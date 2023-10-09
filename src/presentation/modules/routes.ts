import { Router } from "express"
import { ModuleController } from "./controller";
import { ModuleDatasourceImpl } from "../../infrastructure/datasource/module.datasource.impl";

export class ModuleRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new ModuleDatasourceImpl()
        const controller = new ModuleController(datasource)
        router.get('/', controller.getAllModules)
        router.post('/save', controller.createModule)
        router.get('/:id', controller.getById)
        router.delete('/:id', controller.deleteById)
        router.put('/',controller.updateModule)
        return router;
    }
}