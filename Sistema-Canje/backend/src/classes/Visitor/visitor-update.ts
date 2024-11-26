import Visitor from './interface-visitor';
import Invoice from '../Invoice'
export default class VisitorUpdate implements Visitor {
    constructor(
        public exchangeNumber: Number = 0,
    ) {}
    setExchangeNumber(number: Number) {
        this.exchangeNumber = number;
    }
    async visitInvoice(element: Invoice) {
        await element.setState("Canjeada");
        await element.setExchangeNumber(this.exchangeNumber);
    }
}