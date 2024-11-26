import Visitor from './interface-visitor';
import Invoice from '../Invoice'
class VisitorUpdate implements Visitor {
    constructor(
        public exchangeNumber: Number,
    ) {}
    setExchangeNumber(number: Number) {
        this.exchangeNumber = number;
    }
    visitInvoice(element: Invoice): void {
        element.setState("Canjeada");
        element.setExchangeNumber(this.exchangeNumber);
    }
}