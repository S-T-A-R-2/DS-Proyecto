import React, {useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {useNavigate, Link} from 'react-router-dom';
import { useAuth } from '../context/auth-context';

import Button from '../components/Button'
import Input from '../components/Input';

function LoginPage() {
    type FormData = {
        username: string;
        password: string;
    };

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const {signIn, isAuthenticated, errors: loginErrors = []} = useAuth();
    const navigate = useNavigate();
    
    const onSubmit = handleSubmit(async (data : FormData) => {
        const { username, password } = data;
        const userData = {
            username,
            password
        }
        await signIn(userData);
    });

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    return (
    <div className="flex flex-col h-screen items-center justify-center">
        <h1 className="text-2xl font-bold text-white">Iniciar Sesión</h1>
        
        <div className="bg-zinc-900 max-w-md w-full p-10 py-[150px] rounded-md border">
            {loginErrors.map((error, i) => (
                <div className="bg-red-500 p-2 text-white" key={i}>
                    {error}
                </div>
            ))}
            
            <form onSubmit={onSubmit} className='flex flex-col space-y-[20px] text-left'>
                <div>
                    <label 
                        className="text-sm font-medium text-white mb-1" htmlFor="inputUser">
                        Usuario
                    </label>
                    <Input 
                        id="inputUser"
                        type="text"
                        {...register("username", { required: true })}
                        placeholder="Ingrese el nombre de usuario ..."
                    />

                    {errors.username && (
                        <p className="text-red-500">Username is required</p>
                    )}
                </div>
                <div>
                    <label 
                        className="text-sm font-medium text-white mb-1" htmlFor="inputPass">
                        Contraseña
                    </label>

                    <Input 
                        id='inputPass'
                        type="password"
                        {...register("password", { required: true })}
                        placeholder="Ingrese la contraseña ..."
                    />
                    
                    {errors.password && (
                        <p className="text-red-500">Password is required</p>
                    )}
                </div>
                
                <div className='flex flex-row space-x-[60px] items-center px-[40px]'>
                    <Button onClick={() => {navigate('/register')}}>Registrarse</Button>
                    <Button type="submit">Iniciar Sesión</Button>
                </div>
            </form>
        </div>
    </div>
    );
}

export default LoginPage