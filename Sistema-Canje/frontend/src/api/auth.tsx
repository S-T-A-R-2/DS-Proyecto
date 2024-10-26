import axios from './axios';
import { User } from '../logic/classes/User'

export const registerRequest = (userData : {
    username: string;
    name: string;
    email: string;
    password: string;
}) => axios.post(`/register`, userData);
export const createUser = (user : User) => axios.post('create-user', user);
export const loginRequest = (userData : {username : string, password : string}) => 
    axios.post(`/login`, userData);
export const verifyTokenRequest = () => axios.get(`/verify`);