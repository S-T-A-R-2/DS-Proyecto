import mongoose, {model, Document, Schema} from 'mongoose'

const pointsSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    medicineId: {
        type: String,
        required: true
    }, 
    medicineDescription: {
        type: String,
        required: true
    },
    totalPoints: {
        type: Number,
        required: true
    },
    usedPoints: {
        type: Number,
        required: true,
        default: 0
    },
    availablePoints: {
        type: Number,
        required: true
    }
});
export default model('Point', pointsSchema);



