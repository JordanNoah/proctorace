import {Request, Response, response} from 'express'

export class CoursesController{
    constructor(){}

    createCourse = (req:Request, res: Response) => {
        res.json('create course');
    }
    getAllCourses = (req: Request, res: Response) => {
        res.json('get all courses')
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
