import { Navigate } from "react-router-dom";

const stats = [
    { id: 1, name: 'Transactions every 24 hours', value: '44 million' },
    { id: 2, name: 'Assets under holding', value: '$119 trillion' },
    { id: 3, name: 'New users annually', value: '46,000' },
  ]
  interface MedicineInfo {
    _id: string;
    availablePoints: number;
    medicineDescription: string;
    medicineId: string;
    totalPoints: number;
    usedPoints: number;
    username: string;
  }
  
  interface Data {
    user: string
    medicines: MedicineInfo[];
  }


  export default function PointsMedicine({user, medicines}: Data) {
    return (
    <div>
        <ul className="space-y-6 w-full bg-white overflow-y-auto h-96">
        {medicines.map((medicine) => (
            <li  className="space-y-2 w-full border-2 border-black" onClick={e => console.log("Hola que hace")}>
                <dl className=" p-2 grid grid-cols-1 gap-x-8 gap-y-6 text-center lg:grid-cols-1">
                    <div className="w-full text-black font-bold sm:text-5xl">
                    <p>{medicine.medicineId}</p>
                    </div>
                    <div className="gap-y-4"></div>
                    <div className="w-full justify-center text-black h-15 sm:text-2xl">
                        {medicine.medicineDescription}
                    </div>
                </dl>
                <dl className=" p-2 grid grid-cols-1 gap-x-8 gap-y-6 text-center lg:grid-cols-3">
                    <div className="flex max-w-xs flex-col gap-y-4">
                    <dt className="text-base/7 text-gray-600">Puntos Acumulados</dt>
                    <dd className="order-first text-3xl tracking-tight text-gray-900 sm:text-4xl">{medicine.totalPoints}</dd>
                    </div>
                    <div className=" flex max-w-xs flex-col gap-y-4">
                    <dt className="text-base/7 text-gray-600">Puntos usados</dt>
                    <dd className="order-first text-3xl tracking-tight text-gray-900 sm:text-4xl">{medicine.usedPoints}</dd>
                    </div>
                    <div className=" flex max-w-xs flex-col gap-y-4">
                    <dt className="text-base/7 text-gray-600">Puntos disponibles</dt>
                    <dd className="order-first text-3xl tracking-tight text-gray-900 sm:text-4xl">{medicine.availablePoints}</dd>
                    </div>
                </dl>
          </li>
        ))}

      </ul>
    </div>
      
      
            )
          }