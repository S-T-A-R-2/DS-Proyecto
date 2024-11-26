import mongoose, {model, Document, Schema} from 'mongoose'

const ExchangeRecord = new Schema({
    number: {
      type: Number,
      required: true,
      unique:true
    },  
    username: {
        type: String,
        required: true
    },
    medicine: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    pharmacy: {
      type:String,
      required:true
    },
    invoicesUsed: {
      type: [Number],
      required:true
    }
 
});
export default model('ExchangeRecord', ExchangeRecord);



