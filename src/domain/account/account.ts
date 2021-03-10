export class Account {
  constructor(public id: string, public cash: number = 0) {}

  addCash(x: number) {
    this.cash += x;
  }

  removeCash(x: number) {
    this.cash -= x;
  }

  getCash(){
    return this.cash
  }
}
