import * as React from "react"

import { cn } from "@/lib/utils"
import { PencilLine } from "lucide-react"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  divStyle?: string
  error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, helperText, label, divStyle, ...props }, ref) => {
    const inputId = React.useId()

    return (
      <div className="grid w-full">
        {label && (
          <label htmlFor={inputId} className="font-inter font-normal text-black-500 text-sm mb-2">
            {label}
          </label>
        )}

        <div data-error={error} className={cn("relative flex justify-center h-10 gap-3 px-2 w-full border border-black-600 data-[error=true]:border-red-500 rounded-md items-center transition-all shadow-inner overflow-clip", divStyle)}>
          <input
            id={inputId}
            type={type}
            className={cn(
              "peer font-poppins font-bold placeholder:font-incosolata placeholder:font-normal text-black-900 flex h-9 w-full rounded-md bg-background text-sm outline-none file:border-0 border-0 ring-0 focus-visible:border-0 focus-visib:lering-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            ref={ref}
            {...props}
          />

          <PencilLine size={12} className="absolute top-1 right-2 text-black-900" />
        </div>

        {helperText && (
          <small className="font-inter font-light text-redpoke text-sm">
            {helperText}
          </small>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }