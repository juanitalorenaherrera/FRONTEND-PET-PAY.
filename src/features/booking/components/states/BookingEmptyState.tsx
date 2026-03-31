// features/booking/components/states/BookingsEmptyState.tsx

import { CalendarSearch } from 'lucide-react';
import { useNavigate } from 'react-router';

export function BookingsEmptyState() {
    const navigate = useNavigate();

    return (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <CalendarSearch className="w-10 h-10 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Aún no tienes citas programadas
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                    Encuentra un cuidador de confianza y agenda tu primer servicio para empezar a gestionar todo desde aquí.
                </p>
                <button 
                    onClick={() => navigate('/dashboard/find-sitters')}
                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 font-medium"
                >
                    Buscar Cuidadores
                </button>
            </div>
        </div>
    );
}
