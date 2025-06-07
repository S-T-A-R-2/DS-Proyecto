import Element from '../../../src/classes/Visitor/interface-element'
import Visitor from '../../../src/classes//Visitor/interface-visitor'
export default class InvoiceClassMock implements  Element{
    constructor(private number: number, 
                private date: string, 
                private pharmacyId: string,
                private medicineId: string,
                private quantity: number,
                private state: string | undefined,
                private user: string,
                private _id: string,
                private exchangeNumber: number | null | undefined,) {
        this.number = number;
        this.date = date;
        this.pharmacyId = pharmacyId;
        this.medicineId = medicineId;
        this.quantity = quantity;
        this.state = state;
        this.user = user;
        this._id = _id;
        this.exchangeNumber = -1;
    }

    getUser() {
        throw new Error("Method not implemented.");
    }

    getNumber() {
        throw new Error("Method not implemented.");
    }

    getDate() {
        throw new Error("Method not implemented.");
    }

    getPharmacyId() {
        throw new Error("Method not implemented.");
    }

    getMedicineId() {
        throw new Error("Method not implemented.");
    } 

    getQuantity() {
        throw new Error("Method not implemented.");
    }

    getState() {
        throw new Error("Method not implemented.");
    }

    getId() {
        throw new Error("Method not implemented.");
    }
    
    async setState(state: string) {
        throw new Error("Method not implemented.");
    }
    
    async setExchangeNumber(ex: Number) {
        throw new Error("Method not implemented.");
    }    

    getExchangeNumber(){
        throw new Error("Method not implemented.");
    }
    async accept(v: Visitor): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

