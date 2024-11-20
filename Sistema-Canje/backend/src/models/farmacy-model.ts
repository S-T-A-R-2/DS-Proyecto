import mongoose, {model, Document, Schema} from 'mongoose'

const farmacySchema = new Schema({
    name: {
        type: String,
        required: true
    }
});
export default model('Farmacy', farmacySchema);



    