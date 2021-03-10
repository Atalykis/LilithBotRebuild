import { PositiveInteger } from './positive-integer'

export class RouletteAmount extends PositiveInteger {
  private constructor(value: number){
    super(value)
    if(value < 2){
      throw new Error(`${this.constructor.name} must be at least 2`)
    }
  }
}