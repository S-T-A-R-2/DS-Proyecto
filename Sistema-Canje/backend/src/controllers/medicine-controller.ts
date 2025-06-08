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

  public async getMedicinesTest(count:any) {
    let answer = 0;
    let countTemp = count;
    while (countTemp>0) {
      countTemp--;
      //answer += await this.getMedicines();
    }
    console.log(`Total: ${answer/count}`);
  }

  public async getMedicines() {
    const startTime = performance.now();
    if (this.medicines.length != 0){
      const endTime = performance.now();
      //return this.medicines;
    }
    try {
        const meds = await Medicine.find({});
        for (let i in meds) {
          const medObject = new MedicineClass(meds[i].name, meds[i].description, meds[i].redeeming_points, meds[i].points_given);
          this.medicines.push(medObject);
        } 
        const endTime = performance.now();
        return this.medicines;
        //return (1+(meds.length*2))/(endTime-startTime); //funciones por milisegundo
    } catch (error: any) {
        throw new Error("No se pudo obtener las medicinas. " + error.message);
    }
  }
  public async filterMedicinesTest(searchName:any, inBenefitsProgram:any, count:any) {
    let answer = 0;
    let countTemp = count;
    while (countTemp>0) {
      countTemp--;
      //answer += await this.filterMedicines(searchName, inBenefitsProgram);
    }
    console.log(`Total: ${answer/count}`);
  }

  public async filterMedicines(searchName:any, inBenefitsProgram:any) {
    const startTime = performance.now();
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
        const endTime = performance.now();
        console.log(endTime-startTime);
    } catch (error: any) {
        throw new Error("No se pudo obtener las medicinas. " + error.message);
    }
  }

  public async updateGivenPointsTest(name:any, points_given:any, count: any) {
    let answer = 0;
    let countTemp = count;
    while (countTemp>0) {
      countTemp--;
      //answer += await this.updateGivenPoints(name, points_given);
    }
    console.log(`Total: ${answer/count}`);
  }

  public async updateGivenPoints(name:any, points_given:any){
    const startTime = performance.now();
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
        const endTime = performance.now();
        return medicine;
    } catch (error: any) {
        throw new Error("No se pudo obtener las medicinas. " + error.message);
    }
  }

  public async updateRedeemPointsTest(name:any, redeeming_points:any, count: any) {
    let answer = 0;
    let countTemp = count;
    while (countTemp>0) {
      countTemp--;
      answer += await this.updateRedeemPoints(name, redeeming_points);
    }
    console.log(`Total: ${answer/count}`);
  }

  public async updateRedeemPoints(name:any, redeeming_points:any) {
    const startTime = performance.now();
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
        const endTime = performance.now();
        //return medicine;
        return endTime-startTime;
    } catch (error: any) {
        throw new Error("No se pudo obtener las medicinas. " + error.message);
    }
  }

  public async getMedicine(name:string) {
    const startTime = performance.now();
    const medicine = await Medicine.findOne({name: name});
    return medicine;
  }
}

export default MedicineController;
