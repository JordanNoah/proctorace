import {Connection,Channel, connect, ConsumeMessage} from "amqplib"
import {config,assertQueue,eventList} from './config'
import { CustomError } from "../../domain"
import { EventDto } from "../../domain/dtos/events/event.dto";

export class RabbitMq{

    private static _connection: Connection;
    private static _channel: Channel;

    public static async connection() {
        let sconnection = await connect(config)
        this._connection = sconnection;
        this._channel = await this._connection.createConfirmChannel();
    }

    public static async setQueue(){
        await this._channel.assertQueue(
            'teaching-action.bun-collector',
            assertQueue
        )
        await this._channel.assertExchange(
            "sagittarius-a",
            "fanout",
            {
                durable:true
            }
        )
        await this._channel.bindQueue(
            'teaching-action.bun-collector',
            'sagittarius-a',
            'sagittarius-a'
        )
    }

    public static async consume() {
        await this._channel.consume(
            'teaching-action.bun-collector',
            (msg)=>{
                const [error,eventDto] = EventDto.create(msg!)               
                this.messageProcessor(eventDto!)
            }
        )
    }

    public static async messageProcessor(msg: EventDto) {
        var [message,error] = this.middleware(msg)
        if (!error) {
            const eventProcessor = eventList.get(msg.properties.type)
            if (eventProcessor) {
                await eventProcessor(JSON.parse(msg.content))
            }else{
                console.error(`Event not found: ${msg.properties.type}`);
            }
        }else{
            console.log(message);
        }
        this._channel.ack(msg)
    }

    private static middleware(msg: EventDto): [string?, boolean?] {
        if (!this.checkAppId(msg.properties.appId)) return ['Incorrect app id',true]
        return [undefined,false]
    }

    private static checkAppId(appId:string): boolean{
        return appId == 'teaching-action.bun-collector' ?? false
    }
}