import {Router, Request, Response} from 'express';
import { getAllPharmacies } from '../controllers/pharmacy-controller';

const router = Router();

router.get('/get-all-pharmacies', getAllPharmacies);
export default router;