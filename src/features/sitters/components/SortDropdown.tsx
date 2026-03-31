import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { SITTER_CONFIG, type SortOption } from '@/features/sitters/config/sitters.config';
import { useSittersStore } from '@/store/SitterStore';

// 1. El componente ya no recibe props.
export function SortDropdown() {
    // 2. Obtenemos el estado y las acciones directamente del contexto.
	const updateFilter = useSittersStore((state) => state.updateFilter);
	const filters = useSittersStore((state) => state.filters)
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 3. La lógica para encontrar la opción actual ahora usa el estado del contexto.
    const currentSort = SITTER_CONFIG.SORT_OPTIONS.find(option => 
        option.sortBy === filters.sortBy && option.sortDirection === filters.sortDirection
    ) || SITTER_CONFIG.SORT_OPTIONS[0];

    // El hook para cerrar al hacer clic fuera se mantiene igual, es lógica de UI local.
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // 4. El handler ahora llama a la acción `updateFilter` del contexto.
    const handleSortChange = (option: SortOption) => {
        updateFilter({
            sortBy: option.sortBy,
            sortDirection: option.sortDirection
        });
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700"
            >
                <span className="text-sm text-gray-600 dark:text-gray-400">Ordenar por:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{currentSort.label}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-10">
                    <div className="py-1">
                        {SITTER_CONFIG.SORT_OPTIONS.map((option) => (
                            <button
                                key={option.key}
                                onClick={() => handleSortChange(option)}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700/50 flex items-center justify-between"
                            >
                                <span className={currentSort.key === option.key ? 'font-medium text-orange-600 dark:text-orange-400' : 'text-gray-700 dark:text-gray-300'}>
                                    {option.label}
                                </span>
                                {currentSort.key === option.key && (
                                    <Check className="w-4 h-4 text-orange-600" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
