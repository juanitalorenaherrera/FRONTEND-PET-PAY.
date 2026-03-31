import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '@/store/AuthStore';
import type { Profile } from '@/features/auth/types/authStore';

interface RoleProtectedRouteProps {
    allowedRoles: Profile['role'][];
}

export default function RoleProtectedRoute({ allowedRoles }: RoleProtectedRouteProps) {
    const user = useAuthStore((state) => state.profile);

    if (!user) {
    // Si no hay usuario, redirige a la página de login
    return <Navigate to="/login" replace />;
    } 

    if (!allowedRoles.includes(user.role)) {
    // Si el rol del usuario no está permitido, redirige a la página de inicio
    // Podrías redirigir a una página de "Acceso Denegado" también
    return <Navigate to="/" replace />;
    }

  // Si el usuario existe y su rol es válido, muestra el contenido de la ruta
    return <Outlet />;
}
