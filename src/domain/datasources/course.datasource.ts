import { RegisterCourseDto } from "../dtos/courses/register-course.dto";
import { CourseEntity } from "../entities/course.entity";

export abstract class CourseDatasource {
    abstract register(registerCourseDto: RegisterCourseDto): Promise<CourseEntity>
    abstract getById(id:number): Promise<CourseEntity | null>
    abstract getAll(): Promise<CourseEntity[]>
}