import Pharmacy from '../models/farmacy-model'
import { Request, Response } from 'express';
import { PharmacyClass } from '../classes/Pharmacy';
import Points from '../models/points-model';

import MedicineController from './medicine-controller';
import UserController from './auth-controller';
import InvoiceController from './invoice-controller';

class PointsController {
    private static instance: PointsController;
    private points: Array<PharmacyClass> = new Array();

    public static getInstance(): PointsController {
        if (!PointsController.instance) {
            PointsController.instance = new PointsController();
        }
        return PointsController.instance;
    }

    public async updatePoints(username: String, medicine: String, quantity: number) {
        /*---------------------------------------------------------------------
      ----------------CONTROLADOR DE PUNTOS?????----------------------------
      ---------------------------------------------------------------------*/
        try {

            const points = await Points.find({username: username, medicineId: medicine});
            const medicineController = MedicineController.getInstance();
            const medicineObject = await medicineController.getMedicine((medicine as string));

            if (!medicineObject) {
                throw new Error("No se pudo obtener el medicamento");
            }

            if (quantity < 0) {
                await Points.findOneAndUpdate(
                    { // Criterios de búsqueda
                        username: points[0].username,
                        medicineId: points[0].medicineId,
                    },
                    { // Campos a actualizar
                        $inc: {
                            availablePoints: -medicineObject.redeeming_points, // Resta puntos disponibles
                            usedPoints: medicineObject.redeeming_points        // Suma puntos usados
                        }
                    }
                );
            } else {

            if (points.length == 0) {//Si el usuario no ha acumulado puntos en un medicamento especifico
                const medicineId = medicineObject?.name;
                const medicineDescription = medicineObject?.description;
                const totalPoints = medicineObject?.points_given * quantity;
                const availablePoints = totalPoints;
                const newPoints = new Points({
                username,
                medicineId,
                medicineDescription,
                totalPoints,
                availablePoints
                });
                await newPoints.save();
            } else {
                const totalPoints = points[0].totalPoints;
                const availablePoints = points[0].availablePoints;
                if (medicineObject?.points_given) {
                    const accumulatedTotalPoints = totalPoints + (medicineObject?.points_given * quantity);
                    const accumulatedAvailablePoints = availablePoints + (medicineObject?.points_given * quantity);
                    await Points.findOneAndUpdate(
                        { // Criterios de búsqueda
                            username: points[0].username,
                            medicineId: points[0].medicineId,
                        },
                        { // Campos a actualizar
                            totalPoints: accumulatedTotalPoints,
                            availablePoints: accumulatedAvailablePoints
                        },
                        { new: true } // Opcional: Devuelve el documento actualizado
                    );                    
                } else {
                    throw new Error("No se pudo actualizar los puntos");
                }
            }
            }
        } catch (error:any) {
            throw new Error("No se pudo actualizar la factura o los puntos. " + error.message);
        }
    }

    public async getBenefitInfo(username: String) {
        const userController = UserController.getInstance();
        const invoiceController = InvoiceController.getInstance();
        const points = new Array;
        let point;

        //Medicamentos de facturas aprobadas no canjeadas por usuario
        const medicines = await invoiceController.getApprovedMedicines(username);

        //Datos basicos del usuario
        const user = await userController.getUserInfo(username);

        //Informacion de puntos por cada medicamento
        for (let i = 0; i < medicines.length; i++) {
            point = (await Points.findOne({username: username, medicineId:medicines[i]}));
            points.push(point);
        }

        points.sort(compare)
        
        return {user: user, points: points};
  }
function compare(a: any, b: any) {
    if (a.availablePoints < b.availablePoints) {
        return -1;
    }
    if (a.availablePoints > b.availablePoints) {
        return 1;
    }
    return 0;
  }

}
export default PointsController;


// export const getAllPharmacies = async (req: any, res: any) => {
//     try {
//         const pharmacies = await Pharmacy.find({});
//         console.log(pharmacies);
//         res.json(pharmacies);
//     } catch (error: any) {
//         res.status(500).json({ message: "No se pudo obtener las farmacias", error: error.message});
//     }
// };
