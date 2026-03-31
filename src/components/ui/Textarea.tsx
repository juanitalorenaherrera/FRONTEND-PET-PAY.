import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          // Base styles
          "flex min-h-[80px] w-full rounded-lg border border-neutral-300 bg-white/50 px-3 py-2 text-sm",
          // Placeholder styles
          "placeholder:text-neutral-400",
          // Focus state (muy importante para la accesibilidad y UX)
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pet-orange focus-visible:ring-offset-2",
          // Disabled state
          "disabled:cursor-not-allowed disabled:opacity-50",
          // Transiciones suaves
          "transition-all duration-200 ease-in-out",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
