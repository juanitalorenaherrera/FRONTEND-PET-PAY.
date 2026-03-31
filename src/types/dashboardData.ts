// src/types/DashboardData.ts

export interface UserProfile {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	role: string;
	initials: string;
}

export interface Appointment {
	id: number;
	petName: string;
	sitterName: string;
	startTime: string;
	status: string;
	totalPrice: number;
	finalized: boolean;
	statusLabel: string;
	sitterId?: number;
	notes?: string;
	estimatedDuration?: number;
	endTime?: string;
}

export interface Pet {
	id: number;
	accountId: number;
	accountName: string;
	name: string;
	species: string;
	breed: string;
	age: number;
	active: boolean;
	createdAt: string;
}

export interface Sitter {
	id: number;
	sitterName: string;
	profileImageUrl: string | null;
	hourlyRate: number;
	averageRating: number;
	isVerified: boolean;
	location: string;
}

export interface Stats {
	activePets: number;
	activePetsChange: string;
	scheduledAppointments: number;
	scheduledAppointmentsChange: string;
	vaccinesUpToDate: string;
	vaccinesChange: string;
	pendingReminders: number;
	pendingRemindersChange: string;
}

export interface DashboardData {
	userProfile: UserProfile;
	nextAppointment: Appointment | null;
	userPets: Pet[];
	recentSitters: Sitter[];
	stats: Stats;
}

export interface DashboardStats {
	activePets: number;
	activePetsChange: string;
	scheduledAppointments: number;
	scheduledAppointmentsChange: string;
	vaccinesUpToDate: string;
	vaccinesChange: string;
	pendingReminders: number;
	pendingRemindersChange: string;
}
