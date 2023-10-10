import { DataType, DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";
import { SequelizeInstitution } from "./Institution";

interface RoleRow {
    id: number,
    externalId: number,
    name: string | null,
    shortname: string,
    institutionId: number,
    description: string | null,
    archetype: string,
    createdAt?: Date,
    updatedAt?: Date
}

export class SequelizeRole extends Model<RoleRow, Omit<RoleRow,'id'>>{
    declare id: number
    declare externalId: number
    declare name: string | null
    declare shortname: string
    declare institutionId: number
    declare description: string | null
    declare archetype: string
    
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
}

SequelizeRole.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    externalId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:true
    },
    shortname:{
        type:DataTypes.STRING,
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
    description:{
        type:DataTypes.STRING,
        allowNull:true
    },
    archetype:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    sequelize,
    timestamps:true,
    tableName:'roles'
})