import React, { useEffect, useState } from 'react';

import Button from '../components/Button';
import Input from '../components/Input';

import { useNavigate } from 'react-router-dom';
import { getMedicines, updatePoints } from '../api/auth';


type MedicineData = {
    name: string;
    code: string;
    isRedeemable: boolean;
    description: string;
    presentation: string;
    pointsRequired: number;
    pointsAwarded: number;
};

const sampleMedicines = [
    {
      name: "Paracetamol Extra Fuerte",
      code: "PARA001",
      isRedeemable: true,
      description: "Analgésico y antipirético para dolor moderado",
      presentation: "Pastillas",
      pointsRequired: 500,
      pointsAwarded: 50
    },
    {
      name: "Ibuprofeno Gel",
      code: "IBU002",
      isRedeemable: true,
      description: "Antiinflamatorio tópico para dolor muscular",
      presentation: "Unguento",
      pointsRequired: 300,
      pointsAwarded: 30
    },
    {
      name: "Amoxicilina",
      code: "AMOX003",
      isRedeemable: false,
      description: "Antibiótico de amplio espectro",
      presentation: "Pastillas",
      pointsRequired: 0,
      pointsAwarded: 0
    },
    {
      name: "Dextrometorfano",
      code: "DEX004",
      isRedeemable: true,
      description: "Jarabe para la tos y resfriado común",
      presentation: "Jarabe",
      pointsRequired: 400,
      pointsAwarded: 40
    },
    {
      name: "Diclofenaco",
      code: "DIC005",
      isRedeemable: true,
      description: "Antiinflamatorio y analgésico potente",
      presentation: "Pildoras",
      pointsRequired: 600,
      pointsAwarded: 60
    }
  ];

  interface Medicine {
    name: string;
    code: string;
    isRedeemable: boolean;
    description: string;
    presentation: string;
    pointsRequired: number;
    pointsAwarded: number;
  }

const MedicineCard: React.FC<{ medicine: Medicine }> = ({ medicine }) => {
    const [pointsAwardedInput, setPointsAwardedInput] = useState('');
    const [pointsRequiredInput, setPointsRequiredInput] = useState('');


    const handleUpdateClick = async (inputValue: string) => {
        console.log(`Updating points for medicine: ${medicine.name}, Input Value: ${inputValue}`);

        // const updatedMedicineData: MedicineData = {
        //     name: medicine.name,
        //     code: medicine.code,
        //     isRedeemable: medicine.isRedeemable,
        //     description: medicine.description,
        //     presentation: medicine.presentation,
        //     pointsRequired: medicine.pointsRequired,
        //     pointsAwarded: parseInt(inputValue, 10)
        // };
        // await updatePoints(updatedMedicineData);
    };

    return (
    <div className="border border-zinc-700 rounded-lg p-4 shadow-sm bg-zinc-800 text-white">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="font-semibold text-lg">{medicine.name}</div>
          <div className="text-zinc-400 text-sm">Código: {medicine.code}</div>
        </div>
        <div className="text-sm px-2 py-1 rounded bg-zinc-700">
          {medicine.presentation}
        </div>
      </div>
      
      <div className="text-zinc-300 text-sm mb-4">{medicine.description}</div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-zinc-400">Puntos Otorgados:</span>
          <span className="text-cyan-400">{medicine.pointsAwarded} pts</span>
        </div>
        

          <div className="flex justify-between items-center text-sm">
            <span className="text-zinc-400">Puntos Requeridos:</span>
            <span className="text-cyan-400">{medicine.pointsRequired} pts</span>
          </div>
        
        
        <div className="flex items-center gap-2 pt-2">
          <Input
            placeholder="Actualizar Puntos Otorgados"
            variant="primary"
            className="max-w-[230px]"
            value={pointsAwardedInput}
            onChange={(e) => setPointsAwardedInput(e.target.value)}
          />
          <Button variant="primary" onClick={() => handleUpdateClick(pointsAwardedInput)}>
            Actualizar
          </Button>
        </div>
  
          <div className="flex items-center gap-2 pt-2">
            <Input
              placeholder="Actualizar Puntos para Canjear"
              variant="primary"
              className="max-w-[230px]"
              value={pointsRequiredInput}
              onChange={(e) => setPointsRequiredInput(e.target.value)}
            />
            <Button variant="primary" onClick={() => handleUpdateClick(pointsRequiredInput)}>
              Actualizar
            </Button>
          </div>
        
      </div>
    </div>
  );
};

const MedicinePage = () => {
    const [searchText, setSearchText] = useState('');
    const [isInProgram, setIsInProgram] = useState(true);
  

    return (
      <div className="min-h-screen bg-zinc-900 text-white">
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Medicamentos</h1>
          
          {/* Search and Filter Section */}
          <div className="space-y-4 mb-6">
            <div className="flex gap-2">
              <Input 
                placeholder="Buscar medicamentos"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                variant="primary"
                className="flex-grow"
              />
              <Button variant="primary">
                Buscar
              </Button>
            </div>
  
            <div className="flex items-center gap-2">
              <label className="flex items-center space-x-2 text-sm text-zinc-300">
                <input
                  type="checkbox"
                  checked={isInProgram}
                  onChange={(e) => setIsInProgram(e.target.checked)}
                  className="rounded bg-zinc-700 border-zinc-600"
                />
                <span>Perteneciente al programa</span>
              </label>
            </div>
          </div>
  
          {/* Scrollable Medicine List */}
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-800">
          {sampleMedicines
            .filter((medicine) => isInProgram ? medicine.isRedeemable : !medicine.isRedeemable)
            .map((medicine) => (
              <MedicineCard 
                key={medicine.code} 
                medicine={medicine}
              />
            ))}
        </div>
  
          {/* Close Button */}
          <div className="flex justify-end mt-6 pt-4 border-t border-zinc-700">
            <a href="/main" className="text-xl font-semibold bg-white text-black p-2 rounded">
                Cerrar
            </a>
            </div>
        </div>
      </div>
    );
  };
  
  export default MedicinePage;

