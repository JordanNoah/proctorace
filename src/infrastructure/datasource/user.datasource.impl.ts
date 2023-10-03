import { CustomError, UserDatasource, UserEntity, RegisterUserDto } from '../../domain'
import { SequelizeUser } from "../database/models/User"

export class UserDatasourceImpl implements UserDatasource {
    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        try {
            const {id,auth,confirmed,policyagreed,deleted,suspended,mnethostid,username,password,idnumber,firstname,lastname,email,emailstop,phone1,phone2,institution,department,address,city,country,lang,calendartype,theme,timezone,firstaccess,lastaccess,lastlogin,currentlogin,lastip,secret,picture,description,descriptionformat,mailformat,maildigest,maildisplay,autosubscribe,trackforums,timecreated,timemodified,trustbitmask,imagealt,lastnamephonetic,firstnamephonetic,middlename,alternatename,moodlenetprofile} = registerUserDto

            var [user,created] = await SequelizeUser.findOrCreate({
                where:{
                    externalId:id,
                    institutionId:institution
                },
                defaults:{
                    externalId:id,
                    institutionId:3,
                    userName:username,
                    fullName:`${firstname} ${lastname}`
                }
            })
            return new UserEntity(
                user.id,
                user.externalId,
                user.institutionId,
                user.userName,
                user.fullName,
                user.createdAt,
                user.updatedAt
            );
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
}