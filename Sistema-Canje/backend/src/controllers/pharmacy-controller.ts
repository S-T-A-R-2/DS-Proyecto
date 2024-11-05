import Pharmacy from '../models/farmacy-model'
import { Request, Response } from 'express';
import { PharmacyClass } from '../classes/Pharmacy';

class PharmacyController {
    private static instance: PharmacyController;
    private pharmacies: Array<PharmacyClass> = new Array();

    public static getInstance(): PharmacyController {
        if (!PharmacyController.instance) {
            PharmacyController.instance = new PharmacyController();
        }
        return PharmacyController.instance;
    }

    public async getPharmacies() {
        if (this.pharmacies.length != 0) { return this.pharmacies; }
        try {
            const pharm = await Pharmacy.find({});
            for (let i in pharm) {
                const pharmObject = new PharmacyClass(pharm[i].name);
                this.pharmacies.push(pharmObject);
            }
            return this.pharmacies;
        } catch (error: any) {
            throw new Error("No se pudo obtener las farmacias. " + error.message);
        }
    }

} 
export default PharmacyController;


// export const getAllPharmacies = async (req: any, res: any) => {
//     try {
//         const pharmacies = await Pharmacy.find({});
//         console.log(pharmacies);
//         res.json(pharmacies);
//     } catch (error: any) {
//         res.status(500).json({ message: "No se pudo obtener las farmacias", error: error.message});
//     }
// };