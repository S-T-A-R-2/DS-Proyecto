import ExchangeRecordClass from './ExchangeRecord';
import Strategy from './StrategyInterface';

class CronologicalStrategy implements Strategy {
  public execute(exchanges:ExchangeRecordClass[]) {
    return exchanges.sort((a, b) => a.date.localeCompare(b.date));
  }
}

export default CronologicalStrategy;
