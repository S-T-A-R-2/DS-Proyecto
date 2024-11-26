import ExchangeRecordClass from './ExchangeRecord';
import Strategy from './StrategyInterface';
import ExchangeRecord from '../models/exchange-record-model';
import Invoice from '../models/invoice-model';


class DetailStrategy implements Strategy {
  public async execute() {
        const exchanges = await ExchangeRecord.find({});
        const result = new Array();
        for (let exchange of exchanges) {
            const object = new ExchangeRecordClass(
                exchange.number,
                exchange.username,
                exchange.medicine,
                exchange.date,
                exchange.pharmacy,
                exchange.invoicesUsed
            );
            result.push(object);
        }
        return result;
    }

    public async getChronologicalInvoices(medicineId: string, username: string) {
        const invoices = await Invoice.find({medicineId, user: username});
        
        //const exchangeRecords = await ExchangeRecord.find({medicine: medicineId, username});

        const result = invoices.map((invoice) => {
            /*const relatedExchange = exchangeRecords.find((exchange) =>
                exchange.invoicesUsed.includes(invoice.number)
            );*/

            return {
                invoiceNumber: invoice.number,
                invoiceDate: invoice.date,
                pharmacy: invoice.pharmacyId,
                exchangeNumber: invoice.exchangeNumber,
            };
        })

        return result.sort(
            (a, b) => new Date(a.invoiceDate).getTime() - new Date(b.invoiceDate).getTime()
        );
    }
}

export default DetailStrategy;
