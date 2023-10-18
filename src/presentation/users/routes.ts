import { Router } from "express"
import {UserController} from "./controller"
import { UserDatasourceImpl, UserRepositoryImpl } from "../../infrastructure"

export class UserRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new UserDatasourceImpl()
        const userRepository = new UserRepositoryImpl(datasource)

        const controller = new UserController(userRepository)
        router.get('/', controller.getAllUsers)
        router.post('/save', controller.createUser)
        router.get('/:id', controller.getById)
        router.delete('/id/:id',controller.deleteById)
        router.put('/',controller.updateUser)
        router.delete('/externalid', controller.deleteByExternalId)
        return router;
    }
}