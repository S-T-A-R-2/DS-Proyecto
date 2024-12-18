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
    number: number;
    date: string;
    pharmacy: string;
    medicine: string;
    quantity: number;
    image: string;
    state: string;
};

type MedicineData = {
    name: string;
    description: string;
    redeeming_points: number;
    points_given: number;
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
export const filterInvoices = (stateFilter:any, dateRangeFilter:any, searchInvoiceNumber:any, userFilter: any) => axios.get('/filter-invoices', {
  params:{stateFilter, dateRangeFilter, searchInvoiceNumber, userFilter}
});
export const getImage = (number: any) => axios.get('/getImage', {params: {number}});

export const setInvoiceState = (update:{number:number, state:string, username: string, medicineId: string, quantity: number, _id: string}) => axios.post('/set-invoice-state', update)


//Medicines
export const getMedicines = () => {return axios.get('/getmedicines');};
export const filterMedicines = (searchName: any, inBenefitsProgram: any) => axios.get('/filter-medicines', {
    params: {searchName, inBenefitsProgram}
});
export const updateRedeemPoints = (medicine: MedicineData) => axios.put('/updateRedeem', medicine);
export const updateGivenPoints = (medicine: MedicineData) => axios.put('/updateGiven', medicine);
export const getAllPharmacies = () => axios.get('/get-all-pharmacies');

//Points
export const getBenefitInfo = (username: string | undefined) => axios.post('/getBenefitInfo', {username});
export const updatePoints = (username: string | undefined, medicine: string | undefined) => axios.post('/updatePoints', {username, medicine});

//Exchange Records
export const createExchangeRegister = (client: string, medicineId: string, pharmacy: string | undefined, invoicesUsed: number[]) => axios.post('/create-exchange-register', {client, medicineId, pharmacy, invoicesUsed});
export const getAllExchanges = () => axios.get('/get-all-exchanges');
export const getExchangesByUser = (user: String) => axios.get('/get-exchanges-user', {
  params:{user}
});
export const getCurrentStatistics = () => axios.get('/get-statistics');
export const getChronologicalInvoices = (medicineId: string, username: string) => {
    return axios.get('/get-chronological-invoices', {
      params: { medicineId, username }
    });
  };
