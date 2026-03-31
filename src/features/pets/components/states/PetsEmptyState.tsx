// features/pets/components/states/PetsEmptyState.tsx

import { Heart, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function PetsEmptyState() {
    const navigate = useNavigate();

    return (
        <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-gray-400" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">
                Aún no tienes mascotas registradas
            </h4>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Registra a tu primer compañero para gestionar su cuidado, agendar citas y mucho más.
            </p>
            <button
                onClick={() => navigate('/dashboard/add-pet')}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 flex items-center gap-2 mx-auto"
            >
                <Plus className="w-5 h-5" />
                Registrar mi primera mascota
            </button>
        </div>
    );
}
