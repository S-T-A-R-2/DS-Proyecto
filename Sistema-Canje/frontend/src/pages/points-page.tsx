import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import PointsMedicine from '../components/PointsMedicine';
import { getBenefitInfo } from '../api/auth';
import { useAuth } from '../context/auth-context';
import {useNavigate} from 'react-router-dom';
import {setInvoiceState, updatePoints} from '../api/auth';
interface UserInfo {
  email: string;
  name: string;
  phone: string;
  username: string;
}

interface MedicineInfo {
  _id: string;
  availablePoints: number;
  medicineDescription: string;
  medicineId: string;
  totalPoints: number;
  usedPoints: number;
  username: string;
}

interface TotalInfo {
  totalMedicines: number;
  totalPoints: number;
  usedPoints: number;
  availablePoints: number;
}

const MedicinePage = () => {
  const [medicinesList, setMedicines] = useState<MedicineInfo[] | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [totalInfo, setTotalInfo] = useState<TotalInfo | null>(null);
  const [searchText, setSearchText] = useState('');
	const { user } = useAuth();
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearchByUser = async () => {
    try {
      const resp = await getBenefitInfo(searchText);
      const points = resp.data.points;
      const user = resp.data.user;
      setMedicines(points);
      setUserInfo(user);

      const totalMedicines = points.length;
      let totalPoints = 0;
      let usedPoints = 0;
      let availablePoints = 0;
      for (let i in points) {
        totalPoints += points[i].totalPoints;
        usedPoints += points[i].usedPoints;
        availablePoints += points[i].availablePoints;
      }
      setTotalInfo({
        totalMedicines,
        totalPoints,
        usedPoints,
        availablePoints
      })
    } catch (error: any) {
      alert ("No se encontró el cliente");
      console.log(error.message);
    }
  };

  function exchange(user: any, medicine: any, farmacy: any){
    //const numExchange = createExchangeRegister(user, medicine, farmacy).data;
    //updateInvoice(numExchange);
    //setInvoiceState({number:invoice.number, state:"Aprobada", username:invoice.user, medicineId:invoice.medicineId, quantity:invoice.quantity, _id:invoice._id});
    updatePoints(user.username, medicine.id);
  }


  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Medicamentos</h1>
        
        {/* Search and Filter Section */}
        <div className="space-y-4 mb-6">
          <div className="flex gap-2">
            <Input 
              placeholder="Buscar por usuario"
              value={searchText}
              onChange={handleSearchChange}
              variant="primary"
              className="flex-grow"
            />
            <Button variant="primary" onClick={handleSearchByUser}>
                Buscar medicamentos por usuario
            </Button>
          </div>
        </div>

        {/* Scrollable Medicine List */}
          {medicinesList && userInfo ? (
              <PointsMedicine
                user={userInfo.username}
                medicines={medicinesList}
              />
            
          ) : (
            <p className="text-left text-white w-full">Cargando Medicinas ...</p>
          )}
        {medicinesList && (
          <div>
          <br></br>
          <dl className="bg-white p-2 grid grid-cols-1 gap-x-8 gap-y-6 text-center lg:grid-cols-1">
                    <div className="w-full text-black font-bold sm:text-5xl">
                    <p>Total</p>
                    </div>
                </dl>
                <dl className=" bg-white p-2 grid grid-cols-1 gap-x-8 gap-y-6 text-center lg:grid-cols-4">
                    <div className="flex max-w-xs flex-col gap-y-4">
                      <dt className="text-base/7 text-gray-600">Medicamentos Acumulados</dt>
                      <dd className="order-first text-3xl tracking-tight text-gray-900 sm:text-4xl">{totalInfo?.totalMedicines}</dd>
                    </div>
                    <div className="flex max-w-xs flex-col gap-y-4">
                      <dt className="text-base/7 text-gray-600">Puntos Acumulados</dt>
                      <dd className="order-first text-3xl tracking-tight text-gray-900 sm:text-4xl">{totalInfo?.totalPoints}</dd>
                    </div>
                    <div className=" flex max-w-xs flex-col gap-y-4">
                      <dt className="text-base/7 text-gray-600">Puntos usados</dt>
                      <dd className="order-first text-3xl tracking-tight text-gray-900 sm:text-4xl">{totalInfo?.usedPoints}</dd>
                    </div>
                    <div className=" flex max-w-xs flex-col gap-y-4">
                      <dt className="text-base/7 text-gray-600">Puntos disponibles</dt>
                      <dd className="order-first text-3xl tracking-tight text-gray-900 sm:text-4xl">{totalInfo?.availablePoints}</dd>
                    </div>
                </dl>
              </div>)}
        {/* Close Button */}
        <div className="absolute bottom-4 right-4">
            <Button type="button" onClick={()=>navigate('/main')}>Cerrar</Button>
            <Button type="button" onClick={()=>navigate('/main')}>Canjear</Button>
          </div>
      </div>
    </div>
  );
};


export default MedicinePage;
