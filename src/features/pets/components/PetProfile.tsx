// features/pets/components/PetProfile.tsx

import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PetProfileHeader } from './profile/PetProfileHeader';
import { PetProfileTabs } from './profile/PetProfileTabs';
import { PetsLoadingState } from './states';
import { usePetsStore } from '../../../store/PetStore';
import { getPetById } from '../../../services/petService';

export function PetProfile() {
    const { petId } = useParams<{ petId: string }>();
    const navigate = useNavigate();
    const selectedPet = usePetsStore((store) => store.selectedPet);
    const pets = usePetsStore((store) => store.pets);
    const setSelectedPet = usePetsStore((store) => store.setSelectedPet);
    const isLoading = usePetsStore((store) => store.isLoading);

    useEffect(() => {
        if (!petId) return;
        const numId = Number(petId);

        // Si ya está seleccionado y es el mismo, no hacer nada
        if (selectedPet?.id === numId) return;

        // Primero busca en el store local (lista ya cargadas)
        const petFromStore = pets.find(p => p.id === numId);
        if (petFromStore) {
            setSelectedPet(petFromStore);
            return;
        }

        // Si no está en el store, lo carga desde el backend
        getPetById(numId)
            .then(pet => setSelectedPet(pet as typeof selectedPet))
            .catch(() => navigate('/dashboard/pets', { replace: true }));
    }, [petId, pets, selectedPet, setSelectedPet, navigate]);

    if (!selectedPet || selectedPet.id !== Number(petId)) {
        return isLoading ? <PetsLoadingState /> : <PetsLoadingState />;
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
            <PetProfileHeader
                pet={selectedPet}
                onPetUpdated={(updated) => setSelectedPet(updated as typeof selectedPet)}
            />
            <PetProfileTabs pet={selectedPet} />
        </div>
    );
}
