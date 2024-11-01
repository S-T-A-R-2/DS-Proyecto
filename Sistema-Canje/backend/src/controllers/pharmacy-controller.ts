import Pharmacy from '../models/farmacy-model'

export const getAllPharmacies = async (req: any, res: any) => {
    try {
        const pharmacies = await Pharmacy.find({});
        console.log(pharmacies);
        res.json(pharmacies);
    } catch (error: any) {
        res.status(500).json({ message: "No se pudo obtener las farmacias", error: error.message});
    }
};