import type { Pet } from '@/features/pets/types';
import type { PetStats } from '@/features/pets/types';

/**
 * Formatea la edad de una mascota (en años) a un string legible.
 * Ejemplos: 1.5 -> "1 año y 6 meses", 0.5 -> "6 meses", 3 -> "3 años".
 */
export function formatPetAge(ageInYears?: number): string {
    if (ageInYears === undefined || ageInYears < 0) {
        return 'Edad desconocida';
    }
    if (ageInYears === 0) {
        return 'Menos de un mes';
    }

    const years = Math.floor(ageInYears);
    const months = Math.round((ageInYears - years) * 12);

    const yearString = years > 0 ? `${years} año${years > 1 ? 's' : ''}` : '';
    const monthString = months > 0 ? `${months} mes${months > 1 ? 'es' : ''}` : '';

    if (yearString && monthString) {
        return `${yearString} y ${monthString}`;
    }
    return yearString || monthString;
}

/**
 * Genera una URL de imagen de stock basada en la especie y raza de la mascota.
 * Utiliza Unsplash para obtener imágenes aleatorias pero relevantes.
 */
export function getPetImageUrl(species?: string, breed?: string): string {
    const query = breed || species || 'animal';
    // Usamos un tamaño específico para consistencia y lo codificamos para la URL
    const encodedQuery = encodeURIComponent(query.toLowerCase());
    return `https://source.unsplash.com/400x400/?${encodedQuery}`;
}

/**
 * Genera un avatar SVG de respaldo con la inicial del nombre de la mascota.
 * El color se basa en un hash del nombre para que sea consistente.
 */
export function generatePetAvatar(name?: string): string {
    const initial = name ? name.charAt(0).toUpperCase() : '?';
    
    // Paleta de colores para los avatares
    const colors = [
        '#f87171', '#fb923c', '#fbbf24', '#a3e635', '#4ade80', 
        '#34d399', '#2dd4bf', '#22d3ee', '#38bdf8', '#60a5fa', 
        '#818cf8', '#a78bfa', '#c084fc', '#e879f9', '#f472b6'
    ];

    // Simple hash para elegir un color consistente basado en el nombre
    const charCodeSum = name ? name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) : 0;
    const bgColor = colors[charCodeSum % colors.length];

    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
            <rect width="100" height="100" fill="${bgColor}" />
            <text 
                x="50%" 
                y="50%" 
                dominant-baseline="central" 
                text-anchor="middle" 
                fill="#ffffff" 
                font-family="Arial, sans-serif" 
                font-size="50" 
                font-weight="bold">
                ${initial}
            </text>
        </svg>
    `;

    // Codificamos el SVG para usarlo en un data URL
    return `data:image/svg+xml;base64,${btoa(svg)}`;
}


/**
 * Obtiene un objeto con información de estado derivada de una mascota.
 * Esto centraliza la lógica de negocio para los indicadores de la UI.
 */
export function getPetStatusInfo(pet: Pet): {
    isNew: boolean;
    needsAttention: boolean;
    hasSpecialNeeds: boolean;
    ageCategory: 'Cachorro' | 'Adulto' | 'Senior' | 'Desconocido';
} {
    // Se considera "nuevo" si fue creado en los últimos 7 días.
    const isNew = new Date(pet.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    // "Necesita atención" si tiene medicamentos o alergias registradas.
    const needsAttention = !!(pet.medications || pet.allergies);
    
    // "Tiene cuidados especiales" si hay notas al respecto.
    const hasSpecialNeeds = !!pet.specialNotes;

    let ageCategory: 'Cachorro' | 'Adulto' | 'Senior' | 'Desconocido' = 'Desconocido';
    if (pet.age) {
        if (pet.age < 1) ageCategory = 'Cachorro';
        else if (pet.age <= 7) ageCategory = 'Adulto';
        else ageCategory = 'Senior';
    }

    return {
        isNew,
        needsAttention,
        hasSpecialNeeds,
        ageCategory,
    };
}

/**
 * Calcula un objeto de estadísticas básico a partir de una lista de mascotas.
 * Reemplaza la necesidad de llamar al endpoint /stats para la vista de usuario.
 */
export function calculateUserStats(pets: Pet[]): PetStats {
    if (!pets || pets.length === 0) {
        return {
            totalPets: 0,
            activePets: 0,
            inactivePets: 0,
            petsBySpecies: {},
            // Estos son stats de admin que no podemos calcular aquí
            averagePetsPerAccount: 0,
            petsRegisteredLast30Days: 0,
        };
    }

    const activePets = pets.filter(p => p.active).length;
    const petsBySpecies = pets.reduce((acc, pet) => {
        const species = pet.species || 'Desconocido';
        acc[species] = (acc[species] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return {
        totalPets: pets.length,
        activePets: activePets,
        inactivePets: pets.length - activePets,
        petsBySpecies: petsBySpecies,
        averagePetsPerAccount: 0, // No aplicable
        petsRegisteredLast30Days: 0, // No aplicable
    };
}
