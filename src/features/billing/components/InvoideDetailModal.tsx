// components/billing/InvoiceDetailModal.tsx

import { Calendar, DollarSign, Download, FileText, X } from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import type { Invoice } from '@/types';
import { motion } from 'framer-motion';

interface InvoiceDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    invoice: Invoice | null;
    onDownload: (invoiceId: number) => void;
    onPay?: (invoiceId: number) => void;
}

export const InvoiceDetailModal = ({ 
    isOpen, 
    onClose, 
    invoice,
    onDownload,
    onPay 
}: InvoiceDetailModalProps) => {
    if (!isOpen || !invoice) return null;

    const isPending = invoice.status === 'PENDING';
    const isPaid = invoice.status === 'PAID';
    const isCancelled = invoice.status === 'CANCELLED';

    const getStatusColor = () => {
    if (isPaid) return "success";
    if (isPending) return "warning";
    if (isCancelled) return "destructive";
    return "default";
};

    const getStatusText = () => {
        switch (invoice.status) {
            case 'PAID': return 'Pagada';
            case 'PENDING': return 'Pendiente';
            case 'CANCELLED': return 'Cancelada';
            default: return invoice.status;
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <FileText className="w-6 h-6 text-pet-teal" />
                            Factura #{invoice.id}
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Status Badge */}
                    <div className="text-center">
                        <Badge variant={getStatusColor()} className="text-lg px-4 py-2">
                            {getStatusText()}
                        </Badge>
                    </div>

                    {/* Invoice Details */}
                    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                        <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-gray-500" />
                            <div>
                                <p className="text-sm text-gray-500">Fecha de emisión</p>
                                <p className="font-semibold text-gray-800">{formatDate(invoice.date)}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <DollarSign className="w-5 h-5 text-gray-500" />
                            <div>
                                <p className="text-sm text-gray-500">Monto total</p>
                                <p className="text-2xl font-bold text-gray-800">
                                    ${invoice.amount.toLocaleString('es-ES', { 
                                        minimumFractionDigits: 2, 
                                        maximumFractionDigits: 2 
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info Section */}
                    <div className="border border-gray-200 rounded-xl p-4">
                        <h3 className="font-semibold text-gray-700 mb-3">Información adicional</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p>• Esta factura incluye todos los servicios utilizados durante el período de facturación.</p>
                            <p>• Para consultas sobre esta factura, contacta con nuestro equipo de soporte.</p>
                            {isPending && (
                                <p className="text-orange-600 font-medium">
                                    • Esta factura está pendiente de pago. Puedes pagarla ahora o descargar el PDF para mayor detalle.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <Button
                            variant="outline"
                            onClick={() => onDownload(invoice.id)}
                            className="flex-1 flex items-center gap-2"
                        >
                            <Download className="w-4 h-4" />
                            Descargar PDF
                        </Button>
                        
                        {isPending && onPay && (
                            <Button
                                onClick={() => onPay(invoice.id)}
                                className="flex-1 bg-gradient-to-r from-pet-teal to-pet-blue text-white"
                            >
                                Pagar Ahora
                            </Button>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
