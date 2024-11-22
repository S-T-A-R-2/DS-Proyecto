export class InvoiceClass {
    constructor(private number: number, 
                private date: string, 
                private pharmacyId: string,
                private medicineId: string,
                private quantity: number,
                private state: string,
                private user: string,
                private id: string) {
        this.number = number;
        this.date = date;
        this.pharmacyId = pharmacyId;
        this.medicineId = medicineId;
        this.quantity = quantity;
        this.state = state;
        this.user = user;
        this.id = id;
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

    getQuantity() {
        return this.quantity;
    }

    getState() {
        return this.state;
    }

    getId() {
        return this.id;
    }
}
