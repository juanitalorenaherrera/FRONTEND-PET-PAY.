// features/pets/components/profile/PetMedicalTab.tsx

import { AlertTriangle, Heart, Pill } from 'lucide-react';

import type { Pet } from '@/features/pets/types';

// ====================================================================
// SUB-COMPONENTE REUTILIZABLE: Para mantener la consistencia en cada sección.
// ====================================================================

interface MedicalSectionProps {
    icon: React.ElementType;
    title: string;
    children: React.ReactNode;
    iconBgColor?: string;
    iconTextColor?: string;
}

const MedicalSection: React.FC<MedicalSectionProps> = ({ 
    icon: Icon, 
    title, 
    children, 
    iconBgColor = 'bg-gray-100', 
    iconTextColor = 'text-gray-600'
}) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
            <div className={`w-8 h-8 ${iconBgColor} rounded-lg flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${iconTextColor}`} />
            </div>
            <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
        </div>
        <div className="text-sm text-gray-700 leading-relaxed">
            {children}
        </div>
    </div>
);

// ====================================================================
// COMPONENTE PRINCIPAL: Compone las secciones y maneja los datos.
// ====================================================================

export function PetMedicalTab({ pet }: { pet: Pet }) {

    // Helper para renderizar listas o un mensaje por defecto.
    const renderList = (items: string | string[] | undefined, noneMessage: string) => {
        const itemList = Array.isArray(items) ? items : (items ? [items] : []);
        
        if (itemList.length === 0) {
            return <p className="text-gray-500 italic">{noneMessage}</p>;
        }
        
        return (
            <ul className="space-y-2 list-disc list-inside">
                {itemList.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        );
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
            {/* Sección de Alergias */}
            <MedicalSection 
                icon={AlertTriangle} 
                title="Alergias Conocidas"
                iconBgColor="bg-red-100"
                iconTextColor="text-red-600"
            >
                {renderList(pet.allergies, 'Ninguna alergia registrada.')}
            </MedicalSection>

            {/* Sección de Medicamentos */}
            <MedicalSection 
                icon={Pill} 
                title="Medicamentos Actuales"
                iconBgColor="bg-blue-100"
                iconTextColor="text-blue-600"
            >
                {renderList(pet.medications, 'Ningún medicamento registrado.')}
            </MedicalSection>

            {/* Sección de Notas Especiales (col-span-2 para ocupar todo el ancho) */}
            <div className="lg:col-span-2">
                <MedicalSection 
                    icon={Heart} 
                    title="Notas de Comportamiento y Cuidados"
                    iconBgColor="bg-purple-100"
                    iconTextColor="text-purple-600"
                >
                    {pet.specialNotes 
                        ? <p>{pet.specialNotes}</p> 
                        : <p className="text-gray-500 italic">No hay notas especiales.</p>
                    }
                </MedicalSection>
            </div>
            
            {/* EJEMPLO DE EXPANSIÓN: 
              Aquí es donde podrías colocar un componente que cargue datos más complejos.
              <div className="lg:col-span-2">
                  <DetailedMedicalHistory petId={pet.id} />
              </div>
            */}
        </div>
    );
}
