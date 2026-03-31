import { useAuthStore } from '@/store/AuthStore';
import { Edit, Star, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import type { PaymentMethod } from '@/types';
import { motion } from 'framer-motion';

interface PaymentMethodCardProps {
    method: PaymentMethod;
    onDelete: (id: number) => void;
    onSetDefault: (id: number) => void;
    onEdit?: (method: PaymentMethod) => void;
}

export const PaymentMethodCard = ({ 
    method, 
    onDelete, 
    onSetDefault, 
    onEdit 
}: PaymentMethodCardProps) => {
    
    // Obtenemos el perfil de usuario para renderizar su nombre estéticamente
    const user = useAuthStore(state => state.profile);
    const titularName = (user?.firstName || user?.lastName) 
        ? `${user.firstName || ''} ${user.lastName || ''}`.trim().toUpperCase() 
        : 'MIEMBRO PETCARE';

    const getCardBrandLogo = (brand?: string) => {
        const brandLower = brand?.toLowerCase() || '';
        
        const logoUrls = {
            'visa': 'https://cdn.jsdelivr.net/gh/aaronfagan/svg-credit-card-payment-icons/flat/visa.svg',
            'mastercard': 'https://cdn.jsdelivr.net/gh/aaronfagan/svg-credit-card-payment-icons/flat/mastercard.svg',
            'american express': 'https://cdn.jsdelivr.net/gh/aaronfagan/svg-credit-card-payment-icons/flat/amex.svg',
            'amex': 'https://cdn.jsdelivr.net/gh/aaronfagan/svg-credit-card-payment-icons/flat/amex.svg',
            'discover': 'https://cdn.jsdelivr.net/gh/aaronfagan/svg-credit-card-payment-icons/flat/discover.svg',
            'paypal': 'https://cdn.jsdelivr.net/gh/aaronfagan/svg-credit-card-payment-icons/flat/paypal.svg'
        };

        const logoUrl = logoUrls[brandLower as keyof typeof logoUrls];
        
        if (logoUrl) {
            return (
                <img 
                    src={logoUrl} 
                    alt={brand || 'Card'} 
                    className="h-8 w-auto object-contain"
                    style={{ filter: 'brightness(0) invert(1)' }} // Hace el logo blanco
                />
            );
        }
        
        // Fallback para marcas desconocidas
        return (
            <div className="h-8 px-3 bg-white/20 rounded flex items-center">
                <span className="text-xs font-bold">{brand?.toUpperCase() || 'CARD'}</span>
            </div>
        );
    };

    const getCardGradient = (brand?: string) => {
        const brandLower = brand?.toLowerCase() || '';
        
        const gradients = {
            'visa': 'bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800',
            'mastercard': 'bg-gradient-to-br from-red-500 via-orange-600 to-red-700',
            'american express': 'bg-gradient-to-br from-green-600 via-teal-600 to-green-700',
            'amex': 'bg-gradient-to-br from-green-600 via-teal-600 to-green-700',
            'discover': 'bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700',
            'paypal': 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700'
        };

        return gradients[brandLower as keyof typeof gradients] || 'bg-gradient-to-br from-gray-600 to-gray-800';
    };

    const getChipImage = () => {
        // Chip de tarjeta realista
        return (
            <div className="w-12 h-9 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-lg border border-yellow-500 relative overflow-hidden">
                <div className="absolute inset-1 bg-gradient-to-br from-yellow-100 to-yellow-300 rounded-md">
                    <div className="grid grid-cols-3 gap-px p-1 h-full">
                        {[...Array(9)].map((_, i) => (
                            <div key={i} className="bg-yellow-600/30 rounded-sm"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <motion.div
            className="group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            whileHover={{ scale: 1.03 }}
            layout
        >
            {/* Tarjeta Principal */}
            <div className={`${getCardGradient(method.cardType)} text-white relative rounded-2xl overflow-hidden`}
                 style={{
                     aspectRatio: '1.586', // Proporción estándar de tarjeta de crédito
                     minHeight: '200px'
                 }}>
                
                {/* Patrón de fondo sutil */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-8 right-8 w-32 h-32 bg-white rounded-full"></div>
                    <div className="absolute bottom-8 left-8 w-20 h-20 bg-white rounded-full"></div>
                    <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full"></div>
                </div>

                {/* Contenido de la tarjeta */}
                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                    {/* Header: Logo y Estado */}
                    <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-3">
                            {getChipImage()}
                            {method.isDefault && (
                                <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-current" />
                                    <span className="text-xs font-bold">PRINCIPAL</span>
                                </div>
                            )}
                        </div>
                        <div className="text-right">
                            {getCardBrandLogo(method.cardType)}
                        </div>
                    </div>

                    {/* Número de tarjeta */}
                    <div className="my-4 sm:my-6">
                        <div className="font-mono text-base sm:text-lg lg:text-xl tracking-widest sm:tracking-[0.2em] lg:tracking-[0.3em] font-medium truncate">
                            •••• •••• •••• {method.lastFourDigits || '0000'}
                        </div>
                    </div>

                    {/* Info del titular y expiración */}
                    <div className="flex justify-between items-end gap-2">
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] sm:text-xs opacity-70 uppercase tracking-wider sm:tracking-widest mb-1 truncate">
                                Titular de la tarjeta
                            </p>
                            <p className="font-semibold text-sm sm:text-base lg:text-lg truncate pr-2">
                                {titularName}
                            </p>
                        </div>
                        <div className="text-right shrink-0 pl-2">
                            <p className="text-[10px] sm:text-xs opacity-70 uppercase tracking-wider sm:tracking-widest mb-1">
                                Expira
                            </p>
                            <p className="font-mono font-semibold text-sm sm:text-base lg:text-lg truncate">
                                {method.expiryDate || '**/**'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Banda magnética simulada */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20"></div>
            </div>

            {/* Panel de acciones */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-b-2xl p-4 shadow-lg">
                <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                        {!method.isDefault && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onSetDefault(method.id)}
                                className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 hover:border-yellow-300 dark:hover:border-yellow-600 hover:text-yellow-700 dark:hover:text-yellow-400 transition-colors"
                            >
                                <Star className="w-3 h-3" />
                                Hacer Principal
                            </Button>
                        )}
                        
                        {onEdit && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onEdit(method)}
                                className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                            >
                                <Edit className="w-3 h-3" />
                                Editar
                            </Button>
                        )}
                    </div>
                    
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(method.id)}
                        className="text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 dark:hover:border-red-600 hover:text-red-700 dark:hover:text-red-300 flex items-center gap-2 transition-colors"
                    >
                        <Trash2 className="w-3 h-3" />
                        Eliminar
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};
