import React, {useEffect, useState} from 'react'
import { useForm } from 'react-hook-form'
import {useNavigate, Link, useLocation} from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import {createInvoice, getAllPharmacies, getMedicines } from '../api/auth';

import Button from '../components/Button'
import Input from '../components/Input';
import Dropdown from '../components/Dropdown';



function CreateInvoice() {

    interface DropdownOption {
        label: string;
        onClick?: () => void;
    }

    type FormData = {
        number: number;
        date: string;
        pharmacy: string;
        medicine: string;
        quantity: number;
        imageL: FileList;
    };

    type InvoiceData = {
        username: string
        number: number;
        date: string;
        pharmacy: string;
        medicine: string;
        quantity: number;
        image: string;
        state: string;
    };

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const [pharmacyV, setPharmacy] = useState<string>("");
    const [isPharmacyMenu, setIsPharmacyMenu] = useState<boolean>(false);
    const [loadedPharmacies, setLoadedPharmacies] = useState<boolean>(false);
    const [pharmacyOptions, setPharmacyOptions] = useState<DropdownOption[]>([]);

    const [medicineV, setMedicine] = useState<string>("");
    const [isMedicineMenu, setIsMedicineMenu] = useState<boolean>(false);
    const [loadedMedicines, setLoadedMedicines] = useState<boolean>(false);
    const [medicineOptions, setMedicineOptions] = useState<DropdownOption[]>([]);

    const [state, setState] = useState<string>("EnEspera");
    const [isStateMenu, setIsStateMenu] = useState<boolean>(false);

    const [username, setUsername] = useState<string>("");
    const [rol, setRol] = useState<string | null>(null);
    

    const [base64Image, setBase64Image] = useState<string | undefined>("https://img.icons8.com/fluent-systems-regular/512/FFFFFF/picture.png");

    const {signIn, isAuthenticated, user, errors: loginErrors = []} = useAuth();
    const navigate = useNavigate();

    const togglePharmacy = () => {
        setIsPharmacyMenu(!isPharmacyMenu);
    }

    useEffect(() => {
        if (isAuthenticated && user) {
            setUsername(user.username);
            setRol(user.rol);
        }
    })

    const stateOptions = [
		{ label: 'Aprobada', onClick: () => {setState('Aprobada'); setIsStateMenu(!isStateMenu)}},
        { label: 'Rechazada', onClick: () => {setState('Rechazada'); setIsStateMenu(!isStateMenu)} },
        { label: 'EnEspera', onClick: () => {setState('EnEspera'); setIsStateMenu(!isStateMenu)} },
	];
    

    const loadPharmacies = async () => {
        try {
            const response = await getAllPharmacies();
            const options = response.data.map((option: any) => ({
                label: option.name,
                onClick: () => {
                    setPharmacy(option.name);
                    setIsPharmacyMenu(!isPharmacyMenu);
                }
            }));
            setPharmacyOptions(options);
            setPharmacy(response.data[0].name);
        } catch (error: any) {
            console.log(error.message);
        }
    }


    const loadMedicines = async () => {
        try {
            const response = await getMedicines();
            const options = response.data.map((option: any) => ({
                label: option.name,
                onClick: () => {
                    setMedicine(option.name);
                    setIsMedicineMenu(!isMedicineMenu);
                }
            }));
            setMedicineOptions(options);
            setMedicine(response.data[0].name);
        } catch (error: any) {
            console.log(error.message);
        }
    }
    
    const toggleMedicine = () => {
        setIsMedicineMenu(!isMedicineMenu);
    }

    const toggleState = () => {
        setIsStateMenu(!isStateMenu);
    }

    useEffect(() => {
        if (!loadedPharmacies) {
            loadPharmacies();
            setLoadedPharmacies(true);
        }
        if (!loadedMedicines) {
            loadMedicines();
            setLoadedMedicines(true);
        }
    }, []);
    
    const onSubmit = handleSubmit(async (data: FormData) => {
        if (user == undefined) {
            alert("No se detectó el usuario");
        } else{
            const {number, date, quantity, imageL} = data;
            const medicine: string = medicineV;
            const pharmacy: string = pharmacyV;
            const file = imageL[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            let image: string;
            reader.onloadend = async () => {
                if (typeof reader.result === "string") {
                    image = reader.result;
                    setBase64Image(image); 
                    
                }
                rol == 'Cliente' ? setState("EnEspera"): setState(state);
                const invoiceData: InvoiceData = {
                    username,
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
        }
        
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
                        type="number"
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
                        buttonText={pharmacyV}
                        action={togglePharmacy} 
                        isActive={isPharmacyMenu} 
                        options={pharmacyOptions}
                        showHeader={true}
                    />
                    

                    {errors.pharmacy &&  (
                        <p className="text-red-500">Debe ingresar una farmacia</p>
                    )}
                </div>
                <div className="w-1/3 min-w-[150px] p-2">
                    <label 
                        className="text-sm font-medium text-white mb-1" htmlFor="Medicamento">
                        Agregar Medicamento
                    </label>

                    <Dropdown
                        buttonText={medicineV}
                        action={toggleMedicine} 
                        isActive={isMedicineMenu} 
                        options={medicineOptions}
                        showHeader={true}
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
                {rol == 'Admin' && (
                <div className="w-1/3 min-w-[150px] p-2">
                    <label 
                        className="text-sm font-medium text-white mb-1" htmlFor="inputPass">
                        Estado
                    </label>
                    <Dropdown
                        buttonText={state}
                        action={toggleState} 
                        isActive={isStateMenu} 
                        options={stateOptions}
                        showHeader={true}
                    />
                    { (
                        <p className="text-red-500">Debe ingresar el estado</p>
                    )}
                </div>)} { rol == 'Cliente' && 
                    <div className="w-1/3 min-w-[150px] p-2"></div>
                }
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
