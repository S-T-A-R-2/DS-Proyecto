import Invoice from '../models/invoice-model';
import Image from '../models/image-model';
import {InvoiceClass} from '../classes/Invoice'
import PointsController from './points-controller';

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
        const invoiceObject = new InvoiceClass(number, date, pharmacyId, medicineId, quantity, state, user, newInvoice._id.toString());
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
    let add: boolean;
    try {
      if (this.invoicesArray.length == 0) {
        const invoices = await Invoice.find({});
        for (let i in invoices) {
          add = true;
          for (let i in this.invoicesArray) {
            if (this.invoicesArray[i].getId() === invoices[i]._id.toString()) {
              add = false;
            }
          }
          if (add) {
            const invoiceObject = new InvoiceClass(invoices[i].number, invoices[i].date, invoices[i].pharmacyId, invoices[i].medicineId, invoices[i].quantity, invoices[i].state, invoices[i].user, invoices[i]._id.toString());
            this.invoicesArray.push(invoiceObject);
          }
        }
        return invoices;
      } else {
        return this.invoicesArray;
      }
    } catch (error: any) {
      throw new Error("No se pudo obtener las facturas. " + error.message);
    }
  }
  public async setInvoiceState (number: Number, state: string, username: String, medicine: String, quantity: number, _id: string) {
    try{
      const newInvoice = await Invoice.findOneAndUpdate(
        { number: number },
        { $set: { state:state } },
        { new: true}
      );
      for (let i = 0; i < this.invoicesArray.length; i++) {
        if (this.invoicesArray[i].getId() === _id) {
          this.invoicesArray[i].setState(state);
        }
      }
      if (state === "Aprobada") {
        const pointsController = PointsController.getInstance();
        await pointsController.updatePoints(username, medicine, quantity);
      }
    } catch (error: any) {
      throw new Error("Error inesperado: " + error.message);
    }
  }


  public async getApprovedMedicines(username: String) {
    const invoices = await Invoice.find({user: username, state: "Aprobada"});
    const medicines = new Array;

    //Obtener nombre de medicamentos de facturas aprobadas
    for (let i = 0; i < invoices.length; i++) {
      if (!medicines.includes(invoices[i].medicineId)) {
        medicines.push(invoices[i].medicineId);
      }
    }
    return medicines;
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
