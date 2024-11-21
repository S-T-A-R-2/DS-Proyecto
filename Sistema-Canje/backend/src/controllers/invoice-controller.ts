import Invoice from '../models/invoice-model';
import Image from '../models/image-model';
import Points from '../models/points-model';
import MedicineController from './medicine-controller';
import {InvoiceClass} from '../classes/Invoice'

class InvoiceController {
  private static instance: InvoiceController;
  private invoicesArray: Array<InvoiceClass> = new Array();

  public static getInstance(): InvoiceController {
      if (!InvoiceController.instance) {
        InvoiceController.instance = new InvoiceController();
      }
      return InvoiceController.instance;
  }

  public async getImage (idInvoice: string) {
    try {
      const dataImage = await Image.findOne({idInvoice});
      return dataImage;
    } catch (error: any) {
      throw new Error("No se pudo obtener la imagen");
    } 
  }
  public async createInvoice (user: string, number: number, 
    date: string, pharmacyId: string, medicineId: string, 
    quantity: number, data: string, state: string) {
      try {
        const newInvoice = new Invoice({
          number,
          date,
          pharmacyId,
          medicineId,
          quantity,
          state,
          user
        })
        const idInvoice = newInvoice._id.toString();
        const invoiceObject = new InvoiceClass(number, date, pharmacyId, medicineId, quantity, state, user);
        this.invoicesArray.push(invoiceObject);
        const newImage = new Image({idInvoice, data});
        await newInvoice.save();
        await newImage.save();
      } catch (error: any) {
        console.log(error.message);
        throw new Error("No se pudo crear la factura. " + error.message);
      }
  }
  public async getAllInvoice(){
    try {
      if (this.invoicesArray.length == 0) {
        const invoices = await Invoice.find({});
        for (let i in invoices) {
          const invoiceObject = new InvoiceClass(invoices[i].number, invoices[i].date, invoices[i].pharmacyId, invoices[i].medicineId, invoices[i].quantity, invoices[i].state, invoices[i].user);
          this.invoicesArray.push(invoiceObject);
        }
        return invoices;
      } else {
        return this.invoicesArray;
      }
    } catch (error: any) {
      throw new Error("No se pudo obtener las facturas. " + error.message);
    }
  }
  public async setInvoiceState (number: Number, state: String, username: String, medicine: String) {
    try{
      const newInvoice = await Invoice.findOneAndUpdate(
        { number: number },
        { $set: { state:state } },
        { new: true}
      );

      /*---------------------------------------------------------------------
      ----------------CONTROLADOR DE PUNTOS?????----------------------------
      ---------------------------------------------------------------------*/


      const points = await Points.find({username: username, medicineId: medicine});
      const medicineController = MedicineController.getInstance();
      const medicineObject = await medicineController.getMedicine((medicine as string));

      console.log(points);
      if (points.length == 0) {//Si el usuario no ha acumulado puntos en un medicamento especifico
        const medicineId = medicineObject?.name;
        const medicineDescription = medicineObject?.description;
        const totalPoints = medicineObject?.points_given;
        const availablePoints = totalPoints;
        const newPoints = new Points({
          username,
          medicineId,
          medicineDescription,
          totalPoints,
          availablePoints
        });
        newPoints.save();
      } else {
        const totalPoints = points[0].totalPoints;
        const availablePoints = points[0].availablePoints;
        if (medicineObject?.points_given) {
          const accumulatedTotalPoints = totalPoints + medicineObject?.points_given;
          const accumulatedAvailablePoints = totalPoints + medicineObject?.points_given;
          await Points.findOneAndUpdate({
            totalPoints: accumulatedTotalPoints,
            availablePoints: accumulatedAvailablePoints
          });
        } else {
          throw new Error("No se pudo actualizar los puntos");
        }
      }
      
      
    } catch (error:any) {
      throw new Error("No se pudo actualizar la factura o los puntos. " + error.message);
    }
  }

  public async filterInvoices(stateFilter: any, dateRangeFilter: any, searchInvoiceNumber: any, userFilter: any){
    const query: any = {};
    try {
      if (userFilter && userFilter.trim() !== ""){
        query.user = userFilter;
      }  
      
      if (searchInvoiceNumber && searchInvoiceNumber.trim() !== "") {
        const invoiceNumber = Number(searchInvoiceNumber);
        if (!isNaN(invoiceNumber)) {
          query.number = invoiceNumber;
        }
      }
  
      if (stateFilter){
        const filterStates = JSON.parse(JSON.stringify(stateFilter));
        const statesArray: string[] = [];
  
        for (const state in filterStates) {
          if (filterStates[state] == "true") {
            statesArray.push(state);
          }
        }
  
        if (statesArray.length > 0) {
           query.state = {$in :statesArray};
        }
      }
      
      if (dateRangeFilter) {
        const { start, end } = dateRangeFilter;
        if ((start && start.trim() !== "") || (end && end.trim() !== "")) {query.date = {};}
  
        if (start && start.trim() !== "") {
          query.date.$lte = start;
        }
        if (end && end.trim() !== "") {
          query.date.$gte = end;
        }
      }
      
      const invoices = await Invoice.find(query);
      return invoices;
    } catch (error:any) {
      throw new Error("Error inesperado: " + error.message);
    }
  }

}

export default InvoiceController;
