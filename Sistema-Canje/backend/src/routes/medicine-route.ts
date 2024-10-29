import { Router, Request, Response } from 'express';
//import {authRequired} from '../middlewares/validateToken.js';
import {getMedicines, filterMedicines, updatePoints} from '../controllers/medicine-controller'
 
const router = Router();

router.get('/getmedicines', getMedicines);
router.get('/filtermedicines', filterMedicines);
router.put('/updatepoints', updatePoints);

export default router;