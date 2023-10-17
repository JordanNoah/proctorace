import { RegisterUserDto } from "../../domain";
import { UserDatasourceImpl } from "../datasource/user.datasource.impl";
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
        
    }
    public static deleteUser(content:object){}

    public static createCourse(content:object){}
    public static updateCourse(content:object){}
    public static deleteCourse(content:object){}

    public static createEnrolment(content:object){}
    public static updateEnrolment(content:object){}
    public static deleteEnrolment(content:object){}

    public static createModule(content:object){}
    public static updateModule(content:object){}
    public static deleteModule(content:object){}

    public static roleAssigned(content:object){}

    public static roleUnassigned(content:object){}
}