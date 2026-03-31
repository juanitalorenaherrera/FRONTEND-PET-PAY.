import { Star, MapPin, ShieldCheck } from 'lucide-react';
import type { ExtendedSitter } from '@/features/sitters/types';
import { SITTER_CONFIG } from '@/features/sitters/config/sitters.config';

interface SitterCardProps {
    sitter: ExtendedSitter;
    onViewProfile: (sitter: ExtendedSitter) => void;
    onHire: (sitter: ExtendedSitter) => void;
}

export function SitterCard({ sitter, onViewProfile, onHire }: SitterCardProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col h-full hover:shadow-lg hover:border-orange-200 dark:hover:border-orange-500/50 transition-all duration-300">
            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
                <img 
                    src={sitter.profileImageUrl || SITTER_CONFIG.IMAGES.DEFAULT_AVATAR} 
                    alt={sitter.sitterName}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md"
                />
                <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{sitter.sitterName}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {sitter.location}
                    </p>
                </div>
                {sitter.isVerified && <span title="Verificado"><ShieldCheck className="w-6 h-6 text-blue-500 flex-shrink-0" /></span>}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 border-y border-gray-100 dark:border-gray-700 py-2 my-2">
                <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                    <span className="font-bold text-gray-900 dark:text-white">{sitter.averageRating?.toFixed(1) || 'Nuevo'}</span>
                </div>
                <div><span className="font-bold text-gray-900 dark:text-white">${sitter.hourlyRate}</span> / hora</div>
                <div><span className="font-bold text-gray-900 dark:text-white">{sitter.totalServices || 0}</span> servicios</div>
            </div>
            
            {/* Bio */}
            <p className="text-sm text-gray-600 dark:text-gray-400 flex-grow mb-4">
                {sitter.bio ? `"${sitter.bio.substring(0, 100)}..."` : SITTER_CONFIG.DEFAULT_TEXTS.NO_BIO}
            </p>

            {/* Actions */}
            <div className="flex gap-3 mt-auto">
                <button onClick={() => onHire(sitter)} className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 font-semibold transition-colors">
                    Contratar
                </button>
                <button onClick={() => onViewProfile(sitter)} className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 font-semibold transition-colors">
                    Ver Perfil
                </button>
            </div>
        </div>
    );
}
