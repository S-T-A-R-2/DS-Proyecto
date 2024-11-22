  import Medicine from '../models/medicine-model';
  import { Request, Response } from 'express';
  import {MedicineClass} from '../classes/Medicine'
  import UserController from './auth-controller';
  import InvoiceController from './invoice-controller';


class MedicineController {
  

  private static instance: MedicineController;
  private medicines: Array<MedicineClass> = new Array();

  public static getInstance(): MedicineController {
      if (!MedicineController.instance) {
        MedicineController.instance = new MedicineController();
      }
      return MedicineController.instance;
  }

  public async getMedicines() {

    if (this.medicines.length != 0){return this.medicines}
    
    try {
        const meds = await Medicine.find({});
        for (let i in meds) {
          const medObject = new MedicineClass(meds[i].name, meds[i].description, meds[i].redeeming_points, meds[i].points_given);
          this.medicines.push(medObject);
        } 
        return this.medicines;
      
    } catch (error: any) {
        throw new Error("No se pudo obtener las medicinas. " + error.message);
    }
  }

  public async filterMedicines(searchName:any, inBenefitsProgram:any) {
    try {
        const query: any = {};

        if (searchName && searchName.trim() !== "") {
            query.name = { $regex: searchName, $options: 'i' };
        }

        if (inBenefitsProgram === "true") {
            query.redeeming_points = { $gt: 0 };
        } else if (inBenefitsProgram === "false") {
            query.redeeming_points = 0;
        }

        const medicines = await Medicine.find(query);
        return medicines;
    } catch (error: any) {
        throw new Error("No se pudo obtener las medicinas. " + error.message);
    }
  }

  public async updateGivenPoints(name:any, points_given:any){
    try {
        const medicine = await Medicine.findOneAndUpdate(
            {name},
            {points_given},
            {new: true}
        );

        for (let m of this.medicines){
          if (name == m.getName()){
            m.setPoints_given(points_given);
          }
        }
        return medicine;
    } catch (error: any) {
        throw new Error("No se pudo obtener las medicinas. " + error.message);
    }
  }

  public async updateRedeemPoints(name:any, redeeming_points:any) {
    
    try {
        const medicine = await Medicine.findOneAndUpdate(
            {name},
            {redeeming_points},
            {new: true}
        );

        for (let m of this.medicines){
          if (name == m.getName()){
            m.setRedeemingPoints(redeeming_points);
          }
        }

        return medicine;
    } catch (error: any) {
        throw new Error("No se pudo obtener las medicinas. " + error.message);
    }
  }

  public async getMedicine(name:string) {
    return await Medicine.findOne({name: name});
  }
}

export default MedicineController;
