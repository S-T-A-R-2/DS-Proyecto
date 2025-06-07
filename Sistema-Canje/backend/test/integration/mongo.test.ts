import mongoose,{ConnectOptions} from 'mongoose';

const TestSchema = new mongoose.Schema({
	name:String,
});
const TestModel = mongoose.model('Test', TestSchema);

describe('Integracion de Mongo probado con un modelo de prueba', () => {
	beforeAll(async () => {
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
	});
	afterAll(async () => {
		await mongoose.disconnect();
	});
	it('Creacion, busqueda y borrado de un documento', async () => {
		// CREACION	
		const testDoc = new TestModel({name: "Prueba Epica"});
		const savedDoc = await testDoc.save();
		//validacion
		expect(savedDoc._id).toBeDefined();
		expect(savedDoc.name).toBe("Prueba Epica");

		//BUSQUEDA
		const foundDoc = await TestModel.findOne({name: "Prueba Epica"});
		//valdiacion
		expect(foundDoc).not.toBeNull();
		expect(foundDoc?.name).toBe("Prueba Epica");

		//BORRADO
		await TestModel.deleteMany({name: "Prueba Epica"});

		//validacion
		const deletedDoc = await TestModel.find({name: "Prueba Epica"});
		expect(deletedDoc.length).toBe(0);
	}, 20000);
}); 

