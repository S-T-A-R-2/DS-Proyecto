import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/Button';
import { getBenefitInfo, getChronologicalInvoices} from '../api/auth'; //getInvoices
import { useAuth } from '../context/auth-context';

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
    invoiceNumber: string;
    invoiceDate: string;
    pharmacy: string;
    usedInExchange: string | null;
}

export const RedeemPage = () => {
    //const { user } = useAuth();
    const location = useLocation();
    const user = location.state?.user;
    const {medicineId} = useParams();
    const [medicine, setMedicine] = useState<MedicineInfo | null>(null);
    const [invoices, setInvoices] = useState<Invoice[]>([]);    
    const navigate = useNavigate();

    useEffect(() => {
        // console.log(user);
        // console.log(user?.username);

        const fetchData = async () => {
          try {
            const resp = await getBenefitInfo(user); 
            const points = resp.data.points;
    
            const selectedMedicine = points.find((item: MedicineInfo) => item.medicineId === medicineId);
            if (!selectedMedicine) {
              throw new Error('Medicamento no encontrado');
            }
    
            setMedicine(selectedMedicine);
            //console.log(selectedMedicine);
    
            if (!user) {
                console.error('User is null or undefined.');
                return;
              }

            const invoicesResponse = await getChronologicalInvoices(medicineId as string, user);
            console.log(invoicesResponse.data);
            setInvoices(invoicesResponse.data);

            // const exchangeResponse = await getInvoicesByCriteria('joseUsuario', 'exchange', '1');
            // console.log('Facturas de canje:', exchangeResponse.data.invoices);

            // const invoicesResponse = await getUserInvoicesByMedicine(user?.username, medicineId);
            // console.log(invoicesResponse.data.invoices);
            // setInvoices(invoicesResponse.data.invoices);
            
            // const testInvoices: Invoice[] = [
            //     {
            //       number: "123",
            //       date: "2024-01-01",
            //       pharmacy: "Farmacia Sucre",
            //       usedInExchange: null
            //     },
            //     {
            //       number: "124",
            //       date: "2024-01-02",
            //       pharmacy: "Farmacia Central",
            //       usedInExchange: "1"
            //     },
            //                     {
            //       number: "124",
            //       date: "2024-01-02",
            //       pharmacy: "Farmacia Central",
            //       usedInExchange: "1"
            //     },
            //     {
            //       number: "125",
            //       date: "2024-02-01",
            //       pharmacy: "Farmacia Ahorro",
            //       usedInExchange: null
            //     }
            //   ];
            //   //setInvoices(testInvoices);
            
    
        } catch (error) {
            console.error('Error al cargar los datos:', error);
          }
        };
    
        fetchData();
      }, [medicineId]);    

      const handleRedeem = async () => {}



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
          <Button variant="primary" onClick={handleRedeem}>
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
                    {invoice.usedInExchange ? `Usado en canje #${invoice.usedInExchange}` : 'Disponible'}
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