// src/features/services/NewServiceView.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronRight, Home, Scissors, Stethoscope, Dog, Heart,
    Truck, Moon, Syringe, MapPin, Clock, Calendar, Star,
    ChevronLeft, CheckCircle2, ArrowRight, Shield, Zap
} from 'lucide-react';

// ── Service catalogue ─────────────────────────────────────────────────────────
const SERVICES = [
    {
        id: 'care',
        icon: Home,
        emoji: '🏠',
        name: 'Cuidado en casa',
        desc: 'Un cuidador certificado se queda en tu hogar mientras viajas.',
        price: 'Desde $18/noche',
        duration: '1–30 noches',
        badge: null,
        gradient: 'from-blue-500 to-indigo-600',
        bg: 'bg-blue-50 dark:bg-blue-950/20',
        border: 'border-blue-200 dark:border-blue-800',
        iconColor: 'text-blue-600',
    },
    {
        id: 'grooming',
        icon: Scissors,
        emoji: '✂️',
        name: 'Grooming',
        desc: 'Baño, corte y estética profesional con recogida a domicilio.',
        price: 'Desde $20/sesión',
        duration: '1–2.5 h',
        badge: 'Popular',
        gradient: 'from-purple-500 to-pink-600',
        bg: 'bg-purple-50 dark:bg-purple-950/20',
        border: 'border-purple-200 dark:border-purple-800',
        iconColor: 'text-purple-600',
    },
    {
        id: 'vet',
        icon: Stethoscope,
        emoji: '🩺',
        name: 'Consulta veterinaria',
        desc: 'Consulta presencial o por videollamada con veterinarios certificados.',
        price: 'Desde $15/consulta',
        duration: '20–45 min',
        badge: null,
        gradient: 'from-emerald-500 to-teal-600',
        bg: 'bg-emerald-50 dark:bg-emerald-950/20',
        border: 'border-emerald-200 dark:border-emerald-800',
        iconColor: 'text-emerald-600',
    },
    {
        id: 'walk',
        icon: Dog,
        emoji: '🦮',
        name: 'Paseo',
        desc: 'Paseadores confiables con rastreo GPS en tiempo real.',
        price: 'Desde $10/paseo',
        duration: '30–60 min',
        badge: null,
        gradient: 'from-orange-500 to-amber-600',
        bg: 'bg-orange-50 dark:bg-orange-950/20',
        border: 'border-orange-200 dark:border-orange-800',
        iconColor: 'text-orange-600',
    },
    {
        id: 'daycare',
        icon: Heart,
        emoji: '☀️',
        name: 'Guardería diurna',
        desc: 'Tu mascota disfrutará de juego y socialización todo el día.',
        price: 'Desde $25/día',
        duration: '8h–12h',
        badge: null,
        gradient: 'from-rose-500 to-pink-600',
        bg: 'bg-rose-50 dark:bg-rose-950/20',
        border: 'border-rose-200 dark:border-rose-800',
        iconColor: 'text-rose-600',
    },
    {
        id: 'transport',
        icon: Truck,
        emoji: '🚐',
        name: 'Transporte',
        desc: 'Traslados seguros y cómodos a la clínica, grooming o cualquier destino.',
        price: 'Desde $12/viaje',
        duration: 'Según distancia',
        badge: 'Nuevo',
        gradient: 'from-cyan-500 to-blue-600',
        bg: 'bg-cyan-50 dark:bg-cyan-950/20',
        border: 'border-cyan-200 dark:border-cyan-800',
        iconColor: 'text-cyan-600',
    },
    {
        id: 'hotel',
        icon: Moon,
        emoji: '🌙',
        name: 'Hotel para mascotas',
        desc: 'Alojamiento en casa de un cuidador con atención personalizada.',
        price: 'Desde $22/noche',
        duration: '1–30 noches',
        badge: null,
        gradient: 'from-violet-500 to-purple-600',
        bg: 'bg-violet-50 dark:bg-violet-950/20',
        border: 'border-violet-200 dark:border-violet-800',
        iconColor: 'text-violet-600',
    },
    {
        id: 'vaccine',
        icon: Syringe,
        emoji: '💉',
        name: 'Vacunación a domicilio',
        desc: 'Veterinario a domicilio para vacunación y desparasitación.',
        price: 'Desde $30/visita',
        duration: '15–30 min',
        badge: null,
        gradient: 'from-teal-500 to-emerald-600',
        bg: 'bg-teal-50 dark:bg-teal-950/20',
        border: 'border-teal-200 dark:border-teal-800',
        iconColor: 'text-teal-600',
    },
];

