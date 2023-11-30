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
    ['teaching-action.bun-collector.user_created', async (payload:any) => Processor.createUser(payload)],
    ['teaching-action.bun-collector.user_updated', async(payload:any) => Processor.updateUser(payload)],
    ['teaching-action.bun-collector.user_deleted',async(payload:any) => Processor.deleteUser(payload)],

    ['teaching-action.bun-collector.course_created',async(payload:any) => Processor.createCourse(payload)],
    ['teaching-action.bun-collector.course_updated',async(payload:any) => Processor.updateCourse(payload)],
    ['teaching-action.bun-collector.course_deleted',async(payload:any) => Processor.deleteCourse(payload)],
    
    ['teaching-action.bun-collector.enrolment_created',async(payload:any) => Processor.createEnrolment(payload)],
    ['teaching-action.bun-collector.enrolment_updated',async(payload:any) => Processor.updateEnrolment(payload)],
    ['teaching-action.bun-collector.enrolment_deleted',async(payload:any) => Processor.deleteEnrolment(payload)],

    ['teaching-action.bun-collector.course_module_created',async(payload:any) => Processor.createModule(payload)],
    ['teaching-action.bun-collector.course_module_updated',async(payload:any) => Processor.updateModule(payload)],
    ['teaching-action.bun-collector.course_module_deleted',async(payload:any) => Processor.deleteModule(payload)],

    ['teaching-action.bun-collector.role_assigned',async(payload:any) => Processor.roleAssigned(payload)],

    ['teaching-action.bun-collector.role_unassigned',async(payload:any) => Processor.roleUnassigned(payload)],
])