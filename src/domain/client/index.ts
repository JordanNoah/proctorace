import { InstitutionDatasourceImpl } from "../../infrastructure";
import { SequelizeEnrolment } from "../../infrastructure/database/models/Enrolment";
import { SequelizeRoleAssigned } from "../../infrastructure/database/models/RoleAssigned";
import { SequelizeSeeders } from "../../infrastructure/database/seeders";
import { sequelize } from "../../infrastructure/database/sequelize";
import { CustomError } from "../errors/custom.error";
import { CoursesClient } from "./courses";
import { RolesClient } from "./roles";
import { UsersClient } from "./users";

export class SyncDataCollector {
    public async start() {
        try{
            sequelize.sync({force:true}).then( async ()=>{
                await SequelizeSeeders.run()
                console.log("Epiezo con la sync de la base");
                var institutions = await new InstitutionDatasourceImpl().getAll()
                for (let index = 0; index < institutions.length; index++) {
                    const element = institutions[index];
                    await new UsersClient(element).syncUserMdl()
                    await new RolesClient(element).sync()
                    await new CoursesClient(element).sync()
                }
            })
        }catch(error){
            console.log(error);
            
            if (error instanceof CustomError) {
                throw error.message;
            }
                        
            throw CustomError.internalSever()
        }
    }
}