import mongoose, {model, Document, Schema} from 'mongoose'

const medicineSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    redeeming_points: {
        type: Number,
        required: true
    },
    points_given: {
        type: Number,
        required: true
    }
});
export default model('Medicine', medicineSchema);