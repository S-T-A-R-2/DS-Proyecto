//MongoDB
import mongoose from 'mongoose';
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            serverSelectionTimeoutMS: 30000, // Tiempo de espera para la selección del servidor
            socketTimeoutMS: 45000
        });
        console.log("Conectado")
    } catch (error) {
        console.log(error);
    }
};