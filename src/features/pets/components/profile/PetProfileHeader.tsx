// features/pets/components/profile/PetProfileHeader.tsx
import { useState } from 'react';
import { ArrowLeft, Edit, Trash2, X, Save, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

import type { Pet } from '../../types';
import { updatePet, deletePet } from '@/services/petService';
import type { CreatePetRequest } from '@/types/pets';

// ── Edit Modal ────────────────────────────────────────────────────────────────
function EditPetModal({ pet, onClose, onSaved }: { pet: Pet; onClose: () => void; onSaved: (updated: Pet) => void }) {
    const [form, setForm] = useState<Partial<CreatePetRequest>>({
        name: pet.name,
        species: pet.species || '',
        breed: pet.breed || '',
        age: pet.age,
        weight: pet.weight,
        gender: pet.gender || '',
        color: pet.color || '',
        physicalDescription: pet.physicalDescription || '',
        medications: pet.medications || '',
        allergies: pet.allergies || '',
        specialNotes: pet.specialNotes || '',
    });
    const [saving, setSaving] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: name === 'age' || name === 'weight' ? (value ? Number(value) : undefined) : value }));
    };

    const handleSave = async () => {
        if (!form.name?.trim()) { toast.error('El nombre es obligatorio'); return; }
        setSaving(true);
        try {
            const payload: CreatePetRequest = { accountId: pet.accountId, ...form } as CreatePetRequest;
            const updated = await updatePet(pet.id, payload);
            // Map PetResponse to Pet compatible shape
            const petUpdated: Pet = {
                ...pet,
                name: updated.name,
                species: updated.species || pet.species,
                breed: updated.breed || pet.breed,
                age: updated.age ?? pet.age,
                weight: updated.weight ?? pet.weight,
                gender: updated.gender ?? pet.gender,
                color: updated.color ?? pet.color,
                physicalDescription: updated.physicalDescription ?? pet.physicalDescription,
                medications: updated.medications ?? pet.medications,
                allergies: updated.allergies ?? pet.allergies,
                specialNotes: updated.specialNotes ?? pet.specialNotes,
                updatedAt: updated.updatedAt || new Date().toISOString(),
            };
            toast.success('¡Mascota actualizada correctamente!');
            onSaved(petUpdated);
            onClose();
        } catch {
            toast.error('No se pudo actualizar la mascota');
        } finally {
            setSaving(false);
        }
    };

    const inputCls = 'w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:border-orange-400 transition-colors placeholder-gray-400';
    const labelCls = 'block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5';

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
                className="relative w-full sm:max-w-2xl bg-white dark:bg-gray-900 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                            <Edit className="w-4 h-4 text-orange-600" />
                        </div>
                        <div>
                            <h2 className="font-bold text-gray-900 dark:text-white">Editar {pet.name}</h2>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Actualiza la información de tu mascota</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                {/* Body */}
                <div className="px-6 py-5 space-y-4 max-h-[65vh] overflow-y-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className={labelCls}>Nombre *</label>
                            <input name="name" value={form.name || ''} onChange={handleChange} placeholder="Nombre de la mascota" className={inputCls} />
                        </div>
                        <div>
                            <label className={labelCls}>Especie</label>
                            <select name="species" value={form.species || ''} onChange={handleChange} className={inputCls}>
                                <option value="">Seleccionar...</option>
                                <option value="Perro">Perro</option>
                                <option value="Gato">Gato</option>
                                <option value="Ave">Ave</option>
                                <option value="Reptil">Reptil</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelCls}>Raza</label>
                            <input name="breed" value={form.breed || ''} onChange={handleChange} placeholder="Raza" className={inputCls} />
                        </div>
                        <div>
                            <label className={labelCls}>Sexo</label>
                            <select name="gender" value={form.gender || ''} onChange={handleChange} className={inputCls}>
                                <option value="">Seleccionar...</option>
                                <option value="Macho">Macho</option>
                                <option value="Hembra">Hembra</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelCls}>Edad (años)</label>
                            <input type="number" name="age" value={form.age ?? ''} onChange={handleChange} min={0} max={30} className={inputCls} />
                        </div>
                        <div>
                            <label className={labelCls}>Peso (kg)</label>
                            <input type="number" name="weight" value={form.weight ?? ''} onChange={handleChange} min={0} step={0.1} className={inputCls} />
                        </div>
                        <div>
                            <label className={labelCls}>Color / Pelaje</label>
                            <input name="color" value={form.color || ''} onChange={handleChange} placeholder="Ej: Dorado, Negro..." className={inputCls} />
                        </div>
                    </div>
                    <div>
                        <label className={labelCls}>Descripción física</label>
                        <textarea name="physicalDescription" value={form.physicalDescription || ''} onChange={handleChange} rows={2} placeholder="Características físicas..." className={inputCls + ' resize-none'} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className={labelCls}>Medicamentos</label>
                            <textarea name="medications" value={form.medications || ''} onChange={handleChange} rows={2} placeholder="Medicamentos que toma..." className={inputCls + ' resize-none'} />
                        </div>
                        <div>
                            <label className={labelCls}>Alergias</label>
                            <textarea name="allergies" value={form.allergies || ''} onChange={handleChange} rows={2} placeholder="Alergias conocidas..." className={inputCls + ' resize-none'} />
                        </div>
                    </div>
                    <div>
                        <label className={labelCls}>Notas especiales</label>
                        <textarea name="specialNotes" value={form.specialNotes || ''} onChange={handleChange} rows={2} placeholder="Cualquier información adicional..." className={inputCls + ' resize-none'} />
                    </div>
                </div>
                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex gap-3">
                    <button onClick={onClose} className="flex-1 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        Cancelar
                    </button>
                    <button onClick={handleSave} disabled={saving} className="flex-1 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold text-sm hover:from-orange-600 hover:to-orange-700 transition-all shadow-md shadow-orange-500/20 disabled:opacity-50 flex items-center justify-center gap-2">
                        <Save className="w-4 h-4" />
                        {saving ? 'Guardando...' : 'Guardar cambios'}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

