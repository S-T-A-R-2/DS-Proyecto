import Medicine from '../models/medicine-model';
import { Request, Response } from 'express';



export const getMedicines = async (req: any, res: any) => {
    try {
        const medicines = await Medicine.find({});
        res.json(medicines);
    } catch (error: any) {
        res.status(500).json({ message: "AAAA", error: error.message });
    }
};

export const filterMedicines = async (req: any, res: any) => {
    console.log(req.query);
    try {
        const {searchName, inBenefitsProgram} = req.query;
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
        res.json(medicines);
    } catch (error: any) {
        res.status(500).json({ message: "Error filtering medicines", error: error.message });
    }

};

export const updateGivenPoints = async (req: any, res: any) => {
    const {name, points_given} = req.body;
    try {
        const medicine = await Medicine.findOneAndUpdate(
            {name},
            {points_given},
            {new: true}
        );
        if (!medicine) {
            return res.status(404).json({message: "Medicine not Found"});
        }
        res.json(medicine);
    } catch (error: any) {
        res.status(500).json({message: "Error updating given points", error: error.message});
    }
};

export const updateRedeemPoints = async (req: any, res: any) => {
    const {name, redeeming_points} = req.body;
    try {
        const medicine = await Medicine.findOneAndUpdate(
            {name},
            {redeeming_points},
            {new: true}
        );
        if (!medicine) {
            return res.status(404).json({message: "Medicine not Found"});
        }
        res.json(medicine);
    } catch (error: any) {
        res.status(500).json({message: "Error updating redeem points", error: error.message});
    }
};