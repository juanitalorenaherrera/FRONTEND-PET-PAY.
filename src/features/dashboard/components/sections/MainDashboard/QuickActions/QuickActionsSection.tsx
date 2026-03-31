// ===========================================
// sections/QuickActions/QuickActionsSection.tsx
// ===========================================

import { Activity, Calendar, PawPrint, Plus } from 'lucide-react';

import QuickActionCard from './QuickActionCard';
import React from 'react';

interface QuickActionsProps {
  onActionClick: (actionId: string) => void;
  className?: string;
}

export interface QuickAction {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  color: string;
  bgColor: string;
  hoverColor?: string;
}

const QuickActionsSection: React.FC<QuickActionsProps> = ({
  onActionClick,
  className = ''
}) => {
  const quickActions: QuickAction[] = [
    {
      id: 'new-pet',
      icon: PawPrint,
      title: 'Nueva Mascota',
      description: 'Registra una nueva mascota',
      color: 'text-orange-600',
      bgColor: 'from-orange-100 to-orange-200',
      hoverColor: 'hover:border-orange-200'
    },
    {
      id: 'schedule-appointment',
      icon: Calendar,
      title: 'Agendar Cita',
      description: 'Programa una nueva cita',
      color: 'text-blue-600',
      bgColor: 'from-blue-100 to-blue-200',
      hoverColor: 'hover:border-blue-200'
    },
    {
      id: 'emergency',
      icon: Plus,
      title: 'Emergencia',
      description: 'Servicios de emergencia',
      color: 'text-red-600',
      bgColor: 'from-red-100 to-red-200',
      hoverColor: 'hover:border-red-200'
    },
    {
      id: 'reminders',
      icon: Activity,
      title: 'Recordatorios',
      description: 'Ver todos los recordatorios',
      color: 'text-green-600',
      bgColor: 'from-green-100 to-green-200',
      hoverColor: 'hover:border-green-200'
    }
  ];

  return (
    <div className={className}>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Acciones Rápidas</h2>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <QuickActionCard
            key={action.id}
            action={action}
            onClick={() => onActionClick(action.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuickActionsSection;
