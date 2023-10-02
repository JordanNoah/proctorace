import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../sequelize'

interface InstitutionRow {
    id: number;
    uuid: string;
    name: string;
    fullname: string;
    abbreviation: string; 
    domain: string;
    token: string;
    website: string;
    rest_path: string;
    modality: string;
    translations: Object;
    createdAt?: Date;
    updatedAt?: Date;
}

export class SequelizeInstitution extends Model<InstitutionRow,Omit<InstitutionRow,'id'>>{
    declare id: number;
    declare uuid: string;
    declare name: string;
    declare fullname: string;
    declare abbreviation: string;
    declare domain: string;
    declare token: string;
    declare website: string;
    declare rest_path: string;
    declare modality: string;
    declare translations: Object;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

SequelizeInstitution.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    uuid:{
        type:DataTypes.STRING,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    fullname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    abbreviation:{
        type:DataTypes.STRING,
        allowNull:false
    },
    domain:{
        type:DataTypes.STRING,
        allowNull:false
    },
    token:{
        type:DataTypes.STRING,
        allowNull:false
    },
    website:{
        type:DataTypes.STRING,
        allowNull:false
    },
    rest_path:{
        type:DataTypes.STRING,
        allowNull:false
    },
    modality:{
        type:DataTypes.STRING,
        allowNull:false
    },
    translations:{
        type:DataTypes.JSON,
        allowNull:false
    }
},{
    sequelize,
    timestamps:true,
    tableName:'institutions'
})