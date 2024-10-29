import axios from './axios';
import { User } from '../logic/classes/User'

type UserData = {
    username: string;
    name: string;
    phone: string;
    email: string;
    password: string;
    rol: string;
};

type InvoiceData = {
    number: string;
    date: string;
    pharmacy: string;
    medicine: string;
    quantity: number;
    image: string;
    state: string;
};

type MedicineData = {
    name: string;
    code: string;
    isRedeemable: boolean;
    description: string;
    presentation: string;
    pointsRequired: number;
    pointsAwarded: number;
};

export const registerRequest = (userData : UserData) => {return axios.post(`/register`, userData);};
export const loginRequest = (userData : {username : string, password : string}) => 
    axios.post(`/login`, userData);
export const verifyTokenRequest = () => axios.get(`/verify`);
 
//Invoices
export const createInvoice = (invoice : InvoiceData) => {
    return axios.post('/createInvoice',invoice);
}

//Medicines
export const getMedicines = () => {return axios.get('/getmedicines');};
export const filterMedicines = () => {return axios.get('/filtermedicines');};
export const updatePoints = (medicine : MedicineData) => {return axios.put('/updatepoints',medicine);};

