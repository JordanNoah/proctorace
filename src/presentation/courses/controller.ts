import e, {Request, Response, response} from 'express'
import { CourseRepository } from '../../domain/repositories/course.repository';
import { RegisterCourseDto } from '../../domain/dtos/courses/register-course.dto';
import { DeleteCourseMdlDto } from '../../domain/dtos/courses/delete-course-mdl.dto';

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
    getCourseById = (req: Request, res: Response) => {
        this.courseRepository.getById(Number(req.params.id)).then((course) => {
            res.json(course)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }
    deleteById = (req: Request, res: Response) => {
        this.courseRepository.deleteById(Number(req.params.id)).then((response) => {
            res.json(response)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }
    updateCourse = (req: Request, res: Response) => {
        const [error,registerCourseDto] = RegisterCourseDto.create(req.body)
        this.courseRepository.update(registerCourseDto!).then((course) => {
            res.json(course)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }
    deleteByExternalId = (req: Request, res: Response) => {
        const [error,deleteCourseMdlDto] = DeleteCourseMdlDto.create(req.body)
        if (error) return res.status(400).json({error})

        this.courseRepository.deleteByExternalId(deleteCourseMdlDto!).then((course) => {
            res.json(course)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }
}
