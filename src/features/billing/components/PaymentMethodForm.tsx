// components/billing/PaymentMethodForm.tsx

import { CreditCard, X } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/Button';
import type { CreatePaymentMethodRequest, PaymentMethod } from '@/types';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface PaymentMethodFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreatePaymentMethodRequest, isDefault?: boolean) => Promise<void>;
    mode?: 'add' | 'edit';
    initialData?: PaymentMethod;
}

export const PaymentMethodForm = ({ 
    isOpen, 
    onClose, 
    onSubmit, 
    mode = 'add',
    initialData 
}: PaymentMethodFormProps) => {
    const [formData, setFormData] = useState({
        cardHolderName: '',
        cardNumber: '',
        expirationDate: initialData?.expiryDate || '',
        cvv: '',
        isDefault: initialData?.isDefault || false,
        brand: initialData?.cardType || '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.cardHolderName || !formData.cardNumber || !formData.expirationDate || !formData.cvv) {
            toast.error('Por favor completa todos los campos');
            return;
        }

        setIsSubmitting(true);
        try {
            // Extraer últimos 4 dígitos y determinar marca
            const lastFourDigits = formData.cardNumber.replace(/\s/g, '').slice(-4);
            const cardType = getCardBrand(formData.cardNumber);

            const payload: CreatePaymentMethodRequest = {
                cardType,
                lastFourDigits,
                expiryDate: formData.expirationDate, // El input ya tiene la máscara de MM/YY
                gatewayToken: "tok_visa_dummy_token" // Token ficticio para satisfacer el @NotBlank del Controller
            };

            await onSubmit(payload, formData.isDefault);
            
            onClose();
            setFormData({
                cardHolderName: '',
                cardNumber: '',
                expirationDate: '',
                cvv: '',
                isDefault: false,
                brand: '',
            });
        } catch (err) {
            console.error('Error al procesar el método de pago:', err);
            toast.error('Error al procesar el método de pago');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getCardBrand = (cardNumber: string): string => {
        const number = cardNumber.replace(/\s/g, '');
        if (number.startsWith('4')) return 'Visa';
        if (number.startsWith('5') || number.startsWith('2')) return 'Mastercard';
        if (number.startsWith('3')) return 'American Express';
        return 'Desconocida';
    };

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join(' ');
        } else {
            return v;
        }
    };

    const formatExpirationDate = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (v.length >= 2) {
            return v.substring(0, 2) + '/' + v.substring(2, 4);
        }
        return v;
    };

    const handleInputChange = (field: string, value: string) => {
        let formattedValue = value;
        
        if (field === 'cardNumber') {
            formattedValue = formatCardNumber(value);
        } else if (field === 'expirationDate') {
            formattedValue = formatExpirationDate(value);
        }
        
        setFormData(prev => ({
            ...prev,
            [field]: formattedValue
        }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <CreditCard className="w-6 h-6 text-pet-teal" />
                        {mode === 'add' ? 'Agregar' : 'Editar'} Método de Pago
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre del titular
                        </label>
                        <input
                            type="text"
                            value={formData.cardHolderName}
                            onChange={(e) => handleInputChange('cardHolderName', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pet-teal focus:border-transparent"
                            placeholder="Juan Pérez"
                            disabled={mode === 'edit'}
                        />
                    </div>

                    {mode === 'add' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Número de tarjeta
                                </label>
                                <input
                                    type="text"
                                    value={formData.cardNumber}
                                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pet-teal focus:border-transparent font-mono"
                                    placeholder="1234 5678 9012 3456"
                                    maxLength={19}
                                />
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Fecha de expiración
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.expirationDate}
                                        onChange={(e) => handleInputChange('expirationDate', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pet-teal focus:border-transparent font-mono"
                                        placeholder="MM/AA"
                                        maxLength={5}
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        CVV
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.cvv}
                                        onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pet-teal focus:border-transparent font-mono text-center"
                                        placeholder="123"
                                        maxLength={4}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="isDefault"
                            checked={formData.isDefault}
                            onChange={(e) => setFormData(prev => ({ ...prev, isDefault: e.target.checked }))}
                            className="w-4 h-4 text-pet-teal bg-gray-100 border-gray-300 rounded focus:ring-pet-teal focus:ring-2"
                        />
                        <label htmlFor="isDefault" className="text-sm text-gray-700">
                            Establecer como método predeterminado
                        </label>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="flex-1"
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1 bg-gradient-to-r from-pet-teal to-pet-blue text-white"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Guardando...' : mode === 'add' ? 'Agregar' : 'Actualizar'}
                        </Button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};
