import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/Button';
import { getBenefitInfo, getChronologicalInvoices} from '../api/auth'; //getInvoices
import { useAuth } from '../context/auth-context';
import {setInvoiceState, updatePoints, createExchangeRegister, filterMedicines} from '../api/auth';
interface MedicineInfo {
    _id: string;
    availablePoints: number;
    medicineDescription: string;
    medicineId: string;
    totalPoints: number;
    usedPoints: number;
    username: string;
}

interface Invoice {
    invoiceNumber: number;
    invoiceDate: string;
    pharmacy: string;
    exchangeNumber: string | null;
}

export const RedeemPage = () => {
    const { user } = useAuth();
    const location = useLocation();
    const cliente = location.state?.user;
    const {medicineId} = useParams();
    const [medicine, setMedicine] = useState<MedicineInfo | null>(null);
    const [invoices, setInvoices] = useState<Invoice[]>([]);    
    const navigate = useNavigate();

    useEffect(() => {
        // console.log(user);
        // console.log(user?.username);

        const fetchData = async () => {
          try {
            const resp = await getBenefitInfo(cliente); 
            const points = resp.data.points;
    
            const selectedMedicine = points.find((item: MedicineInfo) => item.medicineId === medicineId);
            if (!selectedMedicine) {
              throw new Error('Medicamento no encontrado');
            }
    
            setMedicine(selectedMedicine);
            //console.log(selectedMedicine);
    
            if (!cliente) {
                console.error('User is null or undefined.');
                return;
              }

            const invoicesResponse = await getChronologicalInvoices(medicineId as string, cliente);
            console.log(invoicesResponse.data);
            setInvoices(invoicesResponse.data);

        } catch (error) {
            console.error('Error al cargar los datos:', error);
          }
        };
    
        fetchData();
      }, [medicineId]);    

      const handleRedeem = async (client: string, medicineId: string) => {
        const medicine = (await filterMedicines(medicineId, "true")).data[0];
        const redeeming_points = medicine.redeeming_points;
        let invoicesUsed:number[] = [];
        let points_given = 0;
        let i = 0;
        while ((points_given < redeeming_points) && i < invoices.length) {
          invoicesUsed.push(invoices[i].invoiceNumber);
          points_given += medicine.points_given;
          i++;
        }
        if (points_given >= redeeming_points) {
          const numExchange = (await createExchangeRegister(client, medicineId, user?.username, invoicesUsed)).data;
          await updatePoints(client, medicineId);
        }
        //updateInvoice(numExchange);
        //setInvoiceState({number:invoice.number, state:"Aprobada", username:invoice.user, medicineId:invoice.medicineId, quantity:invoice.quantity, _id:invoice._id});
      }



  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-5xl font-bold mb-6">Detalle del Medicamento</h1>
        {medicine && (
          <div className="space-y-2">
            <h2 className="text-4xl font-semibold">{medicine.medicineId}</h2>
            <p className="text-2xl">{medicine.medicineDescription}</p>
            <p className="text-2xl">Puntos requeridos para canje: {medicine.totalPoints - medicine.usedPoints}</p>
            <p className="text-2xl">Puntos acumulados: {medicine.totalPoints}</p>
            <p className="text-2xl">Puntos disponibles: {medicine.availablePoints}</p>
          </div>
        )}

        {medicine && medicine.availablePoints >= medicine.totalPoints - medicine.usedPoints ? (
          <Button variant="primary" onClick={e => handleRedeem(medicine.username, medicine.medicineId)}>
            Confirmar Canje
          </Button>
        ) : (
          <p className="text-red-500">No tienes suficientes puntos para canjear este producto.</p>
        )}

        {invoices.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-bold">Facturas Relacionadas</h3>
            <ul>
              {invoices.map((invoice) => (
                <li key={invoice.invoiceNumber} className="border-b border-gray-600 py-2">
                  <p>Factura: {invoice.invoiceNumber}</p>
                  <p>Fecha: {invoice.invoiceDate}</p>
                  <p>Farmacia: {invoice.pharmacy}</p>
                  <p>
                    Estado:{' '}
                    {invoice.exchangeNumber ? `Usado en canje #${invoice.exchangeNumber}` : 'Disponible'}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default RedeemPage;