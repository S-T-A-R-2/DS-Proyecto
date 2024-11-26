import Visitor from './interface-visitor';
import Invoice from '../Invoice'
class VisitorUpdate implements Visitor {
    visitInvoice(element: Invoice): void {
      console.log(`Visitando invoice: ${element.getState()}`);
    }
}