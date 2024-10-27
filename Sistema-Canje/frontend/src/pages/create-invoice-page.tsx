import React, {useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {useNavigate, Link} from 'react-router-dom';
import { useAuth } from '../context/auth-context';

import Button from '../components/Button'
import Input from '../components/Input';

function CreateInvoice() {
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
    <div className="ytd-rich-grid-renderer h-screen  justify-center">
        <h1 className="text-2xl font-bold text-white">Iniciar Sesión</h1>
        
        <div className="bg-zinc-900 w-full p-5">
            {loginErrors.map((error, i) => (
                <div className="bonSubmitg-red-500 p-2 text-white" key={i}>
                    {error}
                </div>
            ))}
        
        
            <form onSubmit={onSubmit}className='flex flex-wrap justify-between border p-2 gap-20' >
                <div className="w-1/3 min-w-[150px] p-2">
                    <label 
                        className="text-sm font-medium text-white mb-1" htmlFor="inputFactura">
                        Número de Factura
                    </label>
                    <Input 
                        id="inputFactura"
                        type="text"
                        {...register("username", { required: true })}
                        placeholder="Ingrese el número de factura ..."
                    />

                    {errors.username && (
                        <p className="text-red-500">Username is required</p>
                    )}
                </div>
                <div className="w-1/3 min-w-[150px] p-2">
                    <label 
                        className="text-sm font-medium text-white mb-1" htmlFor="inputFecha">
                        Fecha
                    </label>
                    <Input 
                        id="inputFecha"
                        type="date"
                        {...register("username", { required: true })}
                    />

                    {errors.username && (
                        <p className="text-red-500">Username is required</p>
                    )}
                </div>
                <div className="w-1/3 min-w-[150px] p-2">
                    <label 
                        className="text-sm font-medium text-white mb-1" htmlFor="inputUser">
                        Farmacia
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
                <div className="w-1/3 min-w-[150px] p-2">
                    <label 
                        className="text-sm font-medium text-white mb-1" htmlFor="inputPass">
                        Agregar Medicamento
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
                <div className="w-1/3 min-w-[150px] p-2">
                    <label 
                        className="text-sm font-medium text-white mb-1" htmlFor="inputPass">
                        Agregar Imagen
                    </label>

                    <Input 
                        id='inputPass'
                        type="file"
                        {...register("password", { required: true })}
                        placeholder="Ingrese la contraseña ..."
                    />
                    
                    {errors.password && (
                        <p className="text-red-500">Password is required</p>
                    )}
                </div>
                <div className="w-1/3 min-w-[150px] p-2">
                    <label 
                        className="text-sm font-medium text-white mb-1" htmlFor="inputPass">
                        Estado
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

export default CreateInvoice