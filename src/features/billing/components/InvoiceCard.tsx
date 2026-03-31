import { Calendar, DollarSign, Download, Eye } from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import type { Invoice } from '@/types';
import { motion } from 'framer-motion';

interface InvoiceCardProps {
    invoice: Invoice;
    onView: (invoice: Invoice) => void;
    onDownload: (invoiceId: number) => void;
    onPay?: (invoiceId: number) => void;
}

export const InvoiceCard = ({ invoice, onView, onDownload, onPay }: InvoiceCardProps) => {
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

    const getCardBackground = () => {
        if (isPaid) return 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800/50';
        if (isPending) return 'bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border-orange-200 dark:border-orange-800/50';
        if (isCancelled) return 'bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-red-200 dark:border-red-800/50';
        return 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'Fecha no disponible';
        return new Date(dateString).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    // ✅ CORRECCIÓN: Se define el monto de forma segura, con un valor por defecto.
    const displayAmount = typeof invoice.amount === 'number' ? invoice.amount : 0;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className={`${getCardBackground()} rounded-xl border-2 p-6 transition-all duration-300 hover:shadow-lg`}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                            Factura #{invoice.id}
                        </h3>
                        <Badge variant={getStatusColor()}>
                            {getStatusText()}
                        </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(invoice.date)}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                            {/* Se utiliza la variable segura 'displayAmount' */}
                            ${displayAmount.toLocaleString('es-ES', { 
                                minimumFractionDigits: 2, 
                                maximumFractionDigits: 2 
                            })}
                        </span>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onView(invoice)}
                    className="flex-1 flex items-center justify-center gap-1"
                >
                    <Eye className="w-4 h-4" />
                    Ver
                </Button>
                
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDownload(invoice.id)}
                    className="flex-1 flex items-center justify-center gap-1"
                >
                    <Download className="w-4 h-4" />
                    PDF
                </Button>
                
                {isPending && onPay && (
                    <Button
                        size="sm"
                        onClick={() => onPay(invoice.id)}
                        className="flex-1 bg-gradient-to-r from-pet-teal to-pet-blue text-white hover:from-pet-teal/90 hover:to-pet-blue/90"
                    >
                        Pagar
                    </Button>
                )}
            </div>
        </motion.div>
    );
};
