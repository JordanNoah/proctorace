import { Options } from "sequelize";

export const config: Options = {
    host:'localhost',
    username:'root',
    password:'1234',
    logging: (...msg) => console.log(msg),
    port:3306,
    database:'proctorace',//database name
    dialect:'mysql'
}