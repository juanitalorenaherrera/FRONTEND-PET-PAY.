import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface LoadingSpinnerProps {
    title: string;
    description?: string;
    className?: string;
}

export function LoadingSpinner({ title, description, className }: LoadingSpinnerProps) {
    return (
        <div className={cn("flex flex-col items-center gap-4 text-center", className)}>
            <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            {description && <p className="text-gray-600 max-w-sm">{description}</p>}
        </div>
    );
}
