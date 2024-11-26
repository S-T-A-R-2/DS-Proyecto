import Invoice from '../Invoice'
export default interface Visitor {
    visitInvoice(element: Invoice): void;
}