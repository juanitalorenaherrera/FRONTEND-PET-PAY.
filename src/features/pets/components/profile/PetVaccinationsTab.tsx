// features/pets/components/profile/PetVaccinationsTab.tsx

import React, { useCallback, useEffect, useState } from 'react';
import { ShieldAlert, ShieldCheck, ShieldX, Syringe, ClipboardList, Calendar, AlertCircle, RefreshCw } from 'lucide-react';
import type { Pet } from '../../types';

interface VaccinationRecord {
    id: string;
    vaccine: string;
    lastDate: string;
    nextDate: string;
    status: 'Al día' | 'Próxima' | 'Vencida';
    daysUntilNext?: number;
}

const vaccinationService = {
    getByPetId: (petId: number): Promise<VaccinationRecord[]> => {
        console.log(`Fetching vaccinations for pet ID: ${petId}`);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    { id: 'v1', vaccine: 'Rabia', lastDate: '15 Nov 2024', nextDate: '15 Nov 2025', status: 'Al día', daysUntilNext: 230 },
                    { id: 'v2', vaccine: 'Parvovirus (DHPP)', lastDate: '15 Nov 2024', nextDate: '15 Nov 2025', status: 'Al día', daysUntilNext: 230 },
                    { id: 'v3', vaccine: 'Desparasitación Interna', lastDate: '01 Dic 2024', nextDate: '01 Mar 2025', status: 'Próxima', daysUntilNext: 12 },
                    { id: 'v4', vaccine: 'Leucemia Felina', lastDate: '10 Ago 2023', nextDate: '10 Ago 2024', status: 'Vencida', daysUntilNext: -180 },
                ]);
            }, 900);
        });
    }
};

// ── Status config ─────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
    'Al día': {
        icon: ShieldCheck,
        gradient: 'from-emerald-50 to-green-50',
        border: 'border-emerald-200',
        iconBg: 'bg-emerald-100',
        iconColor: 'text-emerald-600',
        badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        dot: 'bg-emerald-500',
        label: 'Al día',
    },
    'Próxima': {
        icon: ShieldAlert,
        gradient: 'from-orange-50 to-amber-50',
        border: 'border-orange-200',
        iconBg: 'bg-orange-100',
        iconColor: 'text-orange-600',
        badge: 'bg-orange-100 text-orange-700 border-orange-200',
        dot: 'bg-orange-500',
        label: 'Próxima',
    },
    'Vencida': {
        icon: ShieldX,
        gradient: 'from-red-50 to-rose-50',
        border: 'border-red-200',
        iconBg: 'bg-red-100',
        iconColor: 'text-red-600',
        badge: 'bg-red-100 text-red-700 border-red-200',
        dot: 'bg-red-500',
        label: 'Vencida',
    },
} as const;

// ── Skeleton ──────────────────────────────────────────────────────────────────
const VaccinationSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-xl" />
                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                    <div className="h-6 w-16 bg-gray-200 rounded-full" />
                </div>
                <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded" />
                    <div className="h-3 bg-gray-200 rounded w-4/5" />
                </div>
            </div>
        ))}
    </div>
);

