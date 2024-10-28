import mongoose, {model, Document, Schema} from 'mongoose'

const invoiceSchema = new Schema({
    number: {
        type: Number,
        required: true,
        unique: true
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
    imageId: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    }
});

export default model('Invoice', invoiceSchema);