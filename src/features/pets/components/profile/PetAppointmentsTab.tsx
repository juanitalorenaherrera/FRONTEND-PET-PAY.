// features/pets/components/profile/PetAppointmentsTab.tsx

import { useEffect, useState } from 'react';

import type { Pet } from '@/features/pets/types';
import { Skeleton } from '@/components/ui/Skeleton';

// Placeholder para los datos de citas
type Booking = { id: number; service: string; date: string; };

export function PetAppointmentsTab({ pet }: { pet: Pet }) {
    const [appointments, setAppointments] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            setIsLoading(true);
            try {
                // LLAMADA REAL A LA API:
                // const data = await bookingService.getByPetId(pet.id);
                // setAppointments(data);
                
                // Simulación de llamada a la API
                setTimeout(() => {
                    setAppointments([
                        { id: 1, service: 'Consulta General', date: '20 Dic 2024' },
                        { id: 2, service: 'Vacunación', date: '15 Nov 2024' },
                    ]);
                    setIsLoading(false);
                }, 1000);

            } catch (error) {
                console.error("Failed to fetch appointments", error);
                setIsLoading(false);
            }
        };

        fetchAppointments();
    }, [pet.id]); 

    if (isLoading) {
        return <div className="space-y-4"><Skeleton className="h-24 w-full" /><Skeleton className="h-24 w-full" /></div>;
    }

    if (appointments.length === 0) {
        return <p>No hay citas registradas para {pet.name}.</p>;
    }

    return (
        <div className="space-y-4">
            {appointments.map(app => (
                <div key={app.id} className="bg-white rounded-lg p-6 shadow-sm ...">
                    {/* ... JSX para renderizar una tarjeta de cita ... */}
                    <h4>{app.service}</h4>
                    <p>{app.date}</p>
                </div>
            ))}
        </div>
    );
}
