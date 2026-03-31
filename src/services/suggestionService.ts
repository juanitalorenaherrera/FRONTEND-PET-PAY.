import { MapPin, User, Tag } from 'lucide-react';
import type { SearchSuggestion } from '@/features/sitters/components/SitterSearchBar'; // El tipo vivirá junto al componente

// En una aplicación real, esta función haría una llamada a un endpoint como `/api/search/suggestions?q=...`
export async function getSitterSuggestions(query: string): Promise<SearchSuggestion[]> {
    try {
        console.log(`Fetching suggestions for: "${query}"`);

        // Simulamos un pequeño retraso de red
        await new Promise(resolve => setTimeout(resolve, 150));

        if (query.length < 2) {
            console.log('⚠️ Query too short, returning empty array');
            return [];
        }

        const mockSuggestions: SearchSuggestion[] = [
            { type: 'location', value: 'Las Condes', label: 'Las Condes, Santiago', icon: MapPin },
            { type: 'location', value: 'Providencia', label: 'Providencia, Santiago', icon: MapPin },
            { type: 'sitter', value: 'María González', label: 'María González', icon: User },
            { type: 'specialty', value: 'Paseo de perros', label: 'Paseo de perros', icon: Tag },
            { type: 'specialty', value: 'Cuidado nocturno', label: 'Cuidado nocturno', icon: Tag }
        ].filter(s => s.label.toLowerCase().includes(query.toLowerCase()));

        console.log(`✅ Found ${mockSuggestions.length} suggestions:`, mockSuggestions);
        return mockSuggestions;
    } catch (error) {
        console.error('❌ Error in getSitterSuggestions:', error);
        return [];
    }
}
