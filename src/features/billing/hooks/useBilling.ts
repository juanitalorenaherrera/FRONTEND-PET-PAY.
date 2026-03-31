import * as billingService from '@/services/billingService';

import { useCallback, useEffect } from 'react';

import type { CreatePaymentMethodRequest } from '@/types';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/AuthStore';
import { useBillingStore } from '@/store/billingStore';

export const useBilling = () => {
    const user = useAuthStore((state) => state.profile);
    const { 
        setData, setLoading, setError, 
        addPaymentMethod, removePaymentMethod, updatePaymentMethod,
        updateInvoice 
    } = useBillingStore();

    const loadBillingData = useCallback(async () => {
        if (!user?.accountId) return;
        setLoading(true);
        try {
            const [invoices, paymentMethods] = await Promise.all([
                billingService.getInvoicesByAccount(user.accountId),
                billingService.getPaymentMethodsByAccount(user.accountId),
            ]);
            setData({ invoices, paymentMethods });
        } catch (err) {
            console.error('Error fetching billing data:', err);
            const message = 'Error al cargar los datos de facturación.';
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }, [user?.accountId, setData, setLoading, setError]);

    useEffect(() => {
        loadBillingData();
    }, [loadBillingData]);

    const handlePayInvoice = useCallback(async (invoiceId: number) => {
        toast.promise(billingService.payInvoice(invoiceId), {
            loading: 'Procesando pago...',
            success: (updatedInvoice) => {
                updateInvoice(updatedInvoice);
                return `¡Factura #${invoiceId} pagada con éxito!`;
            },
            error: 'No se pudo procesar el pago.',
        });
    }, [updateInvoice]);

    const handleDeletePaymentMethod = useCallback(async (methodId: number) => {
        const originalMethods = useBillingStore.getState().paymentMethods;
        removePaymentMethod(methodId);

        toast.promise(billingService.deletePaymentMethod(methodId), {
            loading: 'Eliminando método de pago...',
            success: () => 'Método de pago eliminado correctamente.',
            error: () => {
                setData({ paymentMethods: originalMethods }); 
                return 'Error al eliminar el método de pago.';
            },
        });
    }, [removePaymentMethod, setData]);
    
    const handleAddPaymentMethod = useCallback(async (newMethodData: CreatePaymentMethodRequest, isDefault?: boolean) => {
        if (!user?.accountId) return;

        const processPaymentMethod = async () => {
            const newMethod = await billingService.addPaymentMethod(user.accountId, newMethodData);
            addPaymentMethod(newMethod);
            
            if (isDefault) {
                await billingService.setDefaultPaymentMethod(newMethod.id);
                loadBillingData();
            }
            return '¡Nuevo método de pago agregado!';
        };

        toast.promise(processPaymentMethod(), {
            loading: 'Agregando nuevo método de pago...',
            success: (msg) => msg,
            error: 'Error al agregar el método de pago.',
        });
    }, [addPaymentMethod, user?.accountId, loadBillingData]);

    const handleSetDefaultPaymentMethod = useCallback(async (methodId: number) => {
        toast.promise(billingService.setDefaultPaymentMethod(methodId), {
            loading: 'Actualizando método predeterminado...',
            success: (updatedMethod) => {
                updatePaymentMethod(updatedMethod);
                loadBillingData();
                return 'Método de pago predeterminado actualizado.';
            },
            error: 'Error al actualizar.',
        });
    }, [updatePaymentMethod, loadBillingData]);

    const handleDownloadInvoice = useCallback(async (invoiceId: number) => {
        toast.promise(billingService.downloadInvoice(invoiceId), {
            loading: 'Generando tu factura en PDF...',
            success: (blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `factura-${invoiceId}.pdf`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
                return '¡Descarga iniciada!';
            },
            error: 'No se pudo descargar la factura.',
        });
    }, []);

    return {
        handlePayInvoice,
        handleDeletePaymentMethod,
        handleAddPaymentMethod,
        handleSetDefaultPaymentMethod,
        handleDownloadInvoice,
    };
};
