"use client"

import { motion } from "framer-motion"
import { Loader2, Leaf } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "default" | "eco" | "dots"
  className?: string
  text?: string
}

export function LoadingSpinner({ size = "md", variant = "default", className, text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  }

  if (variant === "eco") {
    return (
      <div className={cn("flex flex-col items-center justify-center space-y-4", className)}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className={cn("text-green-600", sizeClasses[size])}
        >
          <Leaf />
        </motion.div>
        {text && <p className="text-sm text-gray-600 dark:text-gray-400">{text}</p>}
      </div>
    )
  }

  if (variant === "dots") {
    return (
      <div className={cn("flex flex-col items-center justify-center space-y-4", className)}>
        <div className="flex space-x-1">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: index * 0.2,
              }}
              className={cn("bg-green-600 rounded-full", {
                "w-2 h-2": size === "sm",
                "w-3 h-3": size === "md",
                "w-4 h-4": size === "lg",
                "w-5 h-5": size === "xl",
              })}
            />
          ))}
        </div>
        {text && <p className="text-sm text-gray-600 dark:text-gray-400">{text}</p>}
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col items-center justify-center space-y-4", className)}>
      <Loader2 className={cn("animate-spin text-green-600", sizeClasses[size])} />
      {text && <p className="text-sm text-gray-600 dark:text-gray-400">{text}</p>}
    </div>
  )
}
