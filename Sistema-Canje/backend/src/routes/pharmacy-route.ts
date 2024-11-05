import {Router, Request, Response} from 'express';
import PharmacyController from '../controllers/pharmacy-controller';

const router = Router();
const pharmacyController = PharmacyController.getInstance();

router.get('/get-all-pharmacies', async (req, res) => {
    try {
        const pharmacies = await pharmacyController.getPharmacies();
        res.json(pharmacies);
    } catch (error: any) {
        res.status(500).json({ message: "No se pudo obtener las farmacias", error: error.message });
    }
});

// router.get('/get-all-pharmacies', getAllPharmacies);
export default router;