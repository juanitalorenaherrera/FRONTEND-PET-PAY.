import type { Invoice, PaymentMethod, CreatePaymentMethodRequest } from '@/types';

import axios from './auth'; // Usamos la instancia de axios configurada con la autenticación

// --- Definiciones de URLs base para mantener consistencia ---
const API_URL_INVOICES = '/api/invoices';
const API_URL_PAYMENT_METHODS = '/api/payment-methods';

// =============================================
// ========== SERVICIOS DE FACTURAS (INVOICES) ==========
// =============================================

/**
 * Obtiene el historial de facturas de una cuenta.
 * * Corrige el endpoint para que coincida con el backend y extrae correctamente 
 * el array 'content' de la respuesta paginada que envía Spring Boot.
 * * @param accountId - El ID de la cuenta del usuario.
 * @returns Una promesa que resuelve a un array de facturas.
 */
export const getInvoicesByAccount = async (accountId: number): Promise<Invoice[]> => {
    // Backend Endpoint: GET /api/invoices/account/{accountId}
    const response = await axios.get(`${API_URL_INVOICES}/account/${accountId}`);
    // El backend devuelve un objeto Page<T>, los datos están en la propiedad 'content'
    return response.data.content || [];
};

/**
 * Descarga el PDF de una factura específica.
 * * Corrige la URL del endpoint de 'download' a 'pdf' para que coincida
 * con el @GetMapping("/{id}/pdf") del InvoiceController.
 * * @param invoiceId - El ID de la factura a descargar.
 * @returns Una promesa que resuelve al Blob del archivo PDF.
 */
export const downloadInvoice = async (invoiceId: number): Promise<Blob> => {
    // Backend Endpoint: GET /api/invoices/{id}/pdf
    const response = await axios.get(`${API_URL_INVOICES}/${invoiceId}/pdf`, {
        responseType: 'blob', // Crucial para manejar la respuesta como un archivo binario
    });
    return response.data;
};

/**
 * Obtiene los detalles completos de una factura.
 * * @param invoiceId - El ID de la factura a consultar.
 * @returns Una promesa que resuelve a los datos de la factura.
 */
export const getInvoiceDetails = async (invoiceId: number): Promise<Invoice> => {
    // Backend Endpoint: GET /api/invoices/{id}
    const response = await axios.get(`${API_URL_INVOICES}/${invoiceId}`);
    return response.data;
};

/**
 * Procesa el pago de una factura (función de ejemplo).
 * * NOTA: Tu backend no tiene un endpoint específico para pagar. Esta función asume
 * que podría implementarse en el futuro como un PUT o POST.
 * * @param invoiceId - El ID de la factura a pagar.
 * @returns Una promesa que resuelve a la factura actualizada.
 */
export const payInvoice = async (invoiceId: number): Promise<Invoice> => {
    // Endpoint hipotético. Deberás implementarlo en el backend.
    const response = await axios.put(`${API_URL_INVOICES}/${invoiceId}/pay`);
    return response.data;
};


// ====================================================
// ========== SERVICIOS DE MÉTODOS DE PAGO ==========
// ====================================================

/**
 * Obtiene todos los métodos de pago asociados a una cuenta.
 * * @param accountId - El ID de la cuenta.
 * @returns Una promesa que resuelve a una lista de métodos de pago.
 */
export const getPaymentMethodsByAccount = async (accountId: number): Promise<PaymentMethod[]> => {
    // Backend Endpoint: GET /api/payment-methods/account/{accountId}
    const response = await axios.get(`${API_URL_PAYMENT_METHODS}/account/${accountId}`);
    return response.data;
};

/**
 * Agrega un nuevo método de pago a una cuenta.
 * * @param accountId - El ID de la cuenta a la que se agregará el método.
 * @param methodData - Los datos del nuevo método de pago.
 * @returns Una promesa que resuelve al método de pago recién creado.
 */
export const addPaymentMethod = async (
    accountId: number,
    methodData: CreatePaymentMethodRequest
): Promise<PaymentMethod> => {
    // Backend Endpoint: POST /api/payment-methods/{accountId}
    const response = await axios.post(`${API_URL_PAYMENT_METHODS}/${accountId}`, methodData);
    return response.data;
};

/**
 * Elimina un método de pago por su ID.
 * * @param methodId - El ID del método de pago a eliminar.
 */
export const deletePaymentMethod = async (methodId: number): Promise<void> => {
    // Backend Endpoint: DELETE /api/payment-methods/{id}
    await axios.delete(`${API_URL_PAYMENT_METHODS}/${methodId}`);
};

/**
 * Establece un método de pago como el predeterminado para la cuenta.
 * * @param methodId - El ID del método de pago a establecer como predeterminado.
 * @returns Una promesa que resuelve al método de pago actualizado.
 */
export const setDefaultPaymentMethod = async (methodId: number): Promise<PaymentMethod> => {
    // Backend Endpoint: PUT /api/payment-methods/{id}/default
    const response = await axios.put(`${API_URL_PAYMENT_METHODS}/${methodId}/default`);
    return response.data;
};

/**
 * Actualiza la información de un método de pago.
 * * @param methodId - El ID del método a actualizar.
 * @param updateData - Los datos a modificar.
 * @returns El método de pago con la información actualizada.
 */
export const updatePaymentMethod = async (
    methodId: number,
    updateData: Partial<PaymentMethod>
): Promise<PaymentMethod> => {
    // Nota: El backend no tiene un endpoint PUT general para /api/payment-methods/{id}.
    // Esta función se mantiene por si se agrega en el futuro.
    const response = await axios.put(`${API_URL_PAYMENT_METHODS}/${methodId}`, updateData);
    return response.data;
};
