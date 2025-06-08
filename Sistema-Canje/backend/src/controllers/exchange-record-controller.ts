import {ExchangeRecordClass} from '../classes/ExchangeRecord'
//import CronologicalStrategy from '../classes/CronologicalStrategy'
import DetailStrategy from '../classes/DetailStrategy';
import ChronologicalInvoicesStrategy from '../classes/ChronologicalInvoicesStrategy';
import ExchangeRecord from '../models/exchange-record-model';
import { Request, Response } from 'express';
import Sequence from '../models/sequence-model';
import VisitorUpdate from '../classes/Visitor/visitor-update';
import InvoiceController from './invoice-controller';
import GetRegisterVisitor from '../classes/Visitor/GetRegistersVisitor';
import InvoiceClass from '../classes/Invoice'

class ExchangeController {
    private static instance: ExchangeController;
    private exchanges: Array<ExchangeRecordClass> = new Array();
    private visitorUpdate = new VisitorUpdate();
    private invoiceController = InvoiceController.getInstance();
    private currentPool: Array<ExchangeRecordClass> = new Array();

    public static getInstance(): ExchangeController {
        if (!ExchangeController.instance) {
            ExchangeController.instance = new ExchangeController();
        }
        return ExchangeController.instance;
    }
    public async createExchangeRecord(username: string, medicine: string, pharmacy: string | undefined, invoicesUsed: number[]) {
        try {
            const sequence = await Sequence.find({ schema: "ExchangeRecord" });
            let number = 0;
    
            if (sequence.length === 0) {
                const newSequence = new Sequence({
                    schema: "ExchangeRecord",
                    number: 0
                });
                await newSequence.save();
            } else {
                number = sequence[0].number + 1;
                await Sequence.findOneAndUpdate(
                    { schema: "ExchangeRecord" },
                    { $set: { number } }
                );
            }
    
            const date = new Date().toISOString();
            const newRecord = new ExchangeRecord({
                number,
                username,
                medicine,
                date,
                pharmacy,
                invoicesUsed,
            });
    
            this.visitorUpdate.setExchangeNumber(number);
            const invoices: Array<InvoiceClass> = await this.invoiceController.getAllInvoice();
            for (const invoice of invoices) {
                if (invoicesUsed.includes(invoice.getNumber())) {
                    await invoice.accept(this.visitorUpdate);
                    //await this.visitorUpdate.visitInvoice(invoice);
                }
            }
            await newRecord.save();
            console.log("Registro creado exitosamente.");
        } catch (error: any) {
            console.error("Error al crear el registro:", error);
            throw new Error("No se pudo crear el registro: " + error.message);
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
        let result = this.exchanges.filter((ex) => ex.username == username);
        this.currentPool = result;

        return result.sort((a, b) => a.date.localeCompare(b.date));
        

    }

    public async getChronologicalInvoices(medicineId: string, username: string) {
        const strategy = new ChronologicalInvoicesStrategy();
        return await strategy.getChronologicalInvoices(medicineId, username);
    }
    public async getCurrentStatisticsTest(count: any) {
        await this.getAllExchanges();
        let answer = 0;
        let countTemp = count;
        while (countTemp>0) {
          countTemp--;
          //answer += await this.getCurrentStatistics();
        }
        console.log(`Total: ${answer/count}`);
    }

    private a = false;
    public async getCurrentStatistics(){
        if (!this.a) {
            this.a = true;
            await this.getAllExchanges();
        }
        const startTime = performance.now();
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

        const r = visitor.getStatistics();
        const endTime = performance.now();
        console.log(12/(endTime-startTime));
        //return (12)/(endTime-startTime);
        //return r;
    }


} 
export default ExchangeController;
