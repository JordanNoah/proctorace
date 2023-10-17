import {ServerProperties, Options} from "amqplib";
import { Processor } from "./processor";

export const config:Options.Connect = {
    username:'team-accion-docente-beta',
    password:'sj&53#hjsGH@',
    protocol:'amqp',
    hostname:'35.222.192.45',
    port:5672,
    vhost:'beta'
}

export const assertQueue: Options.AssertQueue = {
    exclusive:false
}


export const eventList: Map<string, (payload:any) => Promise<void>> = new Map([
    ['teaching-action.bun-collector.user_created', async (payload:any) => Processor.user(payload)]
])