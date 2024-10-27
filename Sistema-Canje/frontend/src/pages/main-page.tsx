import React, {useState, useEffect, useInsertionEffect} from 'react'
import Button from '../components/Button';
import { useAuth } from '../context/auth-context';
import {useNavigate, useLocation} from 'react-router-dom'
import Logo from '../images/logo-main.png'

export const MainPage = () => {
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

return (
	<div className='text-white bg-zinc-800 flex flex-col m-auto h-screen'>
		<div className='flex flex-row justify-end items-start p-4'>
      <div className='flex flex-col w-[150px] text-center'>
        <p>{user?.username}</p>
        <p>{user?.rol}</p>
        {username && (
          <div className='flex flex-col'>
            <Button onClick={() => {localStorage.setItem('user', JSON.stringify(user));}}>
              <h3 className="flex space-x-3text-slate-900 group-hover:text-white text-sm font-semibold inline text-center">Ver perfil</h3>	
            </Button>
            <Button onClick={handleLogout}>
              <h3 className="flex space-x-3text-slate-900 group-hover:text-white text-sm font-semibold inline text-center">🚪 Cerrar Sesión</h3>	
            </Button>
          </div>
        )}
      </div>
    </div>
    <div className='flex flex-col items-center justify-center'>
      <h1 className="text-4xl">Beneficios</h1>
      <img src={Logo} className="w-20 rounded-md shadow-lg"/>
      
      <div className='flex flex-col space-y-[10px] py-[50px]'>
        <Button>Buscar Factura</Button>
        <Button>Registrar Factura</Button>
        {user?.rol == 'Cliente' && (
          <div>
            <Button>Ver Puntos</Button>
          </div>
        )}

        {user?.rol == 'Admin' && (
          <div>
            <Button>Registrar Usuario</Button>
            <Button>Buscar Factura</Button>
          </div>
        )}
      </div>

    </div>
  </div>

);}

export default MainPage
