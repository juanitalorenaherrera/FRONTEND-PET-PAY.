// ===========================================
// hooks/useDebounce.ts - Hook de debounce COMPLETO
// ===========================================

import { useState, useEffect, useRef, useCallback } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

// Hook más avanzado con cancelación manual
export function useAdvancedDebounce<T>(
    value: T, 
    delay: number,
    options: {
        leading?: boolean;
        trailing?: boolean;
        maxWait?: number;
    } = {}
) {
    const { leading = false, trailing = true, maxWait } = options;
    
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const maxTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const lastCallTimeRef = useRef<number>(0);
    const lastInvokeTimeRef = useRef<number>(0);

    const cancel = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        if (maxTimeoutRef.current) {
            clearTimeout(maxTimeoutRef.current);
            maxTimeoutRef.current = null;
        }
    }, []);

    const flush = useCallback(() => {
        if (timeoutRef.current) {
            setDebouncedValue(value);
            cancel();
        }
    }, [value, cancel]);

    useEffect(() => {
        const now = Date.now();
        lastCallTimeRef.current = now;

        const invokeFunc = () => {
            lastInvokeTimeRef.current = Date.now();
            setDebouncedValue(value);
        };

        const shouldInvoke = () => {
            const timeSinceLastCall = now - lastCallTimeRef.current;
            const timeSinceLastInvoke = now - lastInvokeTimeRef.current;

            return (
                lastCallTimeRef.current === 0 ||
                timeSinceLastCall >= delay ||
                (maxWait !== undefined && timeSinceLastInvoke >= maxWait)
            );
        };

        if (leading && shouldInvoke()) {
            invokeFunc();
        }

        cancel();

        if (trailing) {
            timeoutRef.current = setTimeout(() => {
                invokeFunc();
            }, delay);
        }

        if (maxWait !== undefined) {
            maxTimeoutRef.current = setTimeout(() => {
                if (timeoutRef.current) {
                    invokeFunc();
                    cancel();
                }
            }, maxWait);
        }

        return cancel;
    }, [value, delay, leading, trailing, maxWait, cancel]);

    return {
        debouncedValue,
        cancel,
        flush
    };
}
