import { Router, Request, Response } from 'express';
//import {authRequired} from '../middlewares/validateToken.js';
import InvoiceController from '../controllers/invoice-controller'; 

const invoiceController = InvoiceController.getInstance();
const router = Router();

router.post('/createInvoice', async (req, res) => {
    try {
        await invoiceController.createInvoice(req.body.username, req.body.number,
            req.body.date, req.body.pharmacy, req.body.medicine,
            req.body.quantity, req.body.image, req.body.state
        );
        res.status(201).json({message: "Creacion de factura exitosa"});
    } catch (error: any){
        res.status(409).json({message: "El objeto ya existe"});
    }
});
router.get('/get-all-invoice', async (req, res) => {
    try {
        const invoices = await invoiceController.getAllInvoice();
        res.status(201).json(invoices);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/filter-invoices', async (req, res) => {
    try {
        const invoices = await invoiceController.filterInvoices(req.query.stateFilter, 
            req.query. dateRangeFilter, req.query.searchInvoiceNumber, req.query.userFilter);
        res.status(201).json(invoices);
    } catch (error: any) {
        res.status(500).json({message: error.message });
    }
});

router.get('/getImage', async (req, res) => {
    if (typeof req.query.number == 'string'){
        try {
            const image = await invoiceController.getImage(req.query.number)
            res.status(201).json(image);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
});
router.post('/set-invoice-state', async (req, res) => {
    try {
        await invoiceController.setInvoiceState(req.body.number, req.body.state);
        res.status(201).json({message: "Se actualizó correctamente."});
    } catch (error: any) {
        res.status(500).json({message: error.message });
    }
});
export default router;
