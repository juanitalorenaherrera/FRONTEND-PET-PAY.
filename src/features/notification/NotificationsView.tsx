// src/features/notifications/view/NotificationsView.tsx

import { Bell, CalendarCheck, MessageSquare, Star } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const notifications = [
  { id: 1, type: 'booking_confirmed', title: '¡Reserva Confirmada!', message: 'Anaís Herrera ha confirmado tu reserva para el 20 de Sept.', time: 'hace 5 min', unread: true },
  { id: 2, type: 'new_message', title: 'Nuevo Mensaje', message: 'Iván Castillo te ha enviado un mensaje.', time: 'hace 1 hora', unread: true },
  { id: 3, type: 'review_reminder', title: 'Deja una reseña', message: '¿Qué tal tu experiencia con Lorena Pérez? Tu opinión es importante.', time: 'hace 2 días', unread: false },
  { id: 4, type: 'booking_completed', title: 'Reserva Completada', message: 'La reserva con Anaís Herrera ha finalizado.', time: 'hace 4 días', unread: false },
];

const notificationIcons = {
  booking_confirmed: { icon: CalendarCheck, color: 'bg-pet-teal' },
  new_message: { icon: MessageSquare, color: 'bg-pet-blue' },
  review_reminder: { icon: Star, color: 'bg-pet-yellow' },
  booking_completed: { icon: CalendarCheck, color: 'bg-neutral-500' },
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0 }
};

export const NotificationsView = () => {
  return (
    <motion.div
      className="min-h-screen bg-neutral-50 dark:bg-gray-900 p-4 md:p-8 transition-colors duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.header
        className="bg-gradient-secondary rounded-3xl p-8 mb-8 text-black dark:text-white shadow-xl dark:shadow-none"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold flex items-center gap-3"><Bell />Centro de Notificaciones</h1>
        <p className="text-black/80 dark:text-white/80 mt-2">Todas tus alertas y mensajes importantes aquí.</p>
      </motion.header>
      
      <div className="dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-none border border-neutral-200 dark:border-gray-700 p-4 md:p-6 space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold dark:text-white">Recientes</h2>
          <Button variant="ghost">Marcar todas como leídas</Button>
        </div>
        <motion.ul variants={containerVariants} initial="hidden" animate="show">
          {notifications.map(n => {
            const IconConfig = notificationIcons[n.type as keyof typeof notificationIcons] || notificationIcons.new_message;
            return (
              <motion.li
                key={n.id}
                variants={itemVariants}
                className="flex items-start gap-4 p-4 rounded-xl transition-colors hover:bg-neutral-100 dark:hover:bg-gray-700"
              >
                <div className={cn("w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-black dark:text-white", IconConfig.color)}>
                  <IconConfig.icon className="w-5 h-5" />
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-neutral-800 dark:text-white">{n.title}</p>
                  <p className="text-sm text-neutral-600 dark:text-gray-300">{n.message}</p>
                  <p className="text-xs text-neutral-400 dark:text-gray-500 mt-1">{n.time}</p>
                </div>
                {n.unread && <div className="w-2.5 h-2.5 bg-pet-orange rounded-full mt-1 flex-shrink-0" />}
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </motion.div>
  );
};
