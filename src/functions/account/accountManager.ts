interface AccountMemory {
username :string
cash : number
addCash : (x :number) => void
removeCash : (x : number) => void
}

interface AccountManagerMemory{
  accounts : AccountMemory[]
  addAccount : (account : AccountMemory) => void
  findAccount : (username :string) => AccountMemory
  createAccount : () => boolean
}


export default class AccountManager{

  accounts : AccountMemory[]

  constructor(){
    this.accounts = [];
  }

  addAccount(account : AccountMemory){
    this.accounts.push(account);
  }

  findAccount(username : string){
    return this.accounts.find(element => element.username === username)
  }

  createAccount(account : AccountMemory){
    if(this.findAccount(account.username)){
      return false;
    }else{
      this.addAccount(account);
      return true;
    }
  }
}