import mongoose, { ConnectOptions } from 'mongoose';

export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect("mongodb+srv://geraldcalderon016:we2Q29uMCJlHo5DI@cluster0.3jasz.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0", {
            serverSelectionTimeoutMS: 30000, // Tiempo de espera para la selección del servidor
            socketTimeoutMS: 45000,
        } as ConnectOptions); // Forzar las opciones como `ConnectOptions`
        
        console.log("Conectado");
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("Error de conexión a la base de datos:", error.message);
        } else {
            console.log("Error desconocido:", error);
        }
    }
};