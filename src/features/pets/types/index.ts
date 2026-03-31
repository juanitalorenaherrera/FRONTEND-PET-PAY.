// ===========================================
// features/pets/types/index.ts
// ===========================================

export interface Pet {
    id: number;
    accountId: number;
    accountName: string;
    name: string;
    species: string;
    breed: string;
    age: number;
    weight?: number;
    gender?: string;
    color?: string;
    physicalDescription?: string;
    medications?: string;
    allergies?: string;
    specialNotes?: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface PetSummary {
    id: number;
    accountId: number;
    name: string;
    species: string;
    breed: string;
    age: number;
    active: boolean;
}

export interface CreatePetRequest {
    accountId: number;
    name: string;
    species?: string;
    breed?: string;
    age?: number;
    weight?: number;
    gender?: string;
    color?: string;
    physicalDescription?: string;
    medications?: string;
    allergies?: string;
    specialNotes?: string;
}

export interface PetStats {
  totalPets: number;
  activePets: number;
  inactivePets: number;
  petsBySpecies: Record<string, number>;
  averagePetsPerAccount: number;
  petsRegisteredLast30Days: number;
}

export interface PetsState {
    pets: Pet[];
    currentPet: Pet | null;
    stats: PetStats | null;
    isLoading: boolean;
    error: string | null;
}

export interface PetCardProps {
    pet: Pet;
    variant?: 'compact' | 'default' | 'detailed';
    showActions?: boolean;
    onClick?: (pet: Pet) => void;
    onMenuClick?: (pet: Pet) => void;
    className?: string;
}

export enum SortBy {
	NAME = 'name',
	AGE = 'age',
	SPECIES = 'species',
	CREATED = 'created',
}

export enum SortOrderBy {
	ASC = 'asc',
	DESC = 'desc',
}

export interface PetFilters {
    search: string;
    species: string[];
    activeOnly: boolean;
    sortBy: SortBy;
    sortOrder: SortOrderBy;
}
