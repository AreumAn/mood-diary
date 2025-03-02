import type * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-indigo-500 focus-visible:ring-indigo-200/50 aria-invalid:ring-red-300/20 dark:aria-invalid:ring-red-500/40 aria-invalid:border-red-500 flex field-sizing-content min-h-16 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-base shadow-xs transition-all duration-200 outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-slate-600 dark:placeholder:text-slate-500 hover:border-slate-400 dark:hover:border-slate-500",
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }

