import { Router, Request, Response } from 'express';
//import {authRequired} from '../middlewares/validateToken.js';
import {getMedicines, filterMedicines, updateRedeemPoints, updateGivenPoints} from '../controllers/medicine-controller'
 
const router = Router();

router.get('/getmedicines', getMedicines);
router.get('/filter-medicines', filterMedicines);
router.put('/updateRedeem', updateRedeemPoints);
router.put('/updateGiven', updateGivenPoints);  

export default router;