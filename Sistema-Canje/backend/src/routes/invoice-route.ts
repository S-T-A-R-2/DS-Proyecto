import { Router, Request, Response } from 'express';
//import {authRequired} from '../middlewares/validateToken.js';
import {createInvoice} from '../controllers/invoice-controller'
 
const router = Router();

router.post('/createInvoice', createInvoice);
export default router;