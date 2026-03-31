import { Role } from "@/features/auth/types/authStore";

export const displayName = (role?: Role): string | undefined => {
	if (role)
		return Role.ADMIN === role
			? 'Panel de Administrador'
			: Role.SITTER === role
			? 'Panel de Cuidador'
			: Role.CLIENT === role
			? 'Panel de Cliente'
			: 'Dashboard';
};

export const getRoleColor = (role?: Role): string | undefined => {
	if (role)
		return Role.CLIENT === role
			? 'from-orange-500 to-orange-600'
			: Role.SITTER === role
			? 'from-blue-500 to-blue-600'
			: Role.ADMIN === role
			? 'from-purple-500 to-purple-600'
			: 'from-gray-500 to-gray-600';
};
