import { Router } from "express";
import { CoursesController } from "./controller";
import { CourseDatasourceImpl } from "../../infrastructure/datasource/course.datasource.impl";
import { CourseRepositoryImpl } from "../../infrastructure/repositories/course.repository.impl";

export class CoursesRoutes {
    static get routes(): Router {
        const router = Router()

        const datasource = new CourseDatasourceImpl()
        const courseRepository = new CourseRepositoryImpl(datasource)

        const controller = new CoursesController(courseRepository)
        router.get('/', controller.getAllCourses)
        router.get('/:id', controller.getCourseById)
        router.post('/save', controller.createCourse)
        router.delete('/id/:id', controller.deleteById)
        router.put('/', controller.updateCourse)
        router.delete('/externalid',controller.deleteByExternalId)
        return router;
    }
}