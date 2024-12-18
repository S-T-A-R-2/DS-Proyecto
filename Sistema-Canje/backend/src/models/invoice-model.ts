import {model, Schema} from 'mongoose'

const invoiceSchema = new Schema({
    number: {
        type: Number,
        unique: true,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    pharmacyId: {
        type: String,
        required: true
    },
    medicineId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    user: {
      type: String,
      required: true
    },
    exchangeNumber: {
        type: Number,
        required: false
    }
});

export default model('Invoice', invoiceSchema);
