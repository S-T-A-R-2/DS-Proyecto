import ExchangeRecordClass from './ExchangeRecord';

interface Strategy {
  execute(medicineId?: string, username?: string): Promise<any>;

}

export default Strategy;
