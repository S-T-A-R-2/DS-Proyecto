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

    setNumber(value: number): void {
      this.number = value;
    }

    setUsername(value: string): void {
      this.username = value;
    }

    setMedicine(value: string): void {
      this.medicine = value;
    }

    setDate(value: string): void {
      this.date = value;
    }

    setPharmacy(value: string): void {
      this.pharmacy = value;
    }

    setInvoicesUsed(value: number[]): void {
      this.invoicesused = value;
    }
}
