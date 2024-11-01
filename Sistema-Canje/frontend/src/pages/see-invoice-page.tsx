import React, {useEffect, useState} from 'react'
import { useForm } from 'react-hook-form'
import {useNavigate, Link} from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import {createInvoice, setInvoiceState} from '../api/auth';

import Button from '../components/Button'
import Input from '../components/Input';
import Dropdown from '../components/Dropdown';

function SeeInvoice() {
	  const { isAuthenticated, logout, user } = useAuth();
    type InvoiceData = {
        number: string;
        date: string;
        pharmacy: string;
        medicine: string;
        quantity: number;
        image: string;
        state: string;
        user: string;
    };

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const [base64Image, setBase64Image] = useState<string | undefined>("https://img.icons8.com/fluent-systems-regular/512/FFFFFF/picture.png");

    const navigate = useNavigate();

    const changeImage = async (image: FileList) => {
        const file = image[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            if (typeof reader.result === "string") {
                const base64String = reader.result;
                setBase64Image(base64String); 
            }
        };
    }
    
    const invoice:InvoiceData|null = JSON.parse(localStorage.getItem('invoice') || '""');
    const [imageFlag, setImageFlag] = useState<boolean>(false);
    useEffect(() => {
      const setImage = async (image:string) => {
        setBase64Image(image);
      }
      if (!imageFlag && invoice){
        setImage(invoice.image);
        setImageFlag(true);
      }
    }, [])

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);
    
    
    // Cambiar para farmacias y medicamentos
    const [rol, setRol] = useState<string>("Cliente");

    const profileOptions = [
		    { label: 'Cliente', onClick: () => {setRol('Cliente'); setIsOpenMenu(!isOpenMenu)}},
        { label: 'Operativo', onClick: () => {setRol('Operativo'); setIsOpenMenu(!isOpenMenu)} },
        { label: 'Admin', onClick: () => {setRol('Admin'); setIsOpenMenu(!isOpenMenu)} },
	  ];

    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
    const toggleMenu = () => {
		  setIsOpenMenu(!isOpenMenu);
	  };

    const handleAceptar = ()=>{
      if (invoice) {
        setInvoiceState({number:invoice.number, state:"Aprobada"});
        navigate("/main");
      }
    };
    
    const handleRechazar = ()=>{
      if (invoice) {
        setInvoiceState({number:invoice.number, state:"Rechazada"});
        navigate("/main");
      }
    };
    
  return (
    <div className="ytd-rich-grid-renderer h-screen  justify-center text-white">
        <h1 className="text-4xl font-bold text-white p-2">Ver Factura</h1>
        
        <div className="bg-zinc-900 w-full p-5">
            <div className="flex flex-row justify-center items-center">
              <div className="min-w-[150px] p-2">
                <h2 className="text-xl font-semibold">Número de Factura</h2>
                {invoice?(
                  <p className="text-lg">{invoice.number}</p>
                  ) : (
                 <p className="text-lg">Cargando Número...</p>    
                )}                    
              </div>

              <div className="min-w-[150px] p-2">
              <h2 className="text-xl font-semibold">Fecha</h2>
                {invoice?(
                 <p className="text-lg">{invoice.date}</p>
                  ) : (
                  <p className="text-lg">Cargando Número...</p>    
                )}                    
              </div>
            </div>
            
            <div className="flex flex-row justify-center items-center">
              <div className="min-w-[150px] p-2">
                <h2 className="text-xl font-semibold">Farmacia</h2>
                {invoice?(
                  <p className="text-lg">{invoice.pharmacy}</p>
                  ) : (
                  <p className="text-lg">Cargando Farmacia...</p>    
                )}                    
              </div>
              <div className="min-w-[150px] p-2">
                <h2 className="text-xl font-semibold">Medicamento</h2>
                  {invoice?(
                  <p className="text-lg">{invoice.medicine} - {invoice.quantity} unidades</p>
                  ) : (
                  <p className="text-lg">Cargando Medicina...</p>    
                )}                    
              </div>
            </div>

            <div className="flex flex-row justify-center items-center">
              <div className="min-w-[150px] p-2">
                  <h2 className="text-xl font-semibold">Estado</h2>
                {invoice?(
                  <p className="text-lg">{invoice.state}</p>
                  ) : (
                  <p className="text-lg">Cargando Estado...</p>    
                )}                    
              </div>
              <div className="min-w-[150px] p-2">
                <h2 className="text-xl font-semibold">Cliente</h2>
                {invoice?(
                  <p className="text-lg">{invoice.user}</p>
                  ) : (
                  <p className="text-lg">Cargando Cliente...</p>    
                )}                    
              </div>
            </div>
            <div className="flex flex-row justify-center items-center">
              <img src={base64Image} width = "350"/>
            </div>
        </div>
          {(invoice && invoice.state=="EnEspera" && user && user.rol=="Operativo") && (
            <div className="p-2 justify-center flex flex-row">        
              <Button onClick={handleAceptar}> Aprobar</Button>
              <Button onClick={handleRechazar}>Rechazar</Button>
            </div>
          )}
          <div className="absolute bottom-4 right-4">
            <Button type="button" onClick={()=>navigate('/main')}>Cerrar</Button>
          </div>
    </div>
    );
}

export default SeeInvoice
