export class ExchangeRecordClass {
    constructor(
        public number: number,
        public username: string,
        public medicine: string,
        public date: string,
        public pharmacy: string | undefined,
        public invoicesUsed: number[]
    ) {
        this.number = number;
        this.username = username;
        this.medicine = medicine;
        this.date = date;
        this.pharmacy = pharmacy;
        this.invoicesUsed = invoicesUsed;
    }

    public getNumber() {
      return this.number;
    }
    public getUsername() {
      return this.username;
    }

    public getInvoicesUsed() {
      return this.invoicesUsed;
    }
   
}

export default ExchangeRecordClass;
