import React, {useState, useEffect, useInsertionEffect} from 'react'
import Button from '../components/Button';
import { useAuth } from '../context/auth-context';
import {useNavigate, useLocation} from 'react-router-dom'
import Logo from '../images/logo-main.png'
import Dropdown from '../components/Dropdown';

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

  const profileOptions = [
		{ label: 'Cerrar Sesión', onClick: handleLogout },
    { label: 'Ver Perfil', onClick: handleLogout },
	];

  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const toggleMenu = () => {
		setIsOpenMenu(!isOpenMenu);
	};

return (
	<div className='text-white bg-zinc-900 flex flex-col m-auto h-screen max-w-[800px]'>
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
    <div className='flex flex-col items-center justify-center'>
      <h1 className="text-4xl">Beneficios</h1>
      <img src={Logo} className="w-20 rounded-md shadow-lg py-8"/>
      
      <div className='flex flex-col space-y-[10px] py-[50px]'>
        {(user && user.rol!="Admin") &&    
          <Button onClick={() => {navigate('/find-invoice')}}>Buscar Factura</Button>
        }
        {user?.rol == 'Cliente' && (
          <div>
            <Button onClick={() => {navigate('/register-invoice')}}>Registrar Factura</Button>
          </div>
        )}
        {user?.rol == 'Admin' && (
          <div>
            <Button onClick={() => {navigate('/medicine')}}>Ver Medicamentos</Button>
          </div>
        )}

        {user?.rol == 'Admin' && (
          <div>
            <Button onClick={() => {navigate('/register', {state: {user : user}})}}>Registrar Usuario</Button>
          </div>
        )}
      </div>

    </div>
  </div>

);}

export default MainPage
