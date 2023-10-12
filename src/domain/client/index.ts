import { InstitutionDatasourceImpl } from "../../infrastructure";
import { SequelizeEnrolment } from "../../infrastructure/database/models/Enrolment";
import { SequelizeRoleAssigned } from "../../infrastructure/database/models/RoleAssigned";
import { sequelize } from "../../infrastructure/database/sequelize";
import { CustomError } from "../errors/custom.error";
import { UsersClient } from "./users";

export class SyncDataCollector {
    public async start() {
        try{

            //var institutions = await new InstitutionDatasourceImpl().getAll()
            //for (let index = 0; index < institutions.length; index++) {
               // const element = institutions[index];
                //await new UsersClient(element).syncUserMdl()
            //}
            
        }catch(error){
            console.log(error);
            
            if (error instanceof CustomError) {
                throw error.message;
            }
                        
            throw CustomError.internalSever()
        }
    }
}