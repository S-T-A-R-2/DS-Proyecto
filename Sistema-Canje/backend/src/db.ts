import mongoose, { ConnectOptions } from 'mongoose';

export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect("mongodb+srv://josserrano:Qs0uOIzrv4opdEO1@clusterdiseno.ciz75.mongodb.net/?retryWrites=true&w=majority&appName=ClusterDiseno", {
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