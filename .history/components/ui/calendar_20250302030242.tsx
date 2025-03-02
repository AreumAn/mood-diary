"use client"

import type * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Calendar({ className, classNames, showOutsideDays = true, ...props }: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-sm font-medium text-slate-800 dark:text-slate-200",
        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "size-8 bg-transparent p-0 opacity-70 hover:opacity-100 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-x-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] text-slate-500 dark:text-slate-400",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-slate-100 [&:has([aria-selected].day-range-end)]:rounded-r-md dark:[&:has([aria-selected])]:bg-slate-700",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md",
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-9 p-0 font-normal aria-selected:opacity-100 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200",
        ),
        day_range_start: "day-range-start aria-selected:bg-indigo-500 aria-selected:text-white",
        day_range_end: "day-range-end aria-selected:bg-indigo-500 aria-selected:text-white",
        day_selected:
          "bg-indigo-500 text-white hover:bg-indigo-600 hover:text-white focus:bg-indigo-500 focus:text-white dark:bg-indigo-600 dark:hover:bg-indigo-700",
        day_today: "bg-slate-100 text-slate-900 dark:bg-slate-700 dark:text-white",
        day_outside: "day-outside text-slate-400 aria-selected:text-white dark:text-slate-500",
        day_disabled: "text-slate-400 opacity-50 dark:text-slate-600",
        day_range_middle:
          "aria-selected:bg-slate-100 aria-selected:text-slate-900 dark:aria-selected:bg-slate-700 dark:aria-selected:text-white",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => <ChevronLeft className={cn("size-4", className)} {...props} />,
        IconRight: ({ className, ...props }) => <ChevronRight className={cn("size-4", className)} {...props} />,
      }}
      {...props}
    />
  )
}

export { Calendar }

