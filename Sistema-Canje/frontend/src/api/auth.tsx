import axios from './axios';
import { User } from '../logic/classes/User'

type UserData = {
    username: string;
    name: string;
    email: string;
    password: string;
};

export const registerRequest = (userData : UserData) => {return axios.post(`/register`, userData);};
export const loginRequest = (userData : {username : string, password : string}) => 
    axios.post(`/login`, userData);

/* Andrés arregle esto*/
export const createUser = (user : User) => axios.post('create-user', user);
export const verifyTokenRequest = () => axios.get(`/verify`);