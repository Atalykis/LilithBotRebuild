export class PositiveInteger {
  protected constructor(private value: number){
    if(Number.isNaN(value)){
      throw new Error(`${this.constructor.name} must be a number`)
    }
    
    if(!Number.isInteger(value)){
      throw new Error(`${this.constructor.name} must be a round number`)
    }

    if(value <= 0){
      throw new Error(`${this.constructor.name} must be positive`)
    }
  }

  getNumber(){
    return this.value
  }

  static fromString(value: string){
    return new this(Number(value))
  }

  static fromNumber(value: number){
    return new this(value)
  }
}
