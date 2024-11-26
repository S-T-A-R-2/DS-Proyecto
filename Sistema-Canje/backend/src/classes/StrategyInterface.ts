import ExchangeRecordClass from './ExchangeRecord';

interface Strategy {
  execute(): Promise<any>;
}

export default Strategy;
