import Invoice from '../models/invoice-model';
import Image from '../models/image-model';
import { Request, Response } from 'express';
import mongoose, {model, Document, Schema} from 'mongoose'
import {InvoiceClass} from '../classes/Invoice'

let invoicesArray: Array<InvoiceClass> = new Array();

export const getImage = async (req: any, res: any) => {
  try {
    let idInvoice = req.query.number;
    idInvoice = idInvoice
    const dataImage = await Image.findOne(
      {idInvoice}
    )
    res.json(dataImage);
  } catch (error: any) {
    res.status(500).json({ message: "No se pudo obtener la imagen", error: error.message });
  }
}

export const createInvoice = async (req: any, res: any) => {
    try {
        const {username, number, date, pharmacy, medicine, quantity, image, state} = req.body;
        const imageId = number+username;
        const pharmacyId = pharmacy;
        const medicineId = medicine;
        const user = username;

        const check = await Invoice.findOne(
          {number}
        )
        if (check != null) {
          return res.status(409).json({nombre:"El objeto ya existe"});
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
        const data = image;
        const newImage = new Image({
          idInvoice,
          data
        })
        await newInvoice.save();
        await newImage.save();
        
        return res.status(201).json({nombre:"Creacion de factura exitosa"});
    } catch (error: any) {
      res.status(500).json({ message: "No se pudo crear la factura", error: error.message });
    }
};

export const getAllInvoice = async (req: any, res: any) => {

    try {
        if (invoicesArray.length == 0) {
          const invoices = await Invoice.find({});
          for (let i in invoices) {
            const invoiceObject = new InvoiceClass(invoices[i].number, invoices[i].date, invoices[i].pharmacyId, invoices[i].medicineId, invoices[i].quantity, invoices[i].state, invoices[i].user);
            invoicesArray.push(invoiceObject);
          }
          res.json(invoices);
        } else {
          res.json(invoicesArray);
        }
    } catch (error: any) {
        res.status(500).json({ message: "No se pudo obtener las facturas", error: error.message });
    }
};

export const filterInvoices= async (req: any, res: any) => {
  try {
    const {stateFilter, dateRangeFilter, searchInvoiceNumber} = req.query;
    const query: any = {};

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
    res.json(invoices);

  } catch (error:any) {
    res.status(500).json({message:"Uyuyuyyui", error:error.message});
  }
};

/*
{
    id:string;
    name:string;
    description:string;
    redeeming_points:int;
    points_given:int+;
}
*/
/*export const register = async (req: any, res: any) => {
    const {username, name, phone, email, password, rol } = req.body
    try {
        const users = await User.find({username : username});
        if (users.length > 0) {
            console.log("Usuario ya existente");
            console.log(users);
            return res.status(400).json({message: "Error: Usuario existente."});
        } else {
            const newUser = new User({
                username,
                name,
                phone,
                email,
                password,
                rol
            });
            const savedUser = await newUser.save();
            return res.status(201).json(savedUser);
        }
    } catch (error : any) {
        return res.status(500).json({message: error.message});
    }
};*/

/*
    number: '121212',
    date: '2024-10-29',
    pharmacy: 2,
    medicine: 1,
    quantity: '12',
    image: 'datos epicos en algo que es algo de algo,
    state: 'Aprobada'
*/
