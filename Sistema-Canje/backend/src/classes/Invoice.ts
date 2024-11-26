import Visitor from './Visitor/interface-visitor'
import Element from './Visitor/interface-element'
import Invoice from '../models/invoice-model';
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
        Invoice.findOneAndUpdate({
            number: this.number,
            state: state
        });
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
        Invoice.findOneAndUpdate({
            number: this.number,
            exchangeNumber: ex
        });
        this.exchangeNumber = ex;
    }
    getExchangeNumber(){
        return this.exchangeNumber;
    }
    accept(v: Visitor): void {
        v.visitInvoice(this);
    }
}
