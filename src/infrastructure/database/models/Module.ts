import { DataTypes, Model } from "sequelize"
import { sequelize } from "../sequelize"
import { SequelizeInstitution } from "./Institution"
import { SequelizeCourse } from "./Course"

interface ModuleRow {
    id: number,
    externalId: number,
    institutionId: number,
    courseId: number,
    name: string,
    type: string,
    url: string,
    startDate: number,
    endDate: number,
    createdAt?: Date,
    updatedAt?: Date
}

export class SequelizeModule extends Model<ModuleRow,Omit<ModuleRow,'id'>>{
    declare id: number
    declare externalId: number
    declare institutionId: number
    declare courseId: number
    declare name: string
    declare type: string
    declare url: string
    declare startDate: number
    declare endDate: number
    
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
}

SequelizeModule.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    externalId:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    courseId:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:SequelizeCourse,
            key:'id'
        }
    },
    institutionId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model: SequelizeInstitution,
            key: 'id'
        }
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    type:{
        type: DataTypes.STRING,
        allowNull:false
    },
    url:{
        type:DataTypes.STRING,
        allowNull:false
    },
    startDate:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    endDate:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    sequelize,
    timestamps:true,
    tableName:'modules'
})