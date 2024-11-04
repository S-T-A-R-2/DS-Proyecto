import React, {useState, useEffect, useInsertionEffect} from 'react'
import Button from '../components/Button';
import InvoiceList from '../components/InvoiceList';
import { useAuth } from '../context/auth-context';
import {useNavigate} from 'react-router-dom'
import {getAllInvoices, filterInvoices} from '../api/auth';

export const FindInvoicePage = () => {
	const [username, setUsername] = useState<string | null>(null);
	const { isAuthenticated, logout, user } = useAuth();
	const navigate = useNavigate();
  type InvoiceData = {
    number: number;
    date: string;
    pharmacyId: string;
    medicineId: string;
    quantity: number;
    imageId: string;
    state: string;
    user: string;
  }
  const [stateFilter, setStateFilter] = useState({
        Aprobada: true,
        Rechazada: true,
        EnEspera: true,
  });
  const [dateRangeFilter, setDateRangeFilter] = useState<{ start?: string; end?: string } | null>(null);
  const [invoicesF, setInvoices] = useState<InvoiceData[]|null>(null);
  const [searchInvoiceNumber, setSearchInvoiceNumber] = useState<string>("");
  const [userFilter, setUserFilter] = useState<string>("");

  useEffect(() => {
    if (isAuthenticated && user) {
      setUsername(user.username);
    }
  }, [isAuthenticated, user]);

  const [loadInvoices, setLoadInvoices] = useState<boolean>(true);

  useEffect(()  => {
    const getAllInvoicesAux = async () => {
      if (user && user.rol == "Operativo"){
        const resp = await getAllInvoices();
        setInvoices(resp.data);
      } else if (user) {
        const resp = await filterInvoices(stateFilter, dateRangeFilter, searchInvoiceNumber, user.username);
        setUserFilter(user.username);
        setInvoices(resp.data);
      }
    }
    if (loadInvoices){
      getAllInvoicesAux();
      setLoadInvoices(!loadInvoices);
    }
  }, [username])
    
  const handleSearch = async () => {
      const resp = await filterInvoices(stateFilter, dateRangeFilter, searchInvoiceNumber, userFilter);
      setInvoices(resp.data);
  }

	const handleLogout = () => {
		logout();
		window.location.reload();
	};

  const profileOptions = [
		{ label: 'Cerrar Sesión', onClick: handleLogout },
    { label: 'Ver Perfil', onClick: handleLogout },
	];

  const handleInvoiceClick = (invoice:InvoiceData) => {
    localStorage.setItem('invoice', JSON.stringify(invoice));
    navigate('/see-invoice');
  }
    
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setStateFilter((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInvoiceNumber(e.target.value);
  };
  const handleUserFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserFilter(e.target.value);
  };

return (
	<div className='text-white bg-zinc-900 flex flex-col m-auto h-screen'>
		<div className="h-full">
      <h1 className="text-left text-5xl inline">Facturas</h1>
      <div className="flex text-2xl p-4 w-full h-4/5">
        {/*Filtra facturas*/}
        <div className="text-left border border-white rounded p-8 space-y-4 w-1/4">
          <div>
              <h2>Filtrar por Estado</h2>
              <label className="flex items-center mb-2">
                <input  type="checkbox" 
                        className="mr-2"
                        name="Aprobada"
                        checked={stateFilter.Aprobada}
                        onChange={handleCheckboxChange}
                /> 
                Aprobada
              </label>
              <label className="flex items-center mb-2">
                <input  type="checkbox" 
                        className="mr-2"
                        name="Rechazada"
                        checked={stateFilter.Rechazada}
                        onChange={handleCheckboxChange}
                /> 
                Rechazada
              </label>
              <label className="flex items-center">
                <input  type="checkbox" 
                        className="mr-2" 
                        name="EnEspera"
                        checked={stateFilter.EnEspera}
                        onChange={handleCheckboxChange}
                />
                En espera
              </label>
          </div>
          <div className="flex flex-col space-y-2">
            <h2>Filtrar por Fecha</h2> 
            <h3 className="text-sm">Fecha más reciente</h3>
            <input  type="date" 
                    className="border rounded text-black p-2"
                    onChange={(e) => setDateRangeFilter(prev => ({ ...prev, start: e.target.value }))}
            />
              
            <h3 className="text-sm">Fecha más vieja</h3>
            <input  type="date" 
                    className="border rounded text-black p-2"
                    onChange={(e) => setDateRangeFilter(prev => ({ ...prev, end: e.target.value }))}
            />
          </div>
          { user?.rol == "Operativo" && (
            <div className="flex flex-col space-y-2">
              <h2>Filtrar por Nombre de Usuario</h2> 
              <input  type="text" 
                placeholder="Nombre de Usuario" 
                className="bg-white p-2 rounded w-full text-gray-800"
                onChange={handleUserFilter}
              /> 
            </div>
          )}
        </div>
        {/*Muestra facturas*/}
        <div className="text-left ml-4 p-4 flex flex-col space-y-2 space-x-2 w-3/4">
          <div className="text-left ml-2 p-2 flex space-x-2 w-3/4">
              <input  type="text" 
                      placeholder="Buscar Facturas por número" 
                      className="bg-white p-2 rounded w-full text-gray-800"
                      onChange={handleSearchChange}
              />        
              <Button className="text-xl p-4" onClick={handleSearch}>Buscar/Filtrar</Button>
          </div>
          {invoicesF ? (
            <InvoiceList onclick={handleInvoiceClick} invoices={invoicesF} className="w-full"></InvoiceList>
          ) : (
            <p className="text-left text-white w-full">Loading Invoices ...</p>
          )}
        </div>
      </div>
      {/*Botones*/}
      <div className="flex mt-4 space-x-2 justify-center">
        <Button className="text-xl p-2" onClick={()=>navigate('/register-invoice', {state: {username: user?.username}})}>Crear Factura</Button>
      </div>
      <div className="absolute bottom-4 right-4">
        <Button onClick={()=>navigate('/main')}>Volver</Button>
      </div>
    </div>
  </div>

);}

export default FindInvoicePage