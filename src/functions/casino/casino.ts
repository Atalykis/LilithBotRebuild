interface AccountMemory {
  username :string
  cash : number
  addCash : (x :number) => void
  removeCash : (x : number) => void
}

interface CasinoMemory{
  doubleOrNothing : (user : AccountMemory, value :  number) => boolean
}

export default class Casino{
  
constructor(){
}

doubleOrNothing(user : AccountMemory, value: number){
  if(Math.floor(Math.random() * 100) > 50){
    user.addCash(value);
    return true;
  } user.removeCash(value);
   return false;
}

}