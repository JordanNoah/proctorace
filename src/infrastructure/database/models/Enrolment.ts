import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../sequelize'
import { SequelizeInstitution } from './Institution'
import { SequelizeCourse } from './Course'
import { SequelizeUser } from './User'

interface EnrolmentRow {
    id: number,
    externalId: number,
    institutionId: number,
    userId: number,
    courseId: number,
    status: boolean,
    startDate: number,
    endDate: number,
    createdAt?: Date,
    updatedAt?:Date
}

export class SequelizeEnrolment extends Model<EnrolmentRow, Omit<EnrolmentRow,'id'>>{
    declare id: number
    declare externalId: number
    declare institutionId: number
    declare userId: number
    declare courseId: number
    declare status: boolean
    declare startDate: number
    declare endDate: number

    declare readonly createdAt: Date
    declare readonly updatedAt: Date
}

SequelizeEnrolment.init({
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
        allowNull:false,
        references:{
            model: SequelizeInstitution,
            key: 'id'
        }
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:SequelizeUser,
            key:'id'
        }
    },
    courseId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:SequelizeCourse,
            key:'id'
        }
    },
    status:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
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
    tableName:'enrollments'
})
