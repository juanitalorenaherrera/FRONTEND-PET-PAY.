import React from 'react';
import { cn } from '../../lib/utils';   // 'cn' es una utilidad para fusionar clases de Tailwind, muy recomendada.

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-gray-200', className)}
      {...props}
    />
  );
}
