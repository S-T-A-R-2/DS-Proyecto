import ExchangeRecordClass from './ExchangeRecord';
import Strategy from './StrategyInterface';
import ExchangeRecord from '../models/exchange-record-model';
import Invoice from '../models/invoice-model';


class DetailStrategy implements Strategy {
  public async execute() {
        const exchanges = await ExchangeRecord.find({});
        const result = new Array();
        for (let exchange of exchanges) {
            const object = new ExchangeRecordClass(
                exchange.number,
                exchange.username,
                exchange.medicine,
                exchange.date,
                exchange.pharmacy,
                exchange.invoicesUsed
            );
            result.push(object);
        }
        return result;
    }

}

export default DetailStrategy;
