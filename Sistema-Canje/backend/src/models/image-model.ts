import mongoose, {model, Document, Schema} from 'mongoose'

const imageSchema = new Schema({
    //The id is the mongo id from the invoice (the invoice should be created first)
    idInvoice: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    }
});
export default model('Image', imageSchema);