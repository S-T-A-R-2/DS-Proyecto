import Invoice from '../models/invoice-model';
import { Request, Response } from 'express';
import mongoose, {model, Document, Schema} from 'mongoose'


export const createInvoice = async (req: any, res: any) => {
    try {
        
        console.log("no fallo");
        return res.status(201).json({nombre:"prueba"});
    } catch (error: any) {
        console.log("fallo" +error.message);
    }
};

export const getAllInvoice = async (req: any, res: any) => {
    try {
        const invoices = await Invoice.find({});
        console.log(invoices);
        res.json(invoices);
    } catch (error: any) {
        res.status(500).json({ message: "Uyuyui", error: error.message });
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