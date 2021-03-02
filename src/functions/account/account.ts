export default class Account{

cash:number;
username:string

  constructor(username : string, cash : number = 0){
    this.username = username;
    this.cash = cash ;
  }
  
  addCash(x: number){
    this.cash += x;
  }

  removeCash(x : number){
    this.cash -= x;
  }
}