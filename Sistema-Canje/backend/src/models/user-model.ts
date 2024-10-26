import mongoose, {Document, Schema} from 'mongoose'

type UserModel = {
    username : string;
    name: string;
    phone: string;
    email: string;
    password: string;
    rol: string;
}

const userSchema : Schema = new Schema<UserModel>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true
    }
});

export default mongoose.model<UserModel>('User', userSchema);