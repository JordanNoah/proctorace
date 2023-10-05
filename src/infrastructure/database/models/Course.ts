import { Model, DataTypes } from "sequelize"
import { sequelize } from "../sequelize"
import { SequelizeInstitution } from "./Institution"

interface CourseRow {
    id: number,
    externalId: number,
    institutionId: number,
    name: string,
    shortName: string,
    idNumber: string,
    startDate: number,
    endDate: number,
    createdAt?: Date,
    updatedAt?:Date
}

export class SequelizeCourse extends Model<CourseRow,Omit<CourseRow,'id'>>{
    declare id: number
    declare externalId: number
    declare institutionId: number
    declare name: string
    declare shortName: string
    declare idNumber: string
    declare startDate: number
    declare endDate: number
    declare readonly createdAt: Date
    declare readonly updatedAt:Date
}

SequelizeCourse.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    externalId:{
        type: DataTypes.INTEGER,
        allowNull: true
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
        allowNull: true
    },
    shortName:{
        type: DataTypes.STRING,
        allowNull: true
    },
    idNumber:{
        type: DataTypes.STRING,
        allowNull: true
    },
    startDate:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    endDate:{
        type: DataTypes.INTEGER,
        allowNull: true
    }
},{
    sequelize,
    timestamps:true,
    tableName:'courses'
})