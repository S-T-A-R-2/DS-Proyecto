import React, {useState, useEffect, useInsertionEffect} from 'react'
import Button from '../components/Button';
import { useAuth } from '../context/auth-context'
import {useNavigate} from 'react-router-dom'
import {getAllExchanges, getExchangesByUser} from '../api/auth';
import ExchangeList from '../components/ExchangesList'

export const SeeExchangesPage = () => {
	const navigate = useNavigate();
  const [loadExchanges, setLoadExchanges] = useState<boolean>(true);
	const { user } = useAuth();
  const [exchanges, setExchanges] = useState<any>([]);
  const [search, setSearch] = useState<any>([]);

  useEffect(()  => {
    
    const getAllExchangesAux = async () => {
      if (user?.rol == "Farmacia"){
        const resp = await getAllExchanges();
        setExchanges(resp.data);
      } else if (user) {
        const resp = await getExchangesByUser(user.username);
        setExchanges(resp.data);
      }
    }
    
    if (loadExchanges){
      getAllExchangesAux();
      setLoadExchanges(!loadExchanges);
    }
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
  };

    
  const handleSearch = async () => {
      const resp = await getExchangesByUser(search);
      setExchanges(resp.data);
  }
  
return (
	<div className='text-white bg-zinc-900 flex flex-col m-auto h-screen'>
      <h1 className="text-left text-5xl inline">Registros de Canjes</h1>
      {user?.rol == "Farmacia" && (
        <div className="text-left ml-2 p-2 flex space-x-2 w-3/4">
          <input  type="text" 
                      placeholder="Buscar por usuario" 
                      className="bg-white p-2 rounded w-full text-gray-800"
                      onChange={handleSearchChange}
              />        
              <Button className="text-xl p-4" onClick={handleSearch}>Buscar/Filtrar</Button>

        </div>
      )}


      {exchanges? (
            <ExchangeList exchanges={exchanges} className="w-full"></ExchangeList>
          ) : (
            <p className="text-left text-white w-full">Cargando registros de canjes ...</p>
          )
      }
      <div className="absolute bottom-4 right-4">
        <Button onClick={()=>navigate('/main')}>Volver</Button>
      </div>



  </div>
);}

export default SeeExchangesPage
