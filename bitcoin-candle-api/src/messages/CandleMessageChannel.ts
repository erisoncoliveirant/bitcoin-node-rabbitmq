import { Candle } from './../models/CandleModel'
import { Channel, connect } from "amqplib"
import { config } from "dotenv"
import * as http from 'http'
import { Server } from "socket.io"
import CandleController from "../controlllers/CandleController"

config()

export default class CandleMessageChannel {

  private _channel: Channel
  private _candelCtrl: CandleController
  private _io: Server

  constructor(server: http.Server) {
    this._candelCtrl = new CandleController()
    this._io = new Server(server, {
      cors: {
        origin: process.env.SOCKET_CLIENT_SERVER,
        methods: ['GET', 'POST']
      }
    })
    this._io.on('connection', () => console.log('Web socket connection created'))
  }

  private async _createMessageChannel() {
    try {
      const connection = await connect(process.env.AMQP_SERVER)
      this._channel = await connection.createChannel()
      this._channel.assertQueue(process.env.QUEUE_NAME)
    } catch (err) {
      console.log('Connection to RebbitMQ failed')
      console.log(err)
    }
  }

  async consumeMessages() {
    await this._createMessageChannel()
    if (this._channel) {
      this._channel.consume(process.env.QUEUE_NAME, async msg => {
        const candleObj = JSON.parse(msg.content.toString())
        console.log('Message received')
        this._channel.ack(msg)

        const candle: Candle = candleObj
        await this._candelCtrl.save(candle)
        this._io.emit(process.env.SOCKET_EVENT_NAME, candle)
      })
    }
  }
}
