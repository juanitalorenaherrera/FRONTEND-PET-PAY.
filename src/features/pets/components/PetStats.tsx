// features/pets/components/PetStats.tsx

import { Activity, BarChart3, Clock, Heart, TrendingUp } from 'lucide-react';

import { useMemo } from 'react';
import { usePetsStore } from '@/store/PetStore';

export function PetStats() {
    // 1. Leemos el estado directamente del store.
    const pets = usePetsStore((state) => state.pets);
    const backendStats = usePetsStore((state) => state.stats);

    // 2. Centralizamos y memoizamos todos los cálculos derivados para eficiencia.
    const derivedStats = useMemo(() => {
        if (pets.length === 0) {
            return {
                totalPets: 0,
                activePets: 0,
                inactivePets: 0,
                uniqueSpecies: 0,
                averageAge: '0.0',
            };
        }

        const activePetsCount = pets.filter(pet => pet.active).length;
        
        return {
            totalPets: pets.length,
            activePets: activePetsCount,
            inactivePets: pets.length - activePetsCount,
            uniqueSpecies: new Set(pets.map(pet => pet.species)).size,
            averageAge: (pets.reduce((sum, pet) => sum + pet.age, 0) / pets.length).toFixed(1),
        };
    }, [pets]);

    // Priorizamos los stats del backend, pero usamos los derivados como fallback.
    const totalPets = backendStats?.totalPets ?? derivedStats.totalPets;
    const activePets = backendStats?.activePets ?? derivedStats.activePets;
    const inactivePets = backendStats?.inactivePets ?? derivedStats.inactivePets;

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h3 className="font-bold text-gray-900">Estadísticas</h3>
                    <p className="text-sm text-gray-600">Resumen de tus mascotas</p>
                </div>
            </div>
            
            <div className="space-y-3">
                {/* Total, Active, Inactive pets */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2"><Heart className="w-4 h-4 text-gray-500" /> <span className="text-sm text-gray-600">Total de mascotas:</span></div>
                    <span className="font-semibold text-gray-900">{totalPets}</span>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div> <span className="text-sm text-gray-600">Mascotas activas:</span></div>
                    <span className="font-semibold text-green-600">{activePets}</span>
                </div>
                {inactivePets > 0 && (
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2"><div className="w-2 h-2 bg-gray-400 rounded-full"></div> <span className="text-sm text-gray-600">Inactivas:</span></div>
                        <span className="font-semibold text-gray-600">{inactivePets}</span>
                    </div>
                )}

                {/* Stats calculados localmente */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2"><Activity className="w-4 h-4 text-gray-500" /> <span className="text-sm text-gray-600">Especies:</span></div>
                    <span className="font-semibold text-gray-900">{derivedStats.uniqueSpecies}</span>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-gray-500" /> <span className="text-sm text-gray-600">Edad promedio:</span></div>
                    <span className="font-semibold text-gray-900">{derivedStats.averageAge} años</span>
                </div>

                {/* Stats que solo vienen del backend */}
                {backendStats?.petsRegisteredLast30Days !== undefined && (
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-blue-500" /> <span className="text-sm text-gray-600">Nuevas (30 días):</span></div>
                        <span className="font-semibold text-blue-600">{backendStats.petsRegisteredLast30Days}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
