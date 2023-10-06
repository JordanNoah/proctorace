import express, { Router } from 'express'
import { sequelize } from '../infrastructure/database/sequelize';
import {SequelizeInstitution} from '../infrastructure/database/models/Institution'
import { SequelizeUser } from '../infrastructure/database/models/User';
import { SequelizeCourse } from '../infrastructure/database/models/Course';
import { SequelizeModule } from '../infrastructure/database/models/Module';
import { SequelizeEnrollment } from '../infrastructure/database/models/Enrollment';

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
        await SequelizeUser.sync({force:true})
        await SequelizeCourse.sync({force:false})
        await SequelizeModule.sync({force:false})
        await SequelizeEnrollment.sync({force:true})
        SequelizeUser.belongsTo(SequelizeInstitution,{
            foreignKey:'id',
            as:"institution"
        })
        SequelizeCourse.belongsTo(SequelizeInstitution,{
            foreignKey:'id',
            as:'institution'
        })
        SequelizeModule.belongsTo(SequelizeInstitution,{
            foreignKey:'id',
            as:'institution'
        })
        SequelizeModule.belongsTo(SequelizeCourse,{
            foreignKey:'id',
            as:'course'
        })
        this.app.listen(this.port,() => {
            console.log(`Server running on PORT ${this.port}`);
        })    
    }
}