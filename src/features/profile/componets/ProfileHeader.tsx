import { ShieldCheck, User } from 'lucide-react';

import { Badge } from '@/components/ui/Badge'; // Asumiendo componente de Badge
import type { UserProfile } from '../types';
import { motion } from 'framer-motion';

interface ProfileHeaderProps {
  user: UserProfile;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const getRoleText = (role: string) => {
    const roles: { [key: string]: string } = {
      SITTER: 'Cuidador',
      ADMIN: 'Administrador',
      CLIENT: 'Dueño de Mascota', 
    };
    return roles[role] || 'Usuario';
  }

  return (
    <motion.header
      className="relative bg-orange-400 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 transition-all duration-300"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center border-4 border-white/50">
          <User className="w-12 h-12 text-white" />
        </div>
      </div>
      <div className="flex flex-col items-center sm:items-start w-full min-w-0">
        <h1 className="text-2xl sm:text-3xl font-bold truncate w-full">{user.firstName} {user.lastName}</h1>
        <p className="text-white/80 text-base sm:text-lg truncate w-full">{user.email}</p>
        <Badge className="mt-4 sm:mt-2 bg-glass-neutral text-white backdrop-blur-sm shadow-sm inline-flex items-center">
          <ShieldCheck className="w-4 h-4 mr-2 shrink-0" />
          <span className="truncate">{getRoleText(user.role)}</span>
        </Badge>
      </div>
    </motion.header>
  );
};
