import { InstitutionDatasourceImpl } from "../../infrastructure";
import { SequelizeEnrolment } from "../../infrastructure/database/models/Enrolment";
import { SequelizeRoleAssigned } from "../../infrastructure/database/models/RoleAssigned";
import { SequelizeSeeders } from "../../infrastructure/database/seeders";
import { sequelize } from "../../infrastructure/database/sequelize";
import { CustomError } from "../errors/custom.error";
import { CoursesClient } from "./courses";
import { EnrolmentClient } from "./enrolments";
import { ModuleClient } from "./module";
import { RoleAssigned } from "./roleAssigned";
import { RolesClient } from "./roles";
import { UsersClient } from "./users";

export class SyncDataCollector {
    public async start() {
        var syncDb = true
        try{
            sequelize.sync({force:true}).then( async ()=>{
                await SequelizeSeeders.run()
                if(syncDb){
                    var institutions = await new InstitutionDatasourceImpl().getAll()                
                    for (let index = 0; index < institutions.length; index++) {
                        const element = institutions[index];
                        await new UsersClient(element).syncUserMdl()
                        await new RolesClient(element).sync()
                        await new CoursesClient(element).sync()
                        await new EnrolmentClient(element).sync()
                        await new ModuleClient(element).sync()
                        await new RoleAssigned(element).sync()
                    }
                }
            })
        }catch(error){            
            if (error instanceof CustomError) {
                throw error.message;
            }
                        
            throw CustomError.internalSever()
        }
    }
}