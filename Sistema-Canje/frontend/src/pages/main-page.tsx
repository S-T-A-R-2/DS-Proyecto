import React, {useState, useEffect, useInsertionEffect} from 'react'
import { Button, Input } from '../components/Templates';
import { useAuth } from '../context/auth-context';
import {useNavigate, useLocation} from 'react-router-dom'
import { User } from '../logic/classes/User'
//import { getRecommendations, getBlog, getBlogsUser } from '../api/auth.js';

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
	<div className='text-white bg-zinc-800 flex  flex-col m-auto h-screen'>
		<h1 className="text-4xl">Página principal 🏠</h1>
		<h1 className= "text-3xl">Usuario:</h1>
        <h1 className= "text-3xl">{username}</h1>

		<div className="absolute top-0 right-0 ide-sm hide-md mb-1 d-flex flex-justify-between flex-items-center">
			
			{!isAuthenticated && (
			<a href="/login" className="group block w-30 h-25 text-black rounded-lg p-2 bg-white shadow-lg hover:bg-sky-500">					
				<h3 className="flex space-x-3text-slate-900 group-hover:text-white text-sm font-semibold inline text-center">🚪 Login</h3>	
			</a> )}

      {username && (
        <button onClick={handleLogout}  className="group block w-50 h-25 text-black rounded-lg p-2 bg-white shadow-lg hover:bg-sky-500">					
          <h3 className="flex space-x-3text-slate-900 group-hover:text-white text-sm font-semibold inline text-center">🚪 Logout</h3>	
        </button>
      )}
		</div>
		
  { username && (
    <div className='relative top-[100px]'>
        <p className='text-[40px] px-4'>Opciones</p>
        <div className='relative py-4 px-4 flex flex-row'>
            <a href="/newBlog" 
                className="group block w-[150px] text-black rounded-lg p-2 bg-white shadow-lg hover:bg-sky-500">
                <h3 className="flex space-x-3 text-slate-900 group-hover:text-white text-[17px] font-semibold inline text-center">📂 Nuevo Blog</h3>	
            </a>
            <button 
                onClick={e => navigate("/searchBlog",{state:{user:user}})} 
                className="group block w-[150px] text-black rounded-lg p-2 bg-white shadow-lg hover:bg-sky-500">					
  				<h3 className="flex space-x-3 text-slate-900 group-hover:text-white text-[17px] font-semibold inline text-center">🔎 Buscar Blog</h3>
			</button>

            <a onClick={() => {localStorage.setItem('user', JSON.stringify(user));}}
                className="group block w-[150px] text-black rounded-lg p-2 bg-white shadow-lg hover:bg-sky-500">					
                <h3 className="flex space-x-3 text-slate-900 group-hover:text-white text-[17px] font-semibold inline text-center">🚪 Ver perfil</h3>	
            </a>
        </div>
	</div>
  )}

  </div>

);
}
export default MainPage
