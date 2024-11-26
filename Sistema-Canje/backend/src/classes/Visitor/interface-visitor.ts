import Invoice from '../Invoice'
export default interface Visitor {
    async visitInvoice(element: Invoice): Promise<void>;
}
