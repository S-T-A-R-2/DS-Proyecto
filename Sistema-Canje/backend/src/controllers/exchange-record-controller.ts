import ExchangeRecord from '../models/exchange-record-model';
import {ExchangeRecordClass} from '../classes/ExchangeRecord'
import CronologicalStrategy from '../classes/CronologicalStrategy'

class ExchangeRecordController {

  private static instance: ExchangeRecordController;
  private exchanges: Array<ExchangeRecordClass> = new Array();
  
  public static getInstance():ExchangeRecordController {
    if (!ExchangeRecordController.instance){
      ExchangeRecordController.instance = new ExchangeRecordController();
    }
    return ExchangeRecordController.instance;
  }

  public async getAllExchanges(){
    if (this.exchanges.length == 0){
        const exchanges = await ExchangeRecord.find({});
        for (let exchange of exchanges) {
            const object = new ExchangeRecordClass(
                exchange.number,
                exchange.username,
                exchange.medicine,
                exchange.date,
                exchange.pharmacy,
                exchange.invoicesUsed
            );
            this.exchanges.push(object);
        }
    }
    return this.exchanges;
  }

  public getExchangesByUser(username:string){
      let crono = new CronologicalStrategy();  
      let ordered =  crono.execute(this.exchanges);
      let result = ordered.filter((ex) => ex.username === username);

      return result;
      
  }
}

export default ExchangeRecordController;
