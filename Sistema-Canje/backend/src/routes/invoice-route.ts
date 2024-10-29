import { Router, Request, Response } from 'express';
//import {authRequired} from '../middlewares/validateToken.js';
import {createInvoice, getAllInvoice} from '../controllers/invoice-controller'
 
const router = Router();

router.post('/createInvoice', createInvoice);
router.get('/get-all-invoice', getAllInvoice);

export default router;
