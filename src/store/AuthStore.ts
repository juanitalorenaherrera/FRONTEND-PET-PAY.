import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Actions, Profile, State } from '@/features/auth/types/authStore';

export const useAuthStore = create<State & Actions>()(
	persist(
		(set) => ({
			token: '',
			profile: null,
			isAuth: false,
			setToken: (token: string) => set({ token, isAuth: true }),
			setProfile: (profile: Profile) => set({ profile }),
			logout: () => set({ token: '', isAuth: false, profile: null }),
		}),
		{
			name: 'auth',
		}
	)
);
