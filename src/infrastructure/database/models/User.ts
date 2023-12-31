import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../sequelize'
import { SequelizeInstitution } from './Institution'

interface UserRow {
    id: number,
    externalId: number,
    institutionId: number,
    userName: string,
    fullName: string,
    createdAt?: Date,
    updatedAt?: Date
}

export class SequelizeUser extends Model<UserRow,Omit<UserRow,'id'>>{
    declare id: number
    declare externalId: number
    declare institutionId: number
    declare userName: string;
    declare fullName: string;
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
}

SequelizeUser.init({
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
        allowNull:false,
        references:{
            model: SequelizeInstitution,
            key: 'id'
        }
    },
    userName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    fullName:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    sequelize,
    timestamps:true,
    freezeTableName: true,
    tableName: 'users'
})