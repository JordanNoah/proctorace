import { RegisterUserDto, UserRepository } from "../../domain";
import { DeleteCourseMdlDto } from "../../domain/dtos/courses/delete-course-mdl.dto";
import { RegisterCourseDto } from "../../domain/dtos/courses/register-course.dto";
import { DeleteEnrolmentMdlDto } from "../../domain/dtos/enrolment/delete-enrolment.dto";
import { RegisterEnrolmentDto } from "../../domain/dtos/enrolment/register-enrolment.dto";
import { RegisterModuleDto } from "../../domain/dtos/modules/register-module.dto";
import { DeleteUserMdlDto } from "../../domain/dtos/users/delete-user-mdl.dto";
import { CourseDatasourceImpl } from "../datasource/course.datasource.impl";
import { EnrolmentDatasourceImpl } from "../datasource/enrolment.datasource.impl";
import { ModuleDatasourceImpl } from "../datasource/module.datasource.impl";
import { UserDatasourceImpl } from "../datasource/user.datasource.impl";
import { CourseRepositoryImpl } from "../repositories/course.repository.impl";
import { EnrolmentRepositoryImpl } from "../repositories/enrolment.repository.impl";
import { ModuleRepositoryImpl } from "../repositories/module.repository.impl";
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

    public static createEnrolment(content:object){
        const datasource = new EnrolmentDatasourceImpl()
        const enrolmentRepository = new EnrolmentRepositoryImpl(datasource)

        const [error,registerEnrolmentDto] = RegisterEnrolmentDto.create(content)
        if(error) console.error(error)
        
        enrolmentRepository.register(registerEnrolmentDto!).then((enrolment) => {
            console.log(`Enrolment has been createde: ${enrolment.externalId}`);
        }).catch((error) => {
            console.error(error.message);
            console.error(registerEnrolmentDto);
        })
    }

    public static updateEnrolment(content:object){
        const datasource = new EnrolmentDatasourceImpl()
        const enrolmentRepository = new EnrolmentRepositoryImpl(datasource)

        const [error,registerEnrolmentDto] = RegisterEnrolmentDto.create(content)
        if(error) console.error(error)

        console.log(registerEnrolmentDto);
        

        enrolmentRepository.update(registerEnrolmentDto!).then((enrolment) => {
            console.log(`Enrolment has been update: ${enrolment?.id}`);
        }).catch((error) => {
            console.error(error.message);
            console.error(registerEnrolmentDto);
        })
    } 
    public static deleteEnrolment(content:object){
        const datasource = new EnrolmentDatasourceImpl()
        const enrolmentRepository = new EnrolmentRepositoryImpl(datasource)

        const [error, deleteEnrolmentMdlDto] = DeleteEnrolmentMdlDto.create(content)

        if (error) console.error(error)

        enrolmentRepository.deleteByExternalId(deleteEnrolmentMdlDto!).then((enrolment) => {
            console.log(`Enrolment has been deleted: ${enrolment}`);
        }).catch((error) => {
            console.error(error.message);
            console.error(deleteEnrolmentMdlDto);
        })
    }

    public static createModule(content:object){
        const datasource = new ModuleDatasourceImpl()
        const moduleRepository = new ModuleRepositoryImpl(datasource)
        const [error,registerModuleDto] = RegisterModuleDto.create(content)

        if (error) console.error(error)

        moduleRepository.register(registerModuleDto!).then((module) => {
            console.log(`Module has been created: ${module}`);
        }).catch((error) =>{
            console.error(error.message);
        })
    }

    public static updateModule(content:object){
        const datasource = new ModuleDatasourceImpl()
        const moduleRepository = new ModuleRepositoryImpl(datasource)
        const [error,registerModuleDto] = RegisterModuleDto.create(content)

        if(error) console.error(error);
        
        moduleRepository.update(registerModuleDto!).then((module) => {
            console.log(`Module has been updated: ${module}`);
        }).catch((error) => {
            console.error(error.message);
        })
    }
    public static deleteModule(content:object){
        const datasource = new ModuleDatasourceImpl()
        const moduleRepository = new ModuleRepositoryImpl(datasource)
        const [error,registerModuleDto] = RegisterModuleDto.create(content)

        if(error) console.error(error);

        moduleRepository.deleteByModuleDto(registerModuleDto!).then((module) => {
            console.log(`Module has been deleted: ${module}`);
        }).catch((error) => {
            console.error(error.message);
        })
    }

    public static roleAssigned(content:object){}

    public static roleUnassigned(content:object){}
}