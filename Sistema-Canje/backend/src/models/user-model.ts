import mongoose, {Document, Schema} from 'mongoose'

type UserModel = {
    username : string;
    name: string;
    email: string;
    password: string;
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
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

export default mongoose.model<UserModel>('User', userSchema);