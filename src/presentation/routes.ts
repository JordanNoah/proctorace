import { Router } from "express";
import { InstitutionsRoutes } from "./institutions/routes";
import { UserRoutes } from './users/routes'
import { CoursesRoutes } from './courses/routes'
import { ModuleRoutes } from "./modules/routes";
import { EnrolmentRoutes } from "./enrollments/routes";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        //aqui definire las rutas que sean necesarias para la recepcion de data
        router.use('/api/institutions',InstitutionsRoutes.routes)
        router.use('/api/courses', CoursesRoutes.routes)
        router.use('/api/enrollments',EnrolmentRoutes.routes)
        router.use('/api/modules', ModuleRoutes.routes)
        //router.use('/api/sessions')
        router.use('/api/users', UserRoutes.routes)
        return router;
    }
}