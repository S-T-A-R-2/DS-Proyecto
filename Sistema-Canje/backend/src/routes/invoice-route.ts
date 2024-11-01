import { Router, Request, Response } from 'express';
//import {authRequired} from '../middlewares/validateToken.js';
import {createInvoice, getAllInvoice, filterInvoices, setInvoiceState} from '../controllers/invoice-controller'
 
const router = Router();

router.post('/createInvoice', createInvoice);
router.get('/get-all-invoice', getAllInvoice);
router.get('/filter-invoices', filterInvoices);
router.post('/set-invoice-state', setInvoiceState);
export default router;
