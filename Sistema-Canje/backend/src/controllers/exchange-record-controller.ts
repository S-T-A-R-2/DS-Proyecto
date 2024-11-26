import ExchangeRecord from '../models/exchange-record-model.ts';
import {ExchangeRecordClass} from '../classes/ExchangeRecord.ts'

class ExchangeRecordController {

  private static instance: ExchangeRecordController;
  private exchanges: Array<ExchangeRecordClass> = new Array();
  
  public static getInstance():ExchangeRecordController {
    if (!ExchangeRecordController.instance){
      ExchangeRecordController.instance = new ExchangeRecordController();
    }
    return ExchangeRecordController.instance;
  }

  public createExchangeRecord(r) {};

  public getAllExchanges(){
    if (this.exchanges.length == 0){
        const exchanges = await ExchangeRecord.find({});
        for (let i in exchanges) {
          add = true;
          for (let i in this.exchanges) {
            if (this.exchanges[i].getId() === exchanges[i]._id.toString()) {
              add = false;
            }
          }
          if (add) {
            const object = new ExchangeRecordClass(exchanges[i].number,
                                                    exchanges[i].username,
                                                    exchanges[i].medicine,
                                                    exchanges[i].date,
                                                    exchanges[i].pharmacy,
                                                    exchanges[i].invoicesUsed);
            this.exchanges.push(object);
          }
 
    }
    return this.exchanges;

  }
}

export default ExchangeRecordController;
