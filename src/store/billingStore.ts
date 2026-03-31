// store/billingStore.ts

import type { Invoice, PaymentMethod } from '@/types';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface BillingState {
    // State
    paymentMethods: PaymentMethod[];
    invoices: Invoice[];
    loading: boolean;
    error: string | null;

    // Actions
    setData: (data: { paymentMethods?: PaymentMethod[]; invoices?: Invoice[] }) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    
    // Payment Methods
    addPaymentMethod: (method: PaymentMethod) => void;
    updatePaymentMethod: (updatedMethod: PaymentMethod) => void;
    removePaymentMethod: (methodId: number) => void;
    
    // Invoices
    updateInvoice: (updatedInvoice: Invoice) => void;
    
    // Reset
    reset: () => void;
}

const initialState = {
    paymentMethods: [],
    invoices: [],
    loading: false,
    error: null,
};

export const useBillingStore = create<BillingState>()(
    devtools(
        (set) => ({
            ...initialState,

            setData: (data) => {
                set((state) => ({
                    ...state,
                    paymentMethods: data.paymentMethods ?? state.paymentMethods,
                    invoices: data.invoices ?? state.invoices,
                    loading: false,
                    error: null,
                }));
            },

            setLoading: (loading) => {
                set((state) => ({ ...state, loading }));
            },

            setError: (error) => {
                set((state) => ({ 
                    ...state, 
                    error, 
                    loading: false 
                }));
            },

            // Payment Methods Actions
            addPaymentMethod: (method) => {
                set((state) => {
                    // Si es el primer método o se marca como predeterminado, 
                    // actualizar los otros métodos
                    let updatedMethods = state.paymentMethods;
                    
                    if (method.isDefault) {
                        updatedMethods = state.paymentMethods.map(m => ({
                            ...m,
                            isDefault: false
                        }));
                    }

                    return {
                        ...state,
                        paymentMethods: [...updatedMethods, method],
                    };
                });
            },

            updatePaymentMethod: (updatedMethod) => {
                set((state) => {
                    let updatedMethods = state.paymentMethods.map((method) =>
                        method.id === updatedMethod.id ? updatedMethod : method
                    );

                    // Si se marca como predeterminado, desmarcar los otros
                    if (updatedMethod.isDefault) {
                        updatedMethods = updatedMethods.map((method) =>
                            method.id !== updatedMethod.id
                                ? { ...method, isDefault: false }
                                : method
                        );
                    }

                    return {
                        ...state,
                        paymentMethods: updatedMethods,
                    };
                });
            },

            removePaymentMethod: (methodId) => {
                set((state) => {
                    const remainingMethods = state.paymentMethods.filter(
                        (method) => method.id !== methodId
                    );

                    // Si se eliminó el método predeterminado y hay otros métodos,
                    // marcar el primero como predeterminado
                    if (remainingMethods.length > 0 && 
                        !remainingMethods.some(m => m.isDefault)) {
                        remainingMethods[0].isDefault = true;
                    }

                    return {
                        ...state,
                        paymentMethods: remainingMethods,
                    };
                });
            },

            // Invoice Actions
            updateInvoice: (updatedInvoice) => {
                set((state) => ({
                    ...state,
                    invoices: state.invoices.map((invoice) =>
                        invoice.id === updatedInvoice.id ? updatedInvoice : invoice
                    ),
                }));
            },

            // Reset
            reset: () => {
                set(initialState);
            },
        }),
        {
            name: 'billing-store', // nombre para DevTools
        }
    )
);
