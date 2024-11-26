import Visitor from './Visitor/interface-visitor'
import Element from './Visitor/interface-element'
export default class InvoiceClass implements  Element{
    constructor(private number: number, 
                private date: string, 
                private pharmacyId: string,
                private medicineId: string,
                private quantity: number,
                private state: string,
                private user: string,
                private _id: string,
                private exchangeNumber: Number = -1) {
        this.number = number;
        this.date = date;
        this.pharmacyId = pharmacyId;
        this.medicineId = medicineId;
        this.quantity = quantity;
        this.state = state;
        this.user = user;
        this._id = _id;
    }

    setState(state: string) {
        this.state = state;
    }

    getUser() {
        return this.user;
    }

    getNumber() {
        return this.number;
    }

    getDate() {
        return this.date;
    }

    getPharmacyId() {
        return this.pharmacyId;
    }

    getMedicineId() {
      return this.medicineId;
    } 

    getQuantity() {
        return this.quantity;
    }

    getState() {
        return this.state;
    }

    getId() {
        return this._id;
    }
    setExchangeNumber(ex: Number){
        this.exchangeNumber = ex;
    }
    getExchangeNumber(){
        return this.exchangeNumber;
    }
    async accept(v: Visitor): Promise<void> {
        await v.visitInvoice(this);
    }
}
