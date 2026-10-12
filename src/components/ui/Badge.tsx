import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "border-transparent bg-primary text-white shadow hover:opacity-80",
    secondary: "border-transparent bg-secondary text-white hover:opacity-80",
    destructive: "border-transparent bg-destructive text-white shadow hover:opacity-80",
    success: "border-transparent bg-success text-white shadow hover:opacity-80",
    outline: "text-foreground border-border",
  }

  return (
    <div className={cn("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2", variants[variant], className)} {...props} />
  )
}

export { Badge }
