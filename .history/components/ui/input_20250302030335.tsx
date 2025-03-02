import type * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-10 w-full min-w-0 rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-base shadow-xs transition-all duration-200 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-slate-600 dark:placeholder:text-slate-500",
        "focus-visible:border-indigo-500 focus-visible:ring-indigo-200/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-red-300/20 dark:aria-invalid:ring-red-500/40 aria-invalid:border-red-500",
        "hover:border-slate-400 dark:hover:border-slate-500",
        className,
      )}
      {...props}
    />
  )
}

export { Input }

