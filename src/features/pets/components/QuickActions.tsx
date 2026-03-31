// features/pets/components/QuickActions.tsx - Versión Refactorizada

import { Calendar, Heart, Plus, Search, Settings } from 'lucide-react';

import { useNavigate } from 'react-router';

// 1. LAS PROPS SE ELIMINAN. El componente ya no las necesita.
export function QuickActions() {
    // 2. OBTENEMOS LAS ACCIONES Y NAVEGACIÓN DESDE HOOKS.
    const navigate = useNavigate();


    // 3. EL ARRAY DE ACCIONES AHORA USA LAS FUNCIONES DE LOS HOOKS.
    //    Está completamente auto-contenido.
    const actions = [
        {
            icon: Plus,
            title: 'Agregar Mascota',
            description: 'Registra un nuevo compañero',
            onClick: () => navigate('/dashboard/add-pet'),
        },
        {
            icon: Calendar,
            title: 'Agendar Cita',
            description: 'Programa un servicio',
            onClick: () => navigate('/dashboard/bookings/new'),
        },
        {
            icon: Search,
            title: 'Buscar Cuidadores',
            description: 'Encuentra el ideal',
            onClick: () => navigate('/dashboard/find-sitters'),
        },
        {
            icon: Heart,
            title: 'Chequeo de Salud',
            description: 'Revisar estado general',
            onClick: () => navigate('/dashboard/care'),
        },
        {
            icon: Settings,
            title: 'Configuración',
            description: 'Personalizar perfil',
            onClick: () => navigate('/dashboard/settings'),
        }
    ];

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Acciones Rápidas</h3>
            <div className="space-y-3">
                {actions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                        <button 
                            key={index}
                            onClick={action.onClick}
                            // La acción de deshabilitar ahora depende de si la función existe
                            disabled={!action.onClick}
                            className={`w-full flex items-center gap-3 p-3 text-left rounded-lg transition-colors duration-200 group disabled:opacity-50 disabled:cursor-not-allowed ...`}
                        >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ...`}>
                                <Icon className={`w-4 h-4 ...`} />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">{action.title}</p>
                                <p className="text-xs text-gray-600">{action.description}</p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
