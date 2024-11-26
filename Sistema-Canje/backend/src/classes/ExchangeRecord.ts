export class ExchangeRecordClass {
    constructor(
        public number: number,
        public username: string,
        public medicine: string,
        public date: string,
        public pharmacy: string,
        public invoicesUsed: number[]
    ) {
        this.number = number;
        this.username = username;
        this.medicine = medicine;
        this.date = date;
        this.pharmacy = pharmacy;
        this.invoicesUsed = invoicesUsed;
    }

    getNumber() {
      return this.number;
    }

    getusername() {
      return this.username;
    }

}

export default ExchangeRecordClass;