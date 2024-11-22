import React from 'react'
import {useForm} from 'react-hook-form'
import {useAuth} from '../context/auth-context'
import { useEffect, useState } from 'react';
import {useNavigate, Link} from 'react-router-dom'
import Input from '../components/Input';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';

function RegisterPage() {
    const { register, handleSubmit, formState: {
        errors,
    } } = useForm<FormData>();
    
    type FormData = {
        username: string;
        name: string;
        phone: string;
        email: string;
        password: string;
    };
    
    const { signUp, isAuthenticated, errors: registerErrors, user } = useAuth();
    const navigate = useNavigate();

    const onSubmit = handleSubmit( async (values : FormData) => {
        await signUp({...values, rol: rol});
        navigate('/login');
    });
    
    const labelStyle = "text-sm font-medium text-white mb-1"

    const [rol, setRol] = useState<string>("Cliente")

    const profileOptions = [
		{ label: 'Cliente', onClick: () => {setRol('Cliente'); setIsOpenMenu(!isOpenMenu)}},
        { label: 'Operativo', onClick: () => {setRol('Operativo'); setIsOpenMenu(!isOpenMenu)} },
        { label: 'Admin', onClick: () => {setRol('Admin'); setIsOpenMenu(!isOpenMenu)} },
        { label: 'Farmacia', onClick: () => {setRol('Farmacia'); setIsOpenMenu(!isOpenMenu)} }
	];

    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
    const toggleMenu = () => {
		setIsOpenMenu(!isOpenMenu);
	};

    return (
        
    <div className = "max-w-sm bg-zinc-900 max-w-md p-2 rounded-md flex justify-center flex-col m-auto h-screen">
        <div className="bg-zinc-900 max-w-md w-full p-10 rounded-md">
        {registerErrors.map((error, i) => (
            <div className="bg-red-500 p-2 text-white" key={i}>
                {error}
            </div>
        ))}
        <h1 className="text-white my-2 w-full">Registrar Cuenta</h1>
        <form onSubmit={onSubmit} className='flex flex-col space-y-[20px] text-left'>
            <div className='bg-zinc-900 max-w-md w-full p-10 py-[20px] rounded-md border'>
            <div>
                <label
                    className={labelStyle}>
                    Nombre Completo
                </label>
                <Input
                    type="text" {...register("name", {required: true})}
                    placeholder='Nombre completo'
                />
                {errors.name && (
                    <p className="text-red-500">El nombre es requerido</p>
                )}
            </div>
            <div>
                <label 
                    className={labelStyle}>
                    Usuario
                </label>
                <Input
                    type="text" {...register("username", {required: true})}
                    placeholder='Usuario'
                />
                {errors.username && (
                    <p className="text-red-500">Nombre de usuario es requerido</p>
                )}
            </div>
            
            <div>
                <label 
                    className={labelStyle}>
                    Correo
                </label>
                <Input 
                    type="email" {...register("email", {required: true})}
                    placeholder='Correo electrónico'
                />
                {errors.email && (
                    <p className="text-red-500">El correo electrónico es requerido</p>
                )}
            </div>

            <div>
                <label 
                    className={labelStyle}>
                    Número de teléfono
                </label>
                <Input 
                    type="text" {...register("phone", {required: true})}
                    placeholder='Número de teléfono'
                />
                {errors.email && (
                    <p className="text-red-500">El número de teléfono es requerido</p>
                )}
            </div>

            <div>
                <label 
                    className={labelStyle}>
                    Contraseña
                </label>
                <Input 
                    type="password" {...register("password", {required: true})}
                    placeholder='Contraseña'/> 
                {errors.password && (
                    <p className="text-red-500">La contraseña es requerida</p>
                )}
            </div>
            
            <div>
             { user && user.rol=="Admin" &&
                <div>
                  <label
                      className={labelStyle}>
                      Rol
                  </label>
                  <Dropdown
                    buttonText={rol}
                    action={toggleMenu} 
                    isActive={isOpenMenu} 
                    options={profileOptions}
                    showHeader={true}
                  />
                </div>
              }

                
                {errors.password && (
                    <p className="text-red-500">Password is required</p>
                )}
            </div>
            </div>

            <div className='flex flex-row space-x-[60px] items-center px-[28px]'>
                <Button onClick={() => {navigate('/login');}}>Cancelar</Button>
                <Button type="submit">Registrarse</Button>
            </div>
        </form>
        </div>
    </div>
)}
export default RegisterPage
