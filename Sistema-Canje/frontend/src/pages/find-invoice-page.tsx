import React, {useState, useEffect, useInsertionEffect} from 'react'
import Button from '../components/Button';
import { useAuth } from '../context/auth-context';
import {useNavigate, useLocation} from 'react-router-dom'
import Logo from '../images/logo-main.png'
import Dropdown from '../components/Dropdown';

export const FindInvoicePage = () => {
	const [username, setUsername] = useState<string | null>(null);
	const [password, setPassword] = useState<string | null>(null);
	const { isAuthenticated, logout, user } = useAuth();
	const navigate = useNavigate();
    
    useEffect(() => {
      if (isAuthenticated && user) {
        setUsername(user.username);
        setPassword(user.password);
      }
    }, [isAuthenticated, user]);

	const handleLogout = () => {
		logout();
		window.location.reload();
	}

  const profileOptions = [
		{ label: 'Cerrar Sesión', onClick: handleLogout },
    { label: 'Ver Perfil', onClick: handleLogout },
	];

  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const toggleMenu = () => {
		setIsOpenMenu(!isOpenMenu);
	};

return (
	<div className='text-white bg-zinc-900 flex flex-col m-auto h-screen'>
		<div className='flex flex-row justify-end items-start p-4'>
      <div className='flex flex-col w-[150px] text-center'>
        <p>{user?.username}</p>
        <p>{user?.rol}</p>
        {username && (
          <div className='flex flex-col'>
            <Dropdown
              buttonText="Opciones" 
              action={toggleMenu} 
              isActive={isOpenMenu} 
              options={profileOptions}
              showHeader={true}
            />
          </div>
        )}
      </div>
    </div>
    
    <div className="h-full">
      <h1 className="text-left text-5xl inline">Facturas</h1>
      <div className="flex text-2xl p-4 w-full h-4/5">
        {/*Filtra facturas*/}
        <div className="text-left border border-white rounded p-8 space-y-4 w-1/4">
          <div>
              <h2>Filtrar por Estado</h2>
              <label className="flex items-center mb-2">
                <input type="checkbox" className="mr-2" /> Aprobada
              </label>
              <label className="flex items-center mb-2">
                <input type="checkbox" className="mr-2" /> Rechazada
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> En espera
              </label>
          </div>
          <div className="flex flex-col space-y-2">
            <h2>Filtrar por Fecha</h2> 
            <h3 className="text-sm">Fecha más reciente</h3>
            <input type="date" className="border rounded text-black p-2"/>
            <h3 className="text-sm">Fecha más vieja</h3>
            <input type="date" className="border rounded text-black p-2"/>
          </div>
        </div>
        {/*Muestra facturas*/}
        <div className="text-left ml-4 p-4 flex flex-col space-y-2 space-x-2 w-3/4">
          <div className="text-left ml-2 p-2 flex space-x-2 w-3/4">
              <input type="text" placeholder="Buscar Facturas" className="bg-white p-2 rounded w-full"/>
              <Button className="text-xl p-4">Buscar</Button>
          </div>
          <div className="w-full">
              Facturas
          </div>
        </div>
      </div>
      {/*Botones*/}
      <div className="flex mt-4 space-x-2 justify-center">
        <Button className="text-xl p-2">Ver Factura</Button>
        <Button className="text-xl p-2">Crear Factura</Button>
      </div>
      <div className="absolute bottom-4 right-4">
        <a href="/main" className="text-xl font-semibold bg-white text-black p-2 rounded">Volver</a>
      </div>
    </div>
  </div>

);}

export default FindInvoicePage
