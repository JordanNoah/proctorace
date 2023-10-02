import { Router } from "express";
import { InstitutionsRoutes } from "./institutions/routes";
import { UserRoutes } from './users/routes'

export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        //aqui definire las rutas que sean necesarias para la recepcion de data
        router.use('/api/institutions',InstitutionsRoutes.routes)
        //router.use('/api/courses')
        //router.use('/api/enrollments')
        //router.use('/api/modules')
        //router.use('/api/sessions')
        router.use('/api/users', UserRoutes.routes)
        return router;
    }
}