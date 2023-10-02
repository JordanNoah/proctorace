import { DataTypes, Model } from "sequelize"
import { sequelize } from "../sequelize"

interface ModuleRow {
    id: number,
    externalId: number,
    institutionId: number,
    name: string,
    type: string,
    url: string,
    startDate: Date,
    endDate: Date,
    createdAt?: Date,
    updatedAt?: Date
}

export class SequelizeModule extends Model<ModuleRow,Omit<ModuleRow,'id'>>{
    declare id: number
    declare externalId: number
    declare institutionId: number
    declare name: string
    declare type: string
    declare url: string
    declare startDate: Date
    declare endDate: Date
    
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
    institutionId:{
        type:DataTypes.INTEGER,
        allowNull:false
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
        type:DataTypes.DATE,
        allowNull:false
    },
    endDate:{
        type:DataTypes.DATE,
        allowNull:false
    }
},{
    sequelize,
    timestamps:true,
    tableName:'modules'
})