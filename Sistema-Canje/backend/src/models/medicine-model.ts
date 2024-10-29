import mongoose, {model, Document, Schema} from 'mongoose'

enum Presentation {
    UNGUENTO = 'Unguento',
    PILDORAS = 'Pildoras',
    JARABE = 'Jarabe',
    PASTILLAS = 'Pastillas'
}

const medicineSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true
    },
    isRedeemable: {
        type: Boolean,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    presentation: {
        type: Presentation,
        enum: Object.values(Presentation),
        required: true
    },
    pointsRequired: {
        type: Number,
        required: true,
        default: 0
    },
    pointsAwarded: {
        type: Number,
        required: true,
        default: 0
    },

});

export default model('Medicament', medicineSchema);