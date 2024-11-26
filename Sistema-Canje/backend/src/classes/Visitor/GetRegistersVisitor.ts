import Visitor from './interface-visitor';
import Invoice from '../Invoice'
import MedicineController from '../../controllers/medicine-controller';
import {MedicineClass} from '../Medicine';

class GetRegisterVisitor implements Visitor {
    private usedPoints: number;
    private availablePoints: number;
    private medControl: MedicineController;
    constructor(
    ) {
      this.usedPoints = 0;
      this.availablePoints = 0;
      this.medControl = MedicineController.getInstance();
    }

    public async visitInvoice(element: Invoice): Promise<void> {
      let meds = await this.medControl.getMedicines();
      for (const m of meds){
        if (m.getName() == element.getMedicineId()){
          if (element.getState() == "Aprobada") {
            this.availablePoints += m.getPoints_given()*element.getQuantity();
          } 
          if(element.getState() == "Canjeada") {
            this.usedPoints += m.getPoints_given()*element.getQuantity();
          }
        }
      }
    }

    public getStatistics() {
      const statistics = {
        acumulatedPoints: this.usedPoints+this.availablePoints,
        usedPoints: this.usedPoints,
        availablePoints: this.availablePoints,
      }
        
      return statistics;
    }

}

export default GetRegisterVisitor;
