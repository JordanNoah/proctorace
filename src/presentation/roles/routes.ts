import { Router } from "express";
import { RoleDatasourceImpl } from "../../infrastructure/datasource/role.datasource.impl";
import { RoleRepositoryImpl } from "../../infrastructure/repositories/role.repository.impl";
import { RoleController } from "./controller";

export class RoleRoutes {
    static get routes(): Router {
        const router = Router()
        
        const datasource = new RoleDatasourceImpl()
        const roleRepository = new RoleRepositoryImpl(datasource)

        const controller = new RoleController(roleRepository)
        router.get('/',controller.getAllRole)
        router.post('/save',controller.createRole)
        router.get('/:id',controller.getById)
        router.delete('/:id',controller.deleteById)
        router.put('/',controller.updateRole)
        router.post('/assigned',controller.assignedRole)
        router.post('/unassigned',controller.unassignedRole)
        return router;
    }
}