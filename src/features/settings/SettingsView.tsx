// src/features/settings/view/SettingsView.tsx

import { Bell, LogOut, Palette, Settings, Shield, User } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

import { useState, useEffect } from 'react';

// Un componente simple para las tarjetas de sección
const SettingsCard = ({ title, description, children }: { title: string, description: string, children: React.ReactNode }) => (
  <div className="bg-white rounded-2xl shadow-md border border-neutral-200 p-6 dark:bg-gray-800 dark:border-gray-700">
    <h3 className="text-xl font-bold text-neutral-800 dark:text-white">{title}</h3>
    <p className="text-neutral-500 text-sm mt-1 mb-6 dark:text-gray-400">{description}</p>
    <div className="space-y-4">{children}</div>
  </div>
);

// Un componente simple para una fila de ajuste
const SettingsRow = ({ icon: Icon, label, children }: { icon: React.ElementType, label: string, children: React.ReactNode }) => (
  <div className="flex items-center justify-between border-t border-neutral-200 pt-4 first:border-t-0 first:pt-0 dark:border-gray-700">
    <div className="flex items-center gap-3">
      <Icon className="w-5 h-5 text-pet-teal" />
      <span className="text-neutral-700 dark:text-gray-300">{label}</span>
    </div>
    <div>{children}</div>
  </div>
);

export const SettingsView = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark') || localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  return (
    <motion.div
      className="min-h-screen bg-neutral-50 p-4 md:p-8 dark:bg-gray-900 transition-colors"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.header
        className="bg-gradient-warm rounded-3xl p-8 mb-8 text-black shadow-xl dark:bg-gray-800"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold flex items-center gap-3 dark:text-white"><Settings />Ajustes de la Cuenta</h1>
        <p className="text-black/80 mt-2 dark:text-gray-300">Gestiona tu perfil, seguridad y preferencias.</p>
      </motion.header>
      
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <SettingsCard title="Perfil y Seguridad" description="Actualiza tu información personal y contraseña.">
            <SettingsRow icon={User} label="Editar Perfil">
              <Button variant="outline">Ir al Perfil</Button>
            </SettingsRow>
            <SettingsRow icon={Shield} label="Cambiar Contraseña">
              <Button variant="outline">Cambiar</Button>
            </SettingsRow>
          </SettingsCard>
          
          <SettingsCard title="Preferencias" description="Personaliza tu experiencia en la aplicación.">
            <SettingsRow icon={Bell} label="Notificaciones por Email">
              <div className="w-12 h-6 bg-pet-green rounded-full p-1 flex items-center cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full shadow-md transform translate-x-6 transition-transform" />
              </div>
            </SettingsRow>
             <SettingsRow icon={Palette} label="Tema Oscuro">
               <div 
                 onClick={toggleDarkMode}
                 className={`w-12 h-6 rounded-full p-1 flex items-center cursor-pointer transition-colors duration-300 ${isDarkMode ? 'bg-pet-teal' : 'bg-neutral-300'}`}
                >
                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`} />
              </div>
            </SettingsRow>
          </SettingsCard>
        </div>

        <div className="space-y-8">
          <SettingsCard title="Cuenta" description="Gestiona el estado de tu cuenta.">
              <p className="text-sm text-neutral-600 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                Cerrarás tu sesión en este dispositivo.
              </p>
              <Button variant="secondary" className="w-full text-black dark:text-white"><LogOut className="w-4 h-4 mr-2 text-black dark:text-white"/>Cerrar Sesión</Button>
              <p className="text-sm text-neutral-600 bg-red-50 border border-red-200 rounded-lg p-3">
                Esta acción es permanente y no se puede deshacer.
              </p>
              <Button variant="destructive" className="w-full">Eliminar Cuenta</Button>
          </SettingsCard>
        </div>
      </div>
    </motion.div>
  );
};
