export default class Candle {
  low: number = 0
  high: number = 0
  open: number = 0
  close: number = 0
  color: string = ''
  finalDateTime: Date = new Date()
  currency: string = ''

  constructor(candleObj: any) {
    Object.assign(this, candleObj)
    this.finalDateTime = new Date(this.finalDateTime)
  }
}
