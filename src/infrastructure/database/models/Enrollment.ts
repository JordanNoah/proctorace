import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../sequelize'

interface EnrollmentRow {
    id: number,
    externalId: number,
    institutionId: number,
    startDate: string,
    endDate: string,
    createdAt?: Date,
    updatedAt?:Date
}

export class SequelizeEnrollment extends Model<EnrollmentRow, Omit<EnrollmentRow,'id'>>{
    declare id: number
    declare externalId: number
    declare institutionId: number
    declare startDate: string
    declare endDate: string

    declare readonly createdAt?: Date
    declare readonly updatedAt?:Date
}

SequelizeEnrollment.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    externalId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    institutionId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    startDate:{
        type:DataTypes.STRING,
        allowNull:false
    },
    endDate:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    sequelize,
    timestamps:true,
    tableName:'enrollments'
})
