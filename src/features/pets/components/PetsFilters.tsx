import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, FilterX, Check, ArrowDownAZ, ArrowUpZA, PawPrint, Calendar, Clock, Contact } from 'lucide-react';
import { PET_SPECIES_OPTIONS } from '../constants';
import { SortBy, SortOrderBy } from '../types';
import type { PetFilters } from '../types';
import { usePetsStore } from '../../../store/PetStore';
import { motion, AnimatePresence } from 'framer-motion';

interface PetsFiltersProps {
    className?: string;
}

export function PetsFilters({ className = '' }: PetsFiltersProps) {
    const filters = usePetsStore((state) => state.filters);
    const pets = usePetsStore((state) => state.pets);
    const updateFilters = usePetsStore((state) => state.updateFilters);
    const clearFilters = usePetsStore((state) => state.clearFilters);

    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

    const handleFilterChange = (update: Partial<PetFilters>) => {
        updateFilters(update);
    };

    const handleSpeciesToggle = (species: string) => {
        const currentSpecies = filters.species || [];
        const newSpecies = currentSpecies.includes(species)
            ? currentSpecies.filter(s => s !== species)
            : [...currentSpecies, species];
        handleFilterChange({ species: newSpecies });
    };

    const availableSpecies = useMemo(() => {
        const petSpecies = [...new Set(pets.map(p => p.species?.toLowerCase()).filter(Boolean))];
        return PET_SPECIES_OPTIONS.filter(option => 
            petSpecies.includes(option.value.toLowerCase())
        );
    }, [pets]);

    return (
        <div className={`space-y-4 ${className}`}>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 relative z-20">
                {/* Buscador Principal */}
                <div className="flex-1 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 w-5 h-5 transition-colors cursor-text" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre o raza..."
                        value={filters.search || ''}
                        onChange={(e) => handleFilterChange({ search: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border-2 border-transparent dark:border-gray-700 text-gray-900 dark:text-white dark:placeholder-gray-400 rounded-2xl focus:border-orange-500 focus:outline-none transition-all shadow-sm shadow-gray-200/50 dark:shadow-none"
                    />
                </div>
                
                {/* Botón Filtros */}
                <button
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    className={`flex items-center justify-center gap-2 px-5 py-3 border-2 rounded-2xl transition-all font-medium whitespace-nowrap ${
                        showAdvancedFilters 
                            ? 'border-orange-500 bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:border-orange-500 dark:text-orange-400 shadow-md shadow-orange-500/10' 
                            : 'border-transparent bg-white dark:bg-gray-800 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-orange-200 dark:hover:border-gray-600 shadow-sm shadow-gray-200/50 dark:shadow-none'
                    }`}
                >
                    <SlidersHorizontal className="w-5 h-5" />
                    <span>Filtros avanzados</span>
                    {(filters.species.length > 0 || !filters.activeOnly || filters.sortBy !== SortBy.CREATED) && (
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-orange-500 text-white text-[10px] ml-1 font-bold shadow-md shadow-orange-500/20">
                            !
                        </span>
                    )}
                </button>
            </div>

            <AnimatePresence>
                {showAdvancedFilters && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0, scale: 0.98, transformOrigin: 'top' }}
                        animate={{ opacity: 1, height: 'auto', scale: 1 }}
                        exit={{ opacity: 0, height: 0, scale: 0.98 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="overflow-hidden"
                    >
                        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-100 dark:border-gray-700 rounded-3xl p-5 md:p-6 shadow-2xl shadow-gray-200/50 dark:shadow-none space-y-6 relative z-10 m-0.5 mt-2">
                            
                            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-4">
                                <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center">
                                        <SlidersHorizontal className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                                    </div>
                                    Ajustes de Búsqueda
                                </h4>
                                <button 
                                    onClick={clearFilters} 
                                    className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-orange-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-orange-400 transition-colors"
                                >
                                    <FilterX className="w-4 h-4" />
                                    Limpiar todo
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                {/* Estado */}
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Estado de perfil
                                    </label>
                                    <div className="flex bg-gray-50 dark:bg-gray-900/50 p-1 rounded-2xl border border-gray-100 dark:border-gray-800 h-[68px]">
                                        <button
                                            onClick={() => handleFilterChange({ activeOnly: true })}
                                            className={`flex-1 px-3 rounded-xl transition-all flex flex-col items-center justify-center gap-1 text-xs font-semibold ${
                                                filters.activeOnly 
                                                    ? 'bg-white text-orange-600 dark:bg-gray-800 dark:text-orange-400 shadow-sm' 
                                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                            }`}
                                        >
                                            <div className="flex items-center gap-1">
                                                {filters.activeOnly && <Check className="w-3.5 h-3.5" />}
                                                Solo Activas
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => handleFilterChange({ activeOnly: false })}
                                            className={`flex-1 px-3 rounded-xl transition-all flex flex-col items-center justify-center gap-1 text-xs font-semibold ${
                                                !filters.activeOnly 
                                                    ? 'bg-white text-orange-600 dark:bg-gray-800 dark:text-orange-400 shadow-sm' 
                                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                            }`}
                                        >
                                            <div className="flex items-center gap-1">
                                                {!filters.activeOnly && <Check className="w-3.5 h-3.5" />}
                                                Todas
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                {/* Ordenar por */}
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Ordenar por
                                    </label>
                                    <div className="grid grid-cols-2 gap-2 h-[68px]">
                                        {[
                                            { value: SortBy.NAME, label: 'Nombre', icon: Contact },
                                            { value: SortBy.AGE, label: 'Edad', icon: Calendar },
                                            { value: SortBy.SPECIES, label: 'Especie', icon: PawPrint },
                                            { value: SortBy.CREATED, label: 'Registro', icon: Clock }
                                        ].map(item => (
                                            <button
                                                key={item.value}
                                                onClick={() => handleFilterChange({ sortBy: item.value })}
                                                className={`py-1.5 px-3 rounded-xl border-2 transition-all flex items-center gap-2 text-xs font-semibold ${
                                                    filters.sortBy === item.value 
                                                        ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400' 
                                                        : 'bg-white border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-750 dark:hover:border-gray-700 shadow-sm shadow-gray-100 dark:shadow-none'
                                                }`}
                                            >
                                                <item.icon className={`w-4 h-4 ${filters.sortBy === item.value ? 'opacity-100' : 'opacity-50'}`} />
                                                {item.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Orden ASC / DESC */}
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div> Dirección
                                    </label>
                                    <div className="flex bg-gray-50 dark:bg-gray-900/50 p-1 rounded-2xl border border-gray-100 dark:border-gray-800 h-[68px]">
                                        <button
                                            onClick={() => handleFilterChange({ sortOrder: SortOrderBy.DESC })}
                                            className={`flex-1 px-3 rounded-xl flex flex-col items-center justify-center gap-1 text-xs font-semibold transition-all ${
                                                filters.sortOrder === SortOrderBy.DESC 
                                                    ? 'bg-white dark:bg-gray-800 text-teal-600 dark:text-teal-400 shadow-sm' 
                                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                            }`}
                                        >
                                            <ArrowDownAZ className="w-4 h-4" />
                                            Descendente
                                        </button>
                                        <button
                                            onClick={() => handleFilterChange({ sortOrder: SortOrderBy.ASC })}
                                            className={`flex-1 px-3 rounded-xl flex flex-col items-center justify-center gap-1 text-xs font-semibold transition-all ${
                                                filters.sortOrder === SortOrderBy.ASC 
                                                    ? 'bg-white dark:bg-gray-800 text-teal-600 dark:text-teal-400 shadow-sm' 
                                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                            }`}
                                        >
                                            <ArrowUpZA className="w-4 h-4" />
                                            Ascendente
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Especies (Si hay disponibles) */}
                            {availableSpecies.length > 0 && (
                                <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> Filtrar por Especie
                                    </label>
                                    <div className="flex flex-wrap gap-3">
                                        {availableSpecies.map((option) => {
                                            const active = filters.species?.includes(option.value);
                                            return (
                                                <button
                                                    key={option.value}
                                                    onClick={() => handleSpeciesToggle(option.value)}
                                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border-2 ${
                                                        active
                                                            ? 'bg-purple-100 border-purple-200 text-purple-700 dark:bg-purple-900/30 dark:border-purple-800 dark:text-purple-300 shadow-sm'
                                                            : 'bg-white border-transparent text-gray-600 hover:border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-700 shadow-sm shadow-gray-100 dark:shadow-none'
                                                    }`}
                                                >
                                                    {option.label}
                                                    {active && <div className="w-2 h-2 rounded-full bg-purple-500 shadow-sm shadow-purple-500/50" />}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
