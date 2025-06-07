import axios from '../../src/api/axios';

describe("Protocolo de intercambio de datos: Axios/HTTP", () => {
	it("Llamada a getmedicines, se espera una respuesta exitosa", async () => {
		const response = await axios.get("/getmedicines"); //Llamada al back
		expect(response.status).toBe(200); //Verifica que la respuesta sea correcta
	});
});
