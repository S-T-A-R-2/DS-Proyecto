import React, { HTMLAttributes, useState } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import Button from './Button';
import Input from './Input';
import { updateRedeemPoints, updateGivenPoints } from '../api/auth';

interface Medicine {
    name: string;
    description: string;
    redeeming_points: number;
    points_given: number;
}

interface MedicineCardProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof medicineCardVariants> {
    medicine: Medicine;
    reloadMedicines: () => void;
    user:any;
}  

const medicineCardVariants = cva('border border-zinc-700 rounded-lg p-4 shadow-sm bg-zinc-800 text-white', {
    variants: {
      variant: {
        primary: 'bg-zinc-800 text-white',
        secondary: 'bg-white text-black',
      },
      size: {
        sm: 'text-sm p-2',
        md: 'text-base p-4',
        lg: 'text-lg p-6',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  });

export default function MedicineCard({ medicine, reloadMedicines, className, variant, size, user, ...props }: MedicineCardProps) {
    const [pointsAwardedInput, setPointsAwardedInput] = React.useState('');
    const [pointsRequiredInput, setPointsRequiredInput] = React.useState('');
    const [error, setError] = useState<string | null>(null);
    
    const handleUpdateClick = async (inputValue: string, updateFunction: (medicine: Medicine) => Promise<any>, key: 'points_given' | 'redeeming_points') => {
        if (!inputValue || isNaN(Number(inputValue)) || Number(inputValue) < 0) {
            setError('Número de puntos inválido');
            return;
        }
        setError(null);
        //console.log(`Updating points for medicine: ${medicine.name}, Input Value: ${inputValue}`);

        try {
            await updateFunction({ ...medicine, [key]: Number(inputValue) });
            reloadMedicines();
        } catch (error) {
            setError('Error al actualizar los puntos');
        }

    };
  
    return (
      <div
        className={twMerge(
          clsx(
            medicineCardVariants({ variant, size, className })
          )
        )}
        {...props}
      >
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="font-semibold text-lg">{medicine.name}</div>
          </div>
        </div>
        
        <div className="text-zinc-300 text-sm mb-4">{medicine.description}</div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-zinc-400">Puntos Otorgados:</span>
            <span className="text-cyan-400">{medicine.points_given} pts</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-zinc-400">Puntos Requeridos para Canjear:</span>
            <span className="text-cyan-400">{medicine.redeeming_points} pts</span>
          </div>

          { user?.rol == "Admin" && (<div>
            <div className="flex items-center gap-2 pt-2">
              <Input
                placeholder="Actualizar Puntos Otorgados"
                variant="primary"
                className="max-w-[230px]"
                value={pointsAwardedInput}
                onChange={(e) => setPointsAwardedInput(e.target.value)}
              />
              <Button variant="primary" onClick={() => handleUpdateClick(pointsAwardedInput, updateGivenPoints, 'points_given')}>
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
              <Button variant="primary" onClick={() => handleUpdateClick(pointsRequiredInput, updateRedeemPoints, 'redeeming_points')}>
                Actualizar
              </Button>
            </div>
          </div>)}
           {error && <div className="text-red-500 text-sm">{error}</div>}
        </div>
      </div>
    );
  }
