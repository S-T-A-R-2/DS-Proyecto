import React, {useEffect, useState} from 'react'
import { useForm } from 'react-hook-form'
import {useNavigate, Link} from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import {createInvoice} from '../api/auth';

import Button from '../components/Button'
import Input from '../components/Input';
import Dropdown from '../components/Dropdown';

function CreateInvoice() {
    type FormData = {
        number: string;
        date: string;
        pharmacy: string;
        medicine: string;
        quantity: number;
        imageL: FileList;
        state: string;
    };

    type InvoiceData = {
        number: string;
        date: string;
        pharmacy: string;
        medicine: string;
        quantity: number;
        image: string;
        state: string;
    };

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const [pharmacy, setPharmacy] = useState<string | undefined>(undefined);
    const [isPharmacyMenu, setIsPharmacyMenu] = useState<boolean>(false);
    
    let pharmaciesOptions: unknown[] =[];

    const [base64Image, setBase64Image] = useState<string | undefined>("https://img.icons8.com/fluent-systems-regular/512/FFFFFF/picture.png");

    const {signIn, isAuthenticated, errors: loginErrors = []} = useAuth();
    const navigate = useNavigate();

    const togglePharmacy = () => {
        setIsPharmacyMenu(!isPharmacyMenu);
    }
    
    const onSubmit = handleSubmit(async (data: FormData) => {
        const {number, date, pharmacy, medicine, quantity, imageL, state} = data;
        const file = imageL[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        let image: string;
        reader.onloadend = async () => {
            if (typeof reader.result === "string") {
                image = reader.result;
                setBase64Image(image); 
                
            }
            const invoiceData: InvoiceData = {
                number,
                date,
                pharmacy,
                medicine,
                quantity,
                image,
                state
            };
            try {
                console.log(invoiceData);
                await createInvoice(invoiceData);
            } catch (error: any){
                console.log(error.message);
            }
        };
        
        
    });


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
                        {...register("number", { required: true })}
                        placeholder="Ingrese el número de factura ..."
                    />

                    {errors.number && (
                        <p className="text-red-500">Debe ingresar el número de factura</p>
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
                        {...register("date", { required: true })}
                    />

                    {errors.date && (
                        <p className="text-red-500">Debe ingresar una fecha</p>
                    )}
                </div>
                <div className="w-1/3 min-w-[150px] p-2">
                    <label 
                        className="text-sm font-medium text-white mb-1" htmlFor="inputFarmacia">
                        Farmacia
                    </label>
                    
                    <Dropdown
                        buttonText={rol}
                        action={toggleMenu} 
                        isActive={isOpenMenu} 
                        options={profileOptions}
                        showHeader={true}
                    />

                    <Input 
                        id="inputFarmacia"
                        type="text"
                        {...register("pharmacy", { required: true })}
                        placeholder="Ingrese ..."
                    />
                    

                    {/*errors.*/  (
                        <p className="text-red-500">Debe ingresar una farmacia</p>
                    )}
                </div>
                <div className="w-1/3 min-w-[150px] p-2">
                    <label 
                        className="text-sm font-medium text-white mb-1" htmlFor="Medicamento">
                        Agregar Medicamento
                    </label>

                    <Input 
                        id='inputMedicamento'
                        type="text"
                        {...register("medicine", { required: true })}
                    />
                    <Input 
                        id='inputCantidad'
                        type="number"
                        {...register("quantity", { required: true })}
                        placeholder="Ingrese la cantidad ..."
                    />
                    
                    {errors.medicine && errors.quantity && (
                        <p className="text-red-500">Debe ingresar un medicamento y una cantidad</p>
                    )}
                </div>
                <div className="w-1/3 min-w-[150px] p-2">
                    <label 
                        className="text-sm font-medium text-white mb-1" htmlFor="inputImagen">
                        Agregar Imagen
                    </label>

                    <Input 
                        id='inputImagen'
                        type="file"
                        {...register("imageL", { required: true, onChange:(e)=>{changeImage(e.target.files)} })}
                    />
                    
                    {errors.imageL && (
                        <p className="text-red-500">Debe ingresar la foto de la factura</p>
                    )}
                </div>
                <div className="w-1/3 min-w-[150px] p-2">
                    <label 
                        className="text-sm font-medium text-white mb-1" htmlFor="inputPass">
                        Estado
                    </label>

                    <Input 
                        id='inputPass'
                        type="text"
                        {...register("state", { required: true })}
                        placeholder="Ingrese el estado ..."
                    />
                    
                    {errors.state && (
                        <p className="text-red-500">Debe ingresar el estado</p>
                    )}
                </div>
                    <img src={base64Image} width = "350"/>
                    <div >
                        <Button type="submit" onSubmit={onSubmit}>Crear Factura</Button>
                    </div>
                    <div className="w-1/3 min-w-[150px] p-2">
                        <Button type="button" onClick={()=>navigate('/main')}>Cerrar</Button>
                    </div>
            </form>

        </div>

    </div>
    );
}

export default CreateInvoice
