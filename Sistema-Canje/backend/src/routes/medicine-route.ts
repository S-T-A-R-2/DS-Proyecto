import { Router, Request, Response } from 'express';
//import {authRequired} from '../middlewares/validateToken.js';
import MedicineController from '../controllers/medicine-controller'
 
const router = Router();
const medicineController = MedicineController.getInstance();

router.get('/getmedicines', async (req, res) => {
  try {
    const medicines = await medicineController.getMedicines();
    res.json(medicines);
  } catch (error:any) {
    res.status(500).json({ message: "AAAA", error: error.message });  
  }
});

router.get('/filter-medicines', async (req, res) => {
  const {searchName, inBenefitsProgram} = req.query;
  try {
    const medicines = await medicineController.filterMedicines(searchName, inBenefitsProgram);
    res.json(medicines);
  } catch (error:any){
    res.status(500).json({ message: "Error filtering medicines", error: error.message });
  }
});

router.put('/updateRedeem', async (req, res) => {
  const { name, redeeming_points } = req.body;
  //console.log(req.body);
  try {
    const medicine = await medicineController.updateRedeemPoints(name, redeeming_points);
    
    if (!medicine) {
      res.status(404).json({ message: "Medicine not found" });
    } else {
      res.status(200).json(medicine);
    }
  } catch (error: any) {
    res.status(500).json({message: "Error updating redeeming points",error: error.message});
  }
});

router.put('/updateGiven', async (req, res) => {
  const {name, points_given} = req.body;
  //console.log(req.body);
  try {
    const medicine = await medicineController.updateGivenPoints(name, points_given);
    if (!medicine) {
      res.status(404).json({message: "Medicine not Found"});
    } else {
      res.status(200).json(medicine);
    }
  } catch (error: any) {
        res.status(500).json({message: "Error updating given points", error: error.message});
  }
});
export default router;
