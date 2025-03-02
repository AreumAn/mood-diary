import type * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-indigo-500 focus-visible:ring-indigo-200/50 focus-visible:ring-[3px] aria-invalid:ring-red-300/20 dark:aria-invalid:ring-red-500/40 aria-invalid:border-red-500",
  {
    variants: {
      variant: {
        default:
          "bg-indigo-500 text-white shadow-sm hover:bg-indigo-600 active:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:active:bg-indigo-800",
        destructive:
          "bg-red-500 text-white shadow-sm hover:bg-red-600 active:bg-red-700 focus-visible:ring-red-200/50 dark:focus-visible:ring-red-500/40 dark:bg-red-600 dark:hover:bg-red-700 dark:active:bg-red-800",
        outline:
          "border border-slate-300 bg-transparent shadow-sm hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200 dark:border-slate-600 dark:hover:bg-slate-700 dark:hover:text-white dark:active:bg-slate-600",
        secondary:
          "bg-slate-100 text-slate-900 shadow-sm hover:bg-slate-200 active:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600 dark:active:bg-slate-500",
        ghost:
          "hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200 dark:hover:bg-slate-800 dark:hover:text-white dark:active:bg-slate-700",
        link: "text-indigo-500 underline-offset-4 hover:underline dark:text-indigo-400",
      },
      size: {
        default: "h-10 px-4 py-2 has-[>svg]:px-3",
        sm: "h-9 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-xs",
        lg: "h-11 rounded-md px-6 has-[>svg]:px-4 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }

