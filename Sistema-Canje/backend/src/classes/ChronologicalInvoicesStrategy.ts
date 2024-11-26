import Strategy from './StrategyInterface';
import Invoice from '../models/invoice-model';
import ExchangeRecord from '../models/exchange-record-model';
import ExchangeRecordClass from './ExchangeRecord';

class ChronologicalInvoicesStrategy implements Strategy {

    public async execute(medicineId: string, username: string) {
        return await this.getChronologicalInvoices(medicineId, username);
    }

    public async getChronologicalInvoices(medicineId: string, username: string) {
        const invoices = await Invoice.find({ medicineId, user: username });
        const exchangeRecords = await ExchangeRecord.find({ medicine: medicineId, username });

        const result = invoices.map((invoice) => {
            const relatedExchange = exchangeRecords.find((exchange) =>
                exchange.invoicesUsed.includes(invoice.number)
            );

            return {
                invoiceNumber: invoice.number,
                invoiceDate: invoice.date,
                pharmacy: invoice.pharmacyId,
                usedInExchange: relatedExchange ? relatedExchange.number : null,
            };
        });

        return result.sort(
            (a, b) => new Date(a.invoiceDate).getTime() - new Date(b.invoiceDate).getTime()
        );
    }
}

export default ChronologicalInvoicesStrategy;