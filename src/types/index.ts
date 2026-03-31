// src/types/index.ts


// Basado en el enum InvoiceStatus.java del backend
export type InvoiceStatus = 'PENDING' | 'PAID' | 'CANCELLED';
export type Role = 'CLIENT' | 'SITTER' | 'ADMIN';

/**
 * Representa la información resumida de una factura.
 * Coincide con el DTO `InvoiceSummaryResponse` del backend.
 *
 */
export interface Invoice {
    id: number;
    amount: number;
    date: string; // Las fechas se reciben como strings en formato ISO (e.g., "2025-09-16")
    status: InvoiceStatus;
}

/**
 * Representa un método de pago guardado.
 * Coincide con el DTO `PaymentMethodResponse` del backend.
 *
 */
export interface PaymentMethod {
    id: number;
    accountId: number;
    cardType: string;
    lastFourDigits: string;
    expiryDate: string; // e.g., "12/28"
    isDefault: boolean;
    isVerified: boolean;
}

/**
 * Representa la carga útil requerida para agregar un método de pago.
 * Coincide con el DTO `PaymentMethodRequest` del backend.
 */
export interface CreatePaymentMethodRequest {
    cardType: string;
    lastFourDigits: string;
    expiryDate: string; // MM/YY
    gatewayToken: string; // Requerido por el Backend
}

// Puedes añadir también otros tipos que ya uses en la aplicación aquí
// para tener un único punto de verdad para los tipos de datos.
