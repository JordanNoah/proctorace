import {Request, Response, response} from 'express'
import { CourseRepository } from '../../domain/repositories/course.repository';
import { RegisterCourseDto } from '../../domain/dtos/courses/register-course.dto';

export class CoursesController{
    constructor(
        private readonly courseRepository:CourseRepository
    ){}

    createCourse = (req:Request, res: Response) => {
        const [error,registerCourseDto] = RegisterCourseDto.create(req.body)
        if(error) return res.status(400).json({error})
        this.courseRepository.register(registerCourseDto!).then((course) => {
            res.json(course)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }
    getAllCourses = (req: Request, res: Response) => {
        this.courseRepository.getAll().then((courses) => {
            res.json(courses)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }
    getCourseByExternalId = (req: Request, res: Response) => {
        res.json('get course by external id')
    }
    deleteByExternalId = (req: Request, res: Response) => {
        res.json('delete by externl id')
    }
    updateCourseByUuid = (req: Request, res: Response) => {
        res.json('update course by uuid')
    }
}
