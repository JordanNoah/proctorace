import { Router } from "express"
import {UserController} from "./controller"
import { UserDatasourceImpl, UserRepositoryImpl } from "../../infrastructure"

export class UserRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new UserDatasourceImpl()
        const userRepository = new UserRepositoryImpl(datasource)

        const controller = new UserController(userRepository)
        router.post('/save', controller.createUser)
        return router;
    }
}