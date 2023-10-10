import express, { Router } from 'express'
import { sequelize } from '../infrastructure/database/sequelize';
import {SequelizeInstitution} from '../infrastructure/database/models/Institution'
import { SequelizeUser } from '../infrastructure/database/models/User';
import { SequelizeCourse } from '../infrastructure/database/models/Course';
import { SequelizeModule } from '../infrastructure/database/models/Module';
import { SequelizeEnrolment } from '../infrastructure/database/models/Enrolment';
import { SequelizeRole } from '../infrastructure/database/models/Role';

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
        await SequelizeInstitution.sync({force:false})
        await SequelizeUser.sync({force:false})
        await SequelizeCourse.sync({force:false})
        await SequelizeModule.sync({force:false})
        await SequelizeEnrolment.sync({force:false})
        await SequelizeRole.sync({force:false})
        SequelizeUser.belongsTo(SequelizeInstitution,{
            foreignKey:'institutionId',
            as:"institution"
        })
        SequelizeCourse.belongsTo(SequelizeInstitution,{
            foreignKey:'institutionId',
            as:'institution'
        })
        SequelizeModule.belongsTo(SequelizeInstitution,{
            foreignKey:'institutionId',
            as:'institution'
        })
        SequelizeModule.belongsTo(SequelizeCourse,{
            foreignKey:'courseId',
            as:'course'
        })
        SequelizeEnrolment.belongsTo(SequelizeInstitution,{
            foreignKey:'institutionId',
            as:'institution'
        })
        SequelizeEnrolment.belongsTo(SequelizeCourse,{
            foreignKey:'courseId',
            as:'course'
        })
        SequelizeEnrolment.belongsTo(SequelizeUser,{
            foreignKey:'userId',
            as:'user'
        })
        SequelizeRole.belongsTo(SequelizeInstitution,{
            foreignKey:'institutionId',
            as:'institution'
        })
        this.app.listen(this.port,() => {
            console.log(`Server running on PORT ${this.port}`);
        })    
    }
}