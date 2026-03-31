// features/pets/components/PetsHeader.tsx

import { Heart, Plus, RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { useAuthStore } from '../../../store/AuthStore';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePetsActions } from '../hooks/usePetsActions';
import { usePetsStore } from '../../../store/PetStore';

export function PetsHeader() {

    const isLoading = usePetsStore((state) => state.isLoading);

    const pets = usePetsStore((state) => state.pets);

    const { refreshPets } = usePetsActions();
    const navigate = useNavigate();

    const totalActivePets = useMemo(() => pets.filter(p => p.active).length, [pets]);
    
    const pluralSuffix = totalActivePets !== 1 ? 's' : '';

    const user = useAuthStore((state) => state.profile);

    const handleRefresh = () => {
        if (user?.accountId) {
            refreshPets(user.accountId);
        }
    };

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Mis Mascotas
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        {totalActivePets > 0 
                            ? `${totalActivePets} mascota${pluralSuffix} activa${pluralSuffix}` 
                            : 'Gestiona tus mascotas'}
                    </p>
                </div>
            </div>
            
            <div className="flex items-center gap-3">
                <Button 
                    variant="ghost"
                    size="sm"
                    onClick={handleRefresh}
                    disabled={isLoading}
                    title="Actualizar mascotas"
                >
                    <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                </Button>
                
                <Button 
                    onClick={() => navigate('/dashboard/add-pet')}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                    <Plus className="w-4 h-4" />
                    <span className="font-medium">Agregar</span>
                </Button>
            </div>
        </div>
    );
}
