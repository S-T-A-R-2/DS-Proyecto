import {ExchangeRecordClass} from '../classes/ExchangeRecord'
//import CronologicalStrategy from '../classes/CronologicalStrategy'
import DetailStrategy from '../classes/DetailStrategy';
import ExchangeRecord from '../models/exchange-record-model';
import { Request, Response } from 'express';
import Sequence from '../models/sequence-model';
import InvoiceController from './invoice-controller';
import GetRegisterVisitor from '../classes/Visitor/GetRegistersVisitor';
import InvoiceClass from '../classes/Invoice'

class ExchangeController {
    private static instance: ExchangeController;
    private exchanges: Array<ExchangeRecordClass> = new Array();
    private currentPool: Array<ExchangeRecordClass> = new Array();

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

    public async getAllExchanges(){
        if (this.exchanges.length == 0){
            let detail = new DetailStrategy();
            const a = await detail.execute()
            this.exchanges = a.sort((a, b) => a.date.localeCompare(b.date));

        }
        this.currentPool = this.exchanges;
        return this.exchanges;
    }

    public getExchangesByUser(username:string){
        let result = this.exchanges.filter((ex) => ex.username === username);
        this.currentPool = result;
        
        return result.sort((a, b) => a.date.localeCompare(b.date));
        
    }

    public async getCurrentStatistics(){
        let invoicesControl = InvoiceController.getInstance(); 
        let visitor = new GetRegisterVisitor(); 
        const invoices:InvoiceClass[] = await invoicesControl.getAllInvoice();
        for (const exchange of this.currentPool) {
            for (const invoice of invoices){
              for (const num of exchange.getInvoicesUsed()){
                if (num == invoice.getNumber()) {
                  await invoice.accept(visitor); 
                } 
              }
            }
        }

        return visitor.getStatistics();
    }

} 
export default ExchangeController;
