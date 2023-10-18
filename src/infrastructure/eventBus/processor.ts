import { RegisterUserDto, UserRepository } from "../../domain";
import { DeleteCourseMdlDto } from "../../domain/dtos/courses/delete-course-mdl.dto";
import { RegisterCourseDto } from "../../domain/dtos/courses/register-course.dto";
import { DeleteUserMdlDto } from "../../domain/dtos/users/delete-user-mdl.dto";
import { CourseDatasourceImpl } from "../datasource/course.datasource.impl";
import { UserDatasourceImpl } from "../datasource/user.datasource.impl";
import { CourseRepositoryImpl } from "../repositories/course.repository.impl";
import { UserRepositoryImpl } from "../repositories/user.repository.impl";

export class Processor {
    public static createUser(content:object){
        const datasource = new UserDatasourceImpl()
        const userRepository = new UserRepositoryImpl(datasource)
        const [error, registerUserDto] = RegisterUserDto.create(content)
                
        if (error) console.error(error);
        userRepository.register(registerUserDto!).then((user) => {
            console.log(`User created: ${user.fullName}`);
        }).catch((e) => {
            console.error(e);
        })
    }
    public static updateUser(content:object){
        const datasource = new UserDatasourceImpl()
        const userRepository = new UserRepositoryImpl(datasource)

        const [error, registerUserDto] = RegisterUserDto.create(content)
        if (error) console.error(error);

        userRepository.update(registerUserDto!).then((user) => {
            console.log(`User updated: ${user?.externalId}`);
        }).catch((e) => {
            console.error(e.message);
            console.error(registerUserDto);
            
        })
    }
    public static deleteUser(content:object){
        const datasource = new UserDatasourceImpl()
        const userRepository = new UserRepositoryImpl(datasource)

        const [error,deleteUserMdlDto] = DeleteUserMdlDto.create(content)
        if(error) console.error(error)
        
        userRepository.deleteByExternalId(deleteUserMdlDto!).then((user) => {
            console.log(`User has been removed: ${user.userName}`);
        }).catch((e) => {
            console.error(e.message);
            console.error(deleteUserMdlDto);
        })
        
    }

    public static createCourse(content:object){
        const datasource = new CourseDatasourceImpl()
        const courseRepository = new CourseRepositoryImpl(datasource)

        const [error,registerCourseDto] = RegisterCourseDto.create(content)
        if(error) console.error(error)

        courseRepository.register(registerCourseDto!).then((course) => {
            console.log(`Course has been createde: ${course.name}`);
        }).catch((e) => {
            console.error(e.message);
            console.error(registerCourseDto);
        })
    }
    public static updateCourse(content:object){
        const datasource = new CourseDatasourceImpl()
        const courseRepository = new CourseRepositoryImpl(datasource)

        const [error,registerCourseDto] = RegisterCourseDto.create(content)
        if(error) console.error(error)

        courseRepository.update(registerCourseDto!).then((course) => {
            console.log(`Course has been updated: ${course?.shortName}`);
        }).catch((error) => {
            console.error(error.message);
            console.error(registerCourseDto);
        })
    }
    public static deleteCourse(content:object){
        const datasource = new CourseDatasourceImpl()
        const courseRepository = new CourseRepositoryImpl(datasource)

        const [error,deleteCourseMdlDto] = DeleteCourseMdlDto.create(content)
        if(error) console.error(error)

        courseRepository.deleteByExternalId(deleteCourseMdlDto!).then((course) => {
            console.log(`Course has been deleted: ${course?.shortName}`)
        }).catch((error) => {
            console.error(error.message);
            console.error(deleteCourseMdlDto);
        })
    }

    public static createEnrolment(content:object){}
    public static updateEnrolment(content:object){}
    public static deleteEnrolment(content:object){}

    public static createModule(content:object){}
    public static updateModule(content:object){}
    public static deleteModule(content:object){}

    public static roleAssigned(content:object){}

    public static roleUnassigned(content:object){}
}