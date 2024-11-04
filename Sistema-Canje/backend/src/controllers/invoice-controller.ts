import Invoice from '../models/invoice-model';
import Image from '../models/image-model';
import {InvoiceClass} from '../classes/Invoice'

let invoicesArray: Array<InvoiceClass> = new Array();


class InvoiceController {
  private static instance: InvoiceController;
  
  public static getInstance(): InvoiceController {
      if (!InvoiceController.instance) {
        InvoiceController.instance = new InvoiceController();
      }
      return InvoiceController.instance;
  }

  public async getImage (idInvoice: string) {
    try {
      const dataImage = await Image.findOne({idInvoice}    )
      return dataImage;
    } catch (error: any) {
      throw new Error("No se pudo obtener la imagen");
    } 
  }
  public async createInvoice (user: string, number: number, 
    date: string, pharmacyId: string, medicineId: string, 
    quantity: number, data: string, state: string) {
      try {
        const check = await Invoice.findOne({number})
        if (check != null) {
          throw new Error("El objeto ya existe");
          //return res.status(409).json({nombre:"El objeto ya existe"});
        }
        const newInvoice = new Invoice({
          number,
          date,
          pharmacyId,
          medicineId,
          quantity,
          state,
          user
        })
        const invoiceObject = new InvoiceClass(number, date, pharmacyId, medicineId, quantity, state, user);
        invoicesArray.push(invoiceObject);
        const idInvoice = number;
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
      if (invoicesArray.length == 0) {
        const invoices = await Invoice.find({});
        for (let i in invoices) {
          const invoiceObject = new InvoiceClass(invoices[i].number, invoices[i].date, invoices[i].pharmacyId, invoices[i].medicineId, invoices[i].quantity, invoices[i].state, invoices[i].user);
          invoicesArray.push(invoiceObject);
        }
        return invoices;
      } else {
        return invoicesArray;
      }
    } catch (error: any) {
      throw new Error("No se pudo obtener las facturas. " + error.message);
    }
  }
  public async setInvoiceState (number: number, state: string) {
    try{
      const newInvoice = await Invoice.findOneAndUpdate(
        { number: number },
        { $set: { state:state } },
        { new: true}
      );
    } catch (error:any) {
      throw new Error("No se pudo actualizar la factura. " + error.message);
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