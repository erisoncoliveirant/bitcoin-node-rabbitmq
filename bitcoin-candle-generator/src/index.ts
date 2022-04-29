import { createMessageChannel } from './messages/messageChannel';
import { config } from 'dotenv'
import axios from 'axios'
import Period from './enums/Period'
import Candle from './models/Candle'

config()

const readMarketPrice = async (): Promise<number> => {
  const result = await axios.get(process.env.PRICES_API)
  const data = result.data
  const price = data.bitcoin.usd
  return price
}

const generateCandles = async () => {
  const messageChannel = await createMessageChannel()
  if (messageChannel) {
    while (true) {
      const loopTimes = Period.FIVE_MINUTES / Period.TEN_SECONDS
      const candle = new Candle('BTC', new Date())

      for (let i = 0; i < loopTimes; i++) {
        const price = await readMarketPrice()
        candle.addValue(price)
        await new Promise(r => setTimeout(r, Period.TEN_SECONDS))
      }

      candle.closeCandle()
      const candleObj = candle.toSimpleObject()
      const candleJson = JSON.stringify(candleObj)
      messageChannel.sendToQueue(process.env.QUEUE_NAME, Buffer.from(candleJson))
    }
  }
}

generateCandles()
