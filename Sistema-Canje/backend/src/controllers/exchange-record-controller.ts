import ExchangeRecord from '../models/exchange-record-model';
import { Request, Response } from 'express';
import Sequence from '../models/sequence-model';
class ExchangeController {
    private static instance: ExchangeController;

    public static getInstance(): ExchangeController {
        if (!ExchangeController.instance) {
            ExchangeController.instance = new ExchangeController();
        }
        return ExchangeController.instance;
    }

    public async createExchangeRecord(username: any, medicine: any, pharmacy: any, invoicesUsed: any) {
        try {
            const sequence = await Sequence.find({_id: "ExchangeRecord"});
            let number = 0;
            if (sequence.length == 0) {
                let sequence = new Sequence({
                    _id: "ExchangeRecord",
                    number: 0
                });
                sequence.save();
            } else {
                number = sequence[0].number + 1;
                await Sequence.findOneAndUpdate({_id: "ExchangeRecord", number: number});
            }
            const newRecord = new ExchangeRecord({
                number,
                username,
                medicine,
                pharmacy,
                date: new Date(), 
                invoicesUsed,
            });
            await newRecord.save();
        } catch (error: any) {
            throw new Error("No se pudo obtener las farmacias. " + error.message);
        }
    }

} 
export default ExchangeController;
