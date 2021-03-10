export type Field = {
  name : string
  value : string
  inline?: boolean
} | string

export class MessageOut {
  constructor(
    public color: string,
    public title: string,
    public fields: Field[] = [],
  ){ }

  static simple(message: string){
    return new MessageOut('#000000', '', [message])
  }
}

export class ErrorMessageOut extends MessageOut {
  constructor(message: string) {
    super('#D74E2E', "Warning", [message])
  }
}