// ── Single card ───────────────────────────────────────────────────────────────
const VaccinationCard: React.FC<{ record: VaccinationRecord }> = ({ record }) => {
    const cfg = STATUS_CONFIG[record.status];
    const Icon = cfg.icon;

    return (
        <div className={`relative bg-gradient-to-br ${cfg.gradient} rounded-2xl p-5 border ${cfg.border} shadow-sm hover:shadow-md transition-all duration-200`}>
            {/* Status dot */}
            <div className={`absolute top-4 right-4 w-2.5 h-2.5 rounded-full ${cfg.dot} shadow-sm`} />

            <div className="flex items-start gap-3 mb-4">
                <div className={`w-10 h-10 ${cfg.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${cfg.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 text-sm leading-tight truncate pr-4">{record.vaccine}</h4>
                    <span className={`mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${cfg.badge}`}>
                        {cfg.label}
                    </span>
                </div>
            </div>

            <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-gray-500">
                        <Syringe className="w-3.5 h-3.5" /> Última aplicación
                    </span>
                    <span className="font-semibold text-gray-800">{record.lastDate}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-gray-500">
                        <Calendar className="w-3.5 h-3.5" /> Próxima dosis
                    </span>
                    <span className={`font-semibold ${record.status === 'Vencida' ? 'text-red-600' : record.status === 'Próxima' ? 'text-orange-600' : 'text-gray-800'}`}>
                        {record.nextDate}
                    </span>
                </div>
            </div>

            {/* Progress indicator for upcoming vaccines */}
            {record.status === 'Próxima' && record.daysUntilNext !== undefined && record.daysUntilNext > 0 && (
                <div className="mt-3 pt-3 border-t border-orange-200/60">
                    <div className="flex justify-between text-[11px] text-orange-600 mb-1">
                        <span>Vence en</span>
                        <span className="font-bold">{record.daysUntilNext} días</span>
                    </div>
                    <div className="h-1.5 bg-orange-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-orange-400 rounded-full"
                            style={{ width: `${Math.min(100, (1 - record.daysUntilNext / 90) * 100)}%` }}
                        />
                    </div>
                </div>
            )}

            {record.status === 'Vencida' && (
                <div className="mt-3 pt-3 border-t border-red-200/60 flex items-center gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                    <span className="text-[11px] text-red-600 font-medium">Requiere atención inmediata</span>
                </div>
            )}
        </div>
    );
};

// ── Summary bar ───────────────────────────────────────────────────────────────
const VaccinationSummary: React.FC<{ records: VaccinationRecord[] }> = ({ records }) => {
    const counts = {
        'Al día': records.filter(r => r.status === 'Al día').length,
        'Próxima': records.filter(r => r.status === 'Próxima').length,
        'Vencida': records.filter(r => r.status === 'Vencida').length,
    };

    return (
        <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-emerald-700">{counts['Al día']}</p>
                <p className="text-xs text-emerald-600 mt-0.5 font-medium">Al día</p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-orange-700">{counts['Próxima']}</p>
                <p className="text-xs text-orange-600 mt-0.5 font-medium">Próximas</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-red-700">{counts['Vencida']}</p>
                <p className="text-xs text-red-600 mt-0.5 font-medium">Vencidas</p>
            </div>
        </div>
    );
};

// ── Main component ────────────────────────────────────────────────────────────
export function PetVaccinationsTab({ pet }: { pet: Pet }) {
    const [records, setRecords] = useState<VaccinationRecord[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRecords = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await vaccinationService.getByPetId(pet.id);
            setRecords(data);
        } catch (err) {
            setError('No se pudo cargar el historial de vacunación.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [pet.id]);

    useEffect(() => {
        fetchRecords();
    }, [fetchRecords]);

    if (isLoading) return <VaccinationSkeleton />;

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center">
                    <AlertCircle className="w-7 h-7 text-red-500" />
                </div>
                <div>
                    <p className="font-semibold text-gray-900">Error al cargar vacunas</p>
                    <p className="text-sm text-gray-500 mt-1">{error}</p>
                </div>
                <button
                    onClick={fetchRecords}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-xl text-sm font-medium hover:bg-orange-600 transition-colors"
                >
                    <RefreshCw className="w-4 h-4" /> Reintentar
                </button>
            </div>
        );
    }

    if (records.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                    <ClipboardList className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Sin registros de vacunación</h4>
                <p className="text-sm text-gray-500 max-w-xs">
                    No hay registros de vacunación para {pet.name} aún. Agrega el historial médico de tu mascota.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-2 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="font-bold text-gray-900">Historial de Vacunación</h3>
                    <p className="text-sm text-gray-500">{records.length} vacunas registradas para {pet.name}</p>
                </div>
                <button
                    onClick={fetchRecords}
                    title="Actualizar"
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-500 hover:text-orange-600"
                >
                    <RefreshCw className="w-4 h-4" />
                </button>
            </div>
            <VaccinationSummary records={records} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {records.map((record) => (
                    <VaccinationCard key={record.id} record={record} />
                ))}
            </div>
        </div>
    );
}
