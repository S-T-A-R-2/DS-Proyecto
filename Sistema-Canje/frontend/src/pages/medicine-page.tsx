import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import MedicineCard from '../components/MedicineCard';
import { getMedicines, filterMedicines } from '../api/auth';
import { useAuth } from '../context/auth-context';

interface Medicine {
  name: string;
  description: string;
  redeeming_points: number;
  points_given: number;
}


const MedicinePage = () => {
  const [medicinesList, setMedicines] = useState<Medicine[] | null>(null);
  const [loadMedicines, setLoadMedicines] = useState<boolean>(true);
  const [searchText, setSearchText] = useState('');
  const [isInProgram, setIsInProgram] = useState(true);
	const { user } = useAuth();
  const loadMedicinesList = async () => {
    if (loadMedicines) {
      const resp = await getMedicines();
      setMedicines(resp.data);
      setLoadMedicines(false);
    } else {
      const resp = await filterMedicines(searchText, isInProgram);
      setMedicines(resp.data);
    }
  };

  useEffect(() => {
    loadMedicinesList();
  }, []);

  useEffect(() => {
    console.log(medicinesList);
  }, [medicinesList]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleFilterMedicines = async () => {
    const resp = await filterMedicines(searchText, isInProgram);
    setMedicines(resp.data);
  };


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
              onChange={handleSearchChange}
              variant="primary"
              className="flex-grow"
            />
            <Button variant="primary" onClick={handleFilterMedicines}>
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
          {medicinesList ? (
            medicinesList.map((medicine) => (
              <MedicineCard
                key={medicine.name}
                medicine={medicine}
                reloadMedicines={loadMedicinesList}
                user={user}
              />
            ))
          ) : (
            <p className="text-left text-white w-full">Loading Medicines ...</p>
          )}
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
