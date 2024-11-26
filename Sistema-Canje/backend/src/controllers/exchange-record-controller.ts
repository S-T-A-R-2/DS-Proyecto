import {ExchangeRecordClass} from '../classes/ExchangeRecord';
import DetailStrategy from '../classes/DetailStrategy';

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
      let detail = new DetailStrategy();
      const a = await detail.execute()
      this.exchanges = a.sort((a, b) => a.date.localeCompare(b.date));

    }
    return this.exchanges;
  }

  public getExchangesByUser(username:string){
      let result = this.exchanges.filter((ex) => ex.username === username);

      return result.sort((a, b) => a.date.localeCompare(b.date));
      
  }
}

export default ExchangeRecordController;
