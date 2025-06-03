import mongoose from 'mongoose';
import Medicine from '../../../backend/src/models/medicine-model';
import { updateGivenPoints, updateRedeemPoints } from '../../src/api/auth';

const testMedicine = {
  name: "Medicina TEST",
  description: "Este documento de medicina esta hecho los para propositos de pruebas",
  points_given: 0,
  redeeming_points: 0,
};


describe('Pruebas de Prevención de Fallos - updateGivenPoints y updateRedeemPoints', () => {
	beforeEach(async () => {
	//Reseteamos los valores
	await updateGivenPoints({...testMedicine, points_given: 0});
	await updateRedeemPoints({...testMedicine, redeeming_points: 0});
	});

  	it('Acepta enteros positivos al actualizar puntos otorgados', async () => {
  		const res = await updateGivenPoints({...testMedicine, points_given: 10});
		expect(res.data.points_given).toBe(10);
	}, 20000);

  	it('Rechaza decimales al actualizar puntos otorgados', async () => {
  		const res = await updateGivenPoints({...testMedicine, points_given: -10});
		expect(res.data.points_given).not.toBe(-10);
  	}, 20000);

  	it('Rechaza negativos al actualizar puntos otorgados', async () => {
  		const res = await updateGivenPoints({...testMedicine, points_given: 3.14});
		expect(res.data.points_given).not.toBe(3.14);
  	}, 20000);
  	
	it('Acepta enteros positivos al actualizar puntos para canjear', async () => {
  		const res = await updateRedeemPoints({...testMedicine,  redeeming_points: 10});
		expect(res.data.redeeming_points).toBe(10);
	}, 20000);

  	it('Rechaza decimales al actualizar puntos para canjear', async () => {
  		const res = await updateRedeemPoints({...testMedicine,  redeeming_points: -10});
		expect(res.data.redeeming_points).not.toBe(-10);
  	}, 20000);

  	it('Rechaza negativos al actualiszar puntos para canjear', async () => {
  		const res = await updateRedeemPoints({...testMedicine,  redeeming_points: 3.14});
		expect(res.data.redeeming_points).not.toBe(3.14);
  	}, 20000);
});

