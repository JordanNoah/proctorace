import { Router } from "express";
import { CoursesController } from "./controller";

export class InstitutionsRoutes {
    static get routes(): Router {
        const router = Router()

        const controller = new CoursesController()
        router.get('/', controller.getAllCourses)
        router.get('/:uuid', controller.getCourseByExternalId)
        router.post('/save', controller.createCourse)
        router.delete('/:uuid', controller.deleteByExternalId)
        router.put('/', controller.updateCourseByUuid)
        return router;
    }
}