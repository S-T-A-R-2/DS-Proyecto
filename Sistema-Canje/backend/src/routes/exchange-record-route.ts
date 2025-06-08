import { Router, Request, Response } from 'express';
import ExchangeRecordController from '../controllers/exchange-record-controller';

const exchangeController = ExchangeRecordController.getInstance();
const router = Router();

router.post('/create-exchange-register', async (req, res) => {
  try {
      const exchanges = await exchangeController.createExchangeRecord(req.body.client, req.body.medicineId, req.body.pharmacy, req.body.invoicesUsed);
      res.status(201).json(exchanges);
  } catch (error: any) {
      res.status(500).json({ message: error.message });
  }
});

router.get('/get-all-exchanges', async (req, res) => {
    try {
        const exchanges = await exchangeController.getAllExchanges();
        res.status(201).json(exchanges);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/get-exchanges-user', async (req, res) => {
      try {
        const exchanges = await exchangeController.getExchangesByUser(req.query.user as string);
        res.status(201).json(exchanges);
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
});
router.get('/get-statistics-test', async(req,res) =>{
  try {
      const stats = await exchangeController.getCurrentStatisticsTest(req.body.count);
      res.status(201).json(stats);
  } catch (err:any) {
        res.status(500).json({ message: err.message });
  }
});
router.get('/get-statistics', async(req,res) =>{
  try {
      const stats = await exchangeController.getCurrentStatistics();
      res.status(201).json(stats);
  } catch (err:any) {
        res.status(500).json({ message: err.message });
  }
});


router.get('/get-chronological-invoices', async (req, res) => {
  try {
    const {medicineId, username} = req.query;
    
    const invoices = await exchangeController.getChronologicalInvoices(medicineId as string, username as string);
    res.status(201).json(invoices);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});


export default router;
