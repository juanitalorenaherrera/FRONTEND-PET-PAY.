import { getRoleColor } from '../../../../../utils/dashboardHeader';
import { useAuthStore } from '../../../../../store/AuthStore';
import { Role } from '@/features/auth/types/authStore';

export default function UserInfoHeader() {

	const user = useAuthStore((state) => state.profile);

	return (
		<div className="px-4 py-3 border-b border-gray-100">
			<div className="flex items-center gap-3">
				<div
					className={`w-12 h-12 bg-gradient-to-br ${getRoleColor(
						user?.role
					)} rounded-xl flex items-center justify-center shadow-lg`}
				>
					<span className="text-white font-bold text-sm">
						{user?.initials || '??'}
					</span>
				</div>
				<div>
					<p className="font-semibold text-gray-900">
						{user
							? `${user.firstName} ${user.lastName}`
							: 'Usuario'}
					</p>
					<p className="text-sm text-gray-600">{user?.email}</p>
					<span
						className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full ${
							user?.role === Role.CLIENT
								? 'bg-orange-100 text-orange-700'
								: user?.role === Role.SITTER
								? 'bg-blue-100 text-blue-700'
								: 'bg-purple-100 text-purple-700'
						}`}
					>
						{user?.role?.toLowerCase() || 'cliente'}
					</span>
				</div>
			</div>
		</div>
	);
}
