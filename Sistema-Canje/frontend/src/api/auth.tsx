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

export const registerRequest = (userData : UserData) => {return axios.post(`/register`, userData);};
export const loginRequest = (userData : {username : string, password : string}) => 
    axios.post(`/login`, userData);
export const verifyTokenRequest = () => axios.get(`/verify`);
 
//Invoices
export const createInvoice = (invoice : InvoiceData) => {
    return axios.post('/createInvoice',invoice);
}

export const getAllInvoices = () => axios.get('/get-all-invoice'); 
export const filterInvoices = (stateFilter:any, dateRangeFilter:any, searchInvoiceNumber:any) => axios.get('/filter-invoices', {
  params:{stateFilter, dateRangeFilter, searchInvoiceNumber}
});
