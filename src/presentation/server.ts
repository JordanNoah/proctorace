import express, { Router } from 'express'
import { sequelize } from '../infrastructure/database/sequelize';
import {SequelizeInstitution} from '../infrastructure/database/models/Institution'
import { SequelizeUser } from '../infrastructure/database/models/User';
import { SequelizeCourse } from '../infrastructure/database/models/Course';
import { SequelizeModule } from '../infrastructure/database/models/Module';
import { SequelizeEnrolment } from '../infrastructure/database/models/Enrolment';
import { SequelizeRole } from '../infrastructure/database/models/Role';
import { SequelizeRoleAssigned } from '../infrastructure/database/models/RoleAssigned';
import { SyncDataCollector } from '../domain/client';
import { CustomError } from '../domain';

interface Options{
    port?: number;
    routes: Router;
}

export class Server {
    public readonly app = express()
    private readonly port: number;
    private readonly routes: Router;

    constructor(options: Options){
        const {port = 3000, routes} = options;
        this.port = port;
        this.routes = routes;
    }

    async start(){
        //middlewares
        this.app.use(express.json())

        this.app.use(this.routes)

        SequelizeUser.belongsTo(SequelizeInstitution,{
            foreignKey:'institutionId',
            as:"institution",
            onDelete:'CASCADE'
        })
        SequelizeCourse.belongsTo(SequelizeInstitution,{
            foreignKey:'institutionId',
            as:'institution',
            onDelete:'CASCADE'
        })
        SequelizeModule.belongsTo(SequelizeInstitution,{
            foreignKey:'institutionId',
            as:'institution',
            onDelete:'CASCADE'
        })
        SequelizeModule.belongsTo(SequelizeCourse,{
            foreignKey:'courseId',
            as:'course',
            onDelete:'CASCADE'
        })
        SequelizeEnrolment.belongsTo(SequelizeInstitution,{
            foreignKey:'institutionId',
            as:'institution',
            onDelete:'CASCADE'
        })
        SequelizeEnrolment.belongsTo(SequelizeCourse,{
            foreignKey:'courseId',
            as:'course',
            onDelete:'CASCADE'
        })
        SequelizeEnrolment.belongsTo(SequelizeUser,{
            foreignKey:'userId',
            as:'user',
            onDelete:'CASCADE'
        })
        SequelizeRole.belongsTo(SequelizeInstitution,{
            foreignKey:'institutionId',
            as:'institution',
            onDelete:'CASCADE'
        })
        SequelizeRoleAssigned.belongsTo(SequelizeRole,{
            foreignKey:'roleId',
            as:'role',
            onDelete:'CASCADE'
        })            
        SequelizeRoleAssigned.belongsTo(SequelizeUser,{
            foreignKey:'userId',
            as:'user',
            onDelete:'CASCADE'
        })            
        SequelizeRoleAssigned.belongsTo(SequelizeEnrolment,{
            foreignKey:'enrolmentId',
            as:'enrolment',
            onDelete:'CASCADE'
        })            
        SequelizeRoleAssigned.belongsTo(SequelizeCourse,{
            foreignKey:'courseId',
            as:'course',
            onDelete:'CASCADE'
        })            
        SequelizeRoleAssigned.belongsTo(SequelizeInstitution,{
            foreignKey:'institutionId',
            as:'institution',
            onDelete:'CASCADE'
        })                
        
        var collectOldData = true;
        if(!collectOldData){
            await SequelizeInstitution.sync({force:false})
            await SequelizeUser.sync({force:false})
            await SequelizeCourse.sync({force:false})
            await SequelizeModule.sync({force:false})
            await SequelizeEnrolment.sync({force:false})
            await SequelizeRole.sync({force:false})
            await SequelizeRoleAssigned.sync({force:false})
        }else{
            try {
                await new SyncDataCollector().start();
            } catch (error) {
                if (error instanceof CustomError) {
                    throw error.message;
                }
                            
                throw CustomError.internalSever()
            }
        }
        

        this.app.listen(this.port,async () => {
            console.log(`Server running on PORT ${this.port}`);
        })    
    }
}