import Medicine from '../models/medicine-model';
import { Request, Response } from 'express';

export const getMedicines = async (req: any, res: any) => {
    try {
        console.log("hola get medicinas");
        // const medicines = await Medicine.find();
        // return res.status(200).json(medicines);
        return res.status(200).json({message: "hola"});

    } catch (error: any) {
        //return res.status(500).json({message: error.message});
        console.log("error medicinas" + error.message);
        return res.status(500).json({message: error.message});
    }
};

export const filterMedicines = async (req: any, res: any) => {
    try {
        console.log("hola filter medicinas");
        // const medicines = await Medicine.find();
        // return res.status(200).json(medicines);
        return res.status(200).json({message: "hola"});
    } catch (error: any) {
        //return res.status(500).json({message: error.message});
        console.log("error filtrar medicinas" + error.message);
        return res.status(500).json({message: error.message});
    }
};

export const updatePoints = async (req: any, res: any) => {
    try {
        //update points required
        //update redeem awarded points
        console.log("hola update points");
        return res.status(200).json({message: "hola"});

    } catch (error: any) {
        //return res.status(500).json({message: error.message});
        console.log("error update points" + error.message);
        return res.status(500).json({message: error.message});
    }
};

