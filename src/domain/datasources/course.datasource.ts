import { DeleteCourseMdlDto } from "../dtos/courses/delete-course-mdl.dto";
import { RegisterCourseDto } from "../dtos/courses/register-course.dto";
import { CourseEntity } from "../entities/course.entity";

export abstract class CourseDatasource {
    abstract register(registerCourseDto: RegisterCourseDto): Promise<CourseEntity>
    abstract getById(id:number): Promise<CourseEntity | null>
    abstract getAll(): Promise<CourseEntity[]>
    abstract deleteById(id: number): Promise<CourseEntity>
    abstract update(registerCourseDto:RegisterCourseDto): Promise<CourseEntity | null>
    abstract deleteByExternalId(deleteByExternalId: DeleteCourseMdlDto): Promise<CourseEntity>
}