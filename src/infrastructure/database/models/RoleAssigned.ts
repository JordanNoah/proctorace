import { DataTypes, Model } from "sequelize"
import { sequelize } from "../sequelize";
import { SequelizeRole } from "./Role";
import { SequelizeUser } from "./User";
import { SequelizeEnrolment } from "./Enrolment";
import { SequelizeCourse } from "./Course";
import { SequelizeInstitution } from "./Institution";

interface RoleAssignedRow {
    id: number,
    externalId: number,
    roleId: number,
    userId: number,
    enrolmentId?: number,
    courseId: number,
    institutionId: number,
    createdAt?: Date,
    updatedAt?: Date
}

export class SequelizeRoleAssigned extends Model<RoleAssignedRow, Omit<RoleAssignedRow,'id'>>{
    declare id: number
    declare externalId: number
    declare roleId: number
    declare userId: number
    declare enrolmentId: number
    declare courseId: number
    declare institutionId: number

    declare readonly createdAt: Date
    declare readonly updatedAt: Date
}

SequelizeRoleAssigned.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    externalId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    roleId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:SequelizeRole,
            key:'id'
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
    institutionId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:SequelizeInstitution,
            key:'id'
        }
    }
},{
    sequelize,
    timestamps:true,
    tableName:'roleAssigned'
})