const PETS = ['Sky (Perro)', 'Matilda (Perro)'];
const TIME_SLOTS = ['8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM'];

// ── Step indicator ────────────────────────────────────────────────────────────
function StepIndicator({ step }: { step: number }) {
    const steps = ['Servicio', 'Detalles', 'Confirmar'];
    return (
        <div className="flex items-center justify-center gap-2 mb-8">
            {steps.map((label, i) => {
                const num = i + 1;
                const done = step > num;
                const active = step === num;
                return (
                    <div key={label} className="flex items-center gap-2">
                        <div className="flex flex-col items-center gap-1">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                                done ? 'bg-orange-500 text-white' :
                                active ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 ring-2 ring-orange-400' :
                                'bg-gray-100 dark:bg-gray-800 text-gray-400'
                            }`}>
                                {done ? <CheckCircle2 className="w-5 h-5" /> : num}
                            </div>
                            <span className={`text-[11px] font-semibold ${active || done ? 'text-orange-600 dark:text-orange-400' : 'text-gray-400'}`}>{label}</span>
                        </div>
                        {i < steps.length - 1 && (
                            <div className={`w-12 sm:w-20 h-0.5 mb-4 rounded-full transition-colors duration-300 ${done ? 'bg-orange-400' : 'bg-gray-200 dark:bg-gray-700'}`} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

// ── Step 1: Choose service ────────────────────────────────────────────────────
function Step1({ selected, onSelect }: { selected: string | null; onSelect: (id: string) => void }) {
    return (
        <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">¿Qué servicio necesitas?</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Elige el servicio ideal para tu mascota</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {SERVICES.map(s => {
                    const isSelected = selected === s.id;
                    return (
                        <button
                            key={s.id}
                            onClick={() => onSelect(s.id)}
                            className={`relative text-left rounded-2xl p-5 border-2 transition-all duration-200 group hover:shadow-md ${
                                isSelected
                                    ? `${s.border} ${s.bg} ring-2 ring-offset-1 ring-orange-400`
                                    : 'border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-200 dark:hover:border-gray-600'
                            }`}
                        >
                            {s.badge && (
                                <span className="absolute -top-2.5 right-4 text-[10px] font-black bg-orange-500 text-white px-2.5 py-0.5 rounded-full shadow">
                                    {s.badge}
                                </span>
                            )}
                            <div className={`w-12 h-12 ${s.bg} border ${s.border} rounded-2xl flex items-center justify-center mb-3 text-2xl`}>
                                {s.emoji}
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{s.name}</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed mb-3 line-clamp-2">{s.desc}</p>
                            <div className="flex items-center justify-between text-xs">
                                <span className={`font-bold ${s.iconColor}`}>{s.price}</span>
                                <span className="text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{s.duration}</span>
                            </div>
                            {isSelected && (
                                <div className="absolute top-3 right-3 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                                    <CheckCircle2 className="w-4 h-4 text-white" />
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </motion.div>
    );
}

// ── Step 2: Details ───────────────────────────────────────────────────────────
function Step2({ serviceId, pet, setPet, date, setDate, time, setTime, address, setAddress }: {
    serviceId: string; pet: string; setPet: (v: string) => void;
    date: string; setDate: (v: string) => void;
    time: string; setTime: (v: string) => void;
    address: string; setAddress: (v: string) => void;
}) {
    const service = SERVICES.find(s => s.id === serviceId)!;
    return (
        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-2xl mx-auto">
            <div className="mb-6">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 ${service.bg} border ${service.border} rounded-xl text-sm font-semibold ${service.iconColor} mb-3`}>
                    <span>{service.emoji}</span> {service.name}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Detalles del servicio</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Cuéntanos un poco más para encontrar el mejor cuidador</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 space-y-5 shadow-sm">
                {/* Mascota */}
                <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Mascota</label>
                    <div className="grid grid-cols-2 gap-2">
                        {PETS.map(p => (
                            <button
                                key={p}
                                onClick={() => setPet(p)}
                                className={`flex items-center gap-2 p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                                    pet === p ? 'border-orange-400 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300' : 'border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300'
                                }`}
                            >
                                <span className="text-lg">🐾</span> {p}
                                {pet === p && <CheckCircle2 className="w-4 h-4 text-orange-500 ml-auto" />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Fecha */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                            <Calendar className="w-3.5 h-3.5 inline mr-1" /> Fecha
                        </label>
                        <input
                            type="date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-transparent focus:border-orange-400 text-gray-900 dark:text-white rounded-xl text-sm focus:outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                            <Clock className="w-3.5 h-3.5 inline mr-1" /> Horario
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                            {TIME_SLOTS.map(slot => (
                                <button
                                    key={slot}
                                    onClick={() => setTime(slot)}
                                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                        time === slot ? 'bg-orange-500 text-white shadow-sm' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                                >
                                    {slot}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Dirección */}
                <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                        <MapPin className="w-3.5 h-3.5 inline mr-1" /> Dirección de recogida
                    </label>
                    <input
                        type="text"
                        placeholder="Ej: Calle Las Flores 123, Ciudad"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-transparent focus:border-orange-400 text-gray-900 dark:text-white rounded-xl text-sm focus:outline-none transition-colors placeholder-gray-400"
                    />
                </div>
            </div>
        </motion.div>
    );
}

// ── Step 3: Confirm ───────────────────────────────────────────────────────────
function Step3({ serviceId, pet, date, time, address, onConfirm }: {
    serviceId: string; pet: string; date: string; time: string; address: string; onConfirm: () => void;
}) {
    const service = SERVICES.find(s => s.id === serviceId)!;
    const [confirmed, setConfirmed] = useState(false);

    if (confirmed) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-16 max-w-md mx-auto"
            >
                <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-3xl flex items-center justify-center mb-6 shadow-lg">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">¡Servicio agendado!</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Tu solicitud de <strong className="text-gray-700 dark:text-gray-200">{service.name}</strong> para <strong className="text-gray-700 dark:text-gray-200">{pet}</strong> fue enviada. Recibirás confirmación en minutos.
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 w-full text-left space-y-2 mb-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Fecha</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{date} a las {time}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Dirección</span>
                        <span className="font-semibold text-gray-900 dark:text-white text-right max-w-[60%]">{address || 'No especificada'}</span>
                    </div>
                </div>
                <button
                    onClick={onConfirm}
                    className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-2xl font-bold hover:bg-orange-600 transition-colors"
                >
                    Volver al Dashboard <ArrowRight className="w-4 h-4" />
                </button>
            </motion.div>
        );
    }

    return (
        <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-2xl mx-auto">
            <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Confirma tu solicitud</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Revisa los detalles antes de continuar</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
                {/* Service header */}
                <div className={`bg-gradient-to-r ${service.gradient} p-6 text-white`}>
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-3xl">
                            {service.emoji}
                        </div>
                        <div>
                            <h3 className="text-xl font-black">{service.name}</h3>
                            <p className="text-white/80 text-sm">{service.desc}</p>
                        </div>
                    </div>
                </div>
                {/* Details */}
                <div className="p-6 space-y-4 divide-y divide-gray-50 dark:divide-gray-700">
                    {[
                        { label: 'Mascota', value: pet || '—', icon: '🐾' },
                        { label: 'Fecha', value: date || '—', icon: '📅' },
                        { label: 'Horario', value: time || '—', icon: '⏰' },
                        { label: 'Dirección', value: address || 'No especificada', icon: '📍' },
                        { label: 'Precio estimado', value: service.price, icon: '💰' },
                    ].map(row => (
                        <div key={row.label} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                            <span className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <span>{row.icon}</span> {row.label}
                            </span>
                            <span className="font-semibold text-sm text-gray-900 dark:text-white text-right max-w-[55%]">{row.value}</span>
                        </div>
                    ))}
                </div>
                {/* Trust badges */}
                <div className="px-6 pb-6 flex flex-wrap gap-3">
                    {[
                        { icon: Shield, text: 'Pago seguro' },
                        { icon: Zap, text: 'Confirmación rápida' },
                        { icon: Star, text: 'Cuidadores verificados' },
                    ].map(b => {
                        const Icon = b.icon;
                        return (
                            <div key={b.text} className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                                <Icon className="w-3.5 h-3.5 text-orange-500" /> {b.text}
                            </div>
                        );
                    })}
                </div>
            </div>
            <button
                onClick={() => setConfirmed(true)}
                className="mt-6 w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-black text-base hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2"
            >
                Confirmar servicio <CheckCircle2 className="w-5 h-5" />
            </button>
        </motion.div>
    );
}

// ── Main view ─────────────────────────────────────────────────────────────────
export function NewServiceView() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [pet, setPet] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [address, setAddress] = useState('');

    const canNext = step === 1 ? !!selectedService : step === 2 ? !!pet && !!date && !!time : false;

    const handleNext = () => { if (canNext) setStep(s => s + 1); };
    const handleBack = () => { if (step > 1) setStep(s => s - 1); };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Hero header */}
            <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-rose-600 text-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-2 text-orange-200 hover:text-white transition-colors mb-6 text-sm"
                    >
                        <ChevronRight className="w-4 h-4 rotate-180" /> Volver al Dashboard
                    </button>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-11 h-11 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-orange-200 font-semibold text-sm uppercase tracking-widest">Nuevo Servicio</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black mb-2 leading-tight">
                        ¿Qué necesita tu mascota hoy?
                    </h1>
                    <p className="text-orange-100 text-base max-w-lg">
                        Agenda cualquier servicio en minutos. Cuidadores verificados, pagos seguros.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
                <StepIndicator step={step} />

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <Step1 selected={selectedService} onSelect={id => { setSelectedService(id); }} />
                    )}
                    {step === 2 && selectedService && (
                        <Step2
                            serviceId={selectedService}
                            pet={pet} setPet={setPet}
                            date={date} setDate={setDate}
                            time={time} setTime={setTime}
                            address={address} setAddress={setAddress}
                        />
                    )}
                    {step === 3 && selectedService && (
                        <Step3
                            serviceId={selectedService}
                            pet={pet} date={date} time={time} address={address}
                            onConfirm={() => navigate('/dashboard')}
                        />
                    )}
                </AnimatePresence>

                {/* Navigation buttons */}
                {step < 3 && (
                    <div className={`flex mt-8 gap-3 ${step === 1 ? 'justify-end' : 'justify-between'}`}>
                        {step > 1 && (
                            <button
                                onClick={handleBack}
                                className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-2xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
                            >
                                <ChevronLeft className="w-4 h-4" /> Atrás
                            </button>
                        )}
                        <button
                            onClick={handleNext}
                            disabled={!canNext}
                            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-bold hover:from-orange-600 hover:to-orange-700 transition-all shadow-md shadow-orange-500/20 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            {step === 1 ? 'Continuar' : 'Revisar'} <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