// ── Delete Confirm Modal ──────────────────────────────────────────────────────
function DeleteConfirmModal({ petName, onCancel, onConfirm, deleting }: {
    petName: string; onCancel: () => void; onConfirm: () => void; deleting: boolean;
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-6 max-w-sm w-full text-center">
                <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="font-black text-xl text-gray-900 dark:text-white mb-2">¿Eliminar a {petName}?</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Esta acción no se puede deshacer. Se eliminarán todos los datos de <strong>{petName}</strong> permanentemente.
                </p>
                <div className="flex gap-3">
                    <button onClick={onCancel} className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        Cancelar
                    </button>
                    <button onClick={onConfirm} disabled={deleting} className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 transition-colors disabled:opacity-50">
                        {deleting ? 'Eliminando...' : 'Sí, eliminar'}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

// ── Main Header ───────────────────────────────────────────────────────────────
export function PetProfileHeader({ pet, onPetUpdated }: { pet: Pet; onPetUpdated?: (updated: Pet) => void }) {
    const navigate = useNavigate();
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await deletePet(pet.id);
            toast.success(`${pet.name} ha sido eliminado`);
            navigate('/dashboard/pets');
        } catch {
            toast.error('No se pudo eliminar la mascota');
            setDeleting(false);
            setShowDelete(false);
        }
    };

    return (
        <>
            <AnimatePresence>
                {showEdit && <EditPetModal pet={pet} onClose={() => setShowEdit(false)} onSaved={onPetUpdated || (() => {})} />}
                {showDelete && <DeleteConfirmModal petName={pet.name} onCancel={() => setShowDelete(false)} onConfirm={handleDelete} deleting={deleting} />}
            </AnimatePresence>

            {/* Top bar */}
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={() => navigate('/dashboard/pets')}
                    className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
                >
                    <div className="w-8 h-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center group-hover:border-orange-300 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    Volver
                </button>
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowEdit(true)}
                        className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors"
                    >
                        <Edit className="w-3.5 h-3.5" /> Editar
                    </button>
                    <button
                        onClick={() => setShowDelete(true)}
                        className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                    >
                        <Trash2 className="w-3.5 h-3.5" /> Eliminar
                    </button>
                </div>
            </div>

            {/* Pet summary card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-400 to-rose-500 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0">
                        {pet.species?.toLowerCase().includes('gato') ? '🐱' : pet.species?.toLowerCase().includes('ave') ? '🐦' : '🐶'}
                    </div>
                    <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h1 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">{pet.name}</h1>
                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${pet.active ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-gray-100 text-gray-500'}`}>
                                {pet.active ? '● Activo' : '● Inactivo'}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                            {pet.breed}{pet.breed && pet.species ? ' · ' : ''}{pet.species}
                            {pet.age ? ` · ${pet.age} año${pet.age !== 1 ? 's' : ''}` : ''}
                            {pet.gender ? ` · ${pet.gender}` : ''}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
