import mongoose, {model, Document, Schema} from 'mongoose'

const Sequence = new Schema({
    schema: {
        type: String,
        required: true,
        unique:true
    },
    number: {
      type: Number,
      required: true,
    }
});
export default model('Sequence', Sequence);