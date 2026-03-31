import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
    title: string;
    message: string;
    onRetry: () => void;
    className?: string;
}

export function ErrorState({ title, message, onRetry, className = '' }: ErrorStateProps) {
    return (
        <div className={`space-y-8 ${className}`}>
            <div className="text-center py-16 bg-red-50 border border-red-200 rounded-2xl shadow-sm">
                <div className="max-w-md mx-auto px-4">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-red-900 mb-3">
                        {title}
                    </h3>
                    <p className="text-red-700 mb-6 leading-relaxed">
                        {message}
                    </p>
                    <div className="flex gap-3 justify-center">
                        <button 
                            onClick={onRetry}
                            className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-lg hover:shadow-xl flex items-center gap-2"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Reintentar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
