import ExchangeRecordClass from './ExchangeRecord';

interface Strategy {
  public execute(exchanges:ExchangeRecordClass[]);
}

export default Strategy;
