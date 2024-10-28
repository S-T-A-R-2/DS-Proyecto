export class Invoice {
    constructor(private number: number, 
                private date: string, 
                private pharmacyId: string,
                private medicineId: string,
                private quantity: number,
                private imageId: string,
                private state: string) {
        this.number = number;
        this.date = date;
        this.pharmacyId = pharmacyId;
        this.medicineId = medicineId;
        this.quantity = quantity;
        this.imageId = imageId;
        this.state = state;
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

    getImageId() {
        return this.imageId;
    }

    getState() {
        return this.state;
    }

}
