import { CourseDatasource } from "../../domain/datasources/course.datasource";
import { DeleteCourseMdlDto } from "../../domain/dtos/courses/delete-course-mdl.dto";
import { RegisterCourseDto } from "../../domain/dtos/courses/register-course.dto";
import { CourseEntity } from "../../domain/entities/course.entity";
import { CourseRepository } from "../../domain/repositories/course.repository";

export class CourseRepositoryImpl implements CourseRepository {
    constructor(
        private readonly courseDatasource: CourseDatasource
    ){}
    
    register(registerCourseDto: RegisterCourseDto): Promise<CourseEntity> {
        return this.courseDatasource.register(registerCourseDto)
    }
    
    getById(id: number): Promise<CourseEntity | null> {
        return this.courseDatasource.getById(id)
    }
    
    getAll(): Promise<CourseEntity[]> {
        return this.courseDatasource.getAll()
    }
    
    deleteById(id: number): Promise<CourseEntity> {
        return this.courseDatasource.deleteById(id)
    }
    
    update(registerCourseDto: RegisterCourseDto): Promise<CourseEntity | null> {
        return this.courseDatasource.update(registerCourseDto)
    }

    deleteByExternalId(deleteByExternalId: DeleteCourseMdlDto): Promise<CourseEntity> {
        return this.courseDatasource.deleteByExternalId(deleteByExternalId)
    }
}