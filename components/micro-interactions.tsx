"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Animated Counter
interface AnimatedCounterProps {
  from: number
  to: number
  duration?: number
  suffix?: string
  prefix?: string
}

export function AnimatedCounter({ from, to, duration = 2, suffix = "", prefix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(from)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const startTime = Date.now()
      const endTime = startTime + duration * 1000

      const updateCount = () => {
        const now = Date.now()
        const progress = Math.min((now - startTime) / (endTime - startTime), 1)
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentCount = Math.floor(from + (to - from) * easeOutQuart)

        setCount(currentCount)

        if (progress < 1) {
          requestAnimationFrame(updateCount)
        }
      }

      requestAnimationFrame(updateCount)
    }
  }, [isInView, from, to, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

// Hover Card with 3D effect
interface HoverCard3DProps {
  children: React.ReactNode
  className?: string
}

export function HoverCard3D({ children, className = "" }: HoverCard3DProps) {
  return (
    <motion.div
      whileHover={{
        rotateX: 5,
        rotateY: 5,
        scale: 1.02,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ transformStyle: "preserve-3d" }}
      className={`cursor-pointer ${className}`}
    >
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">{children}</Card>
    </motion.div>
  )
}

// Animated Button with ripple effect
interface AnimatedButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "default" | "lg"
  className?: string
}

export function AnimatedButton({
  children,
  onClick,
  variant = "default",
  size = "default",
  className = "",
}: AnimatedButtonProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newRipple = {
      id: Date.now(),
      x,
      y,
    }

    setRipples((prev) => [...prev, newRipple])

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
    }, 600)

    onClick?.()
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative overflow-hidden rounded-md">
      <Button variant={variant} size={size} onClick={handleClick} className={`relative ${className}`}>
        {children}
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute bg-white/30 rounded-full pointer-events-none"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        ))}
      </Button>
    </motion.div>
  )
}

// Animated Progress Bar
interface AnimatedProgressProps {
  value: number
  max?: number
  className?: string
  showValue?: boolean
}

export function AnimatedProgress({ value, max = 100, className = "", showValue = true }: AnimatedProgressProps) {
  const [animatedValue, setAnimatedValue] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setAnimatedValue(value)
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [isInView, value])

  return (
    <div ref={ref} className={`space-y-2 ${className}`}>
      {showValue && (
        <div className="flex justify-between text-sm">
          <span>Progression</span>
          <span className="font-medium">
            <AnimatedCounter from={0} to={Math.round((animatedValue / max) * 100)} suffix="%" />
          </span>
        </div>
      )}
      <Progress value={animatedValue} className="h-3" />
    </div>
  )
}

// Pulse Badge
interface PulseBadgeProps {
  children: React.ReactNode
  variant?: "default" | "secondary" | "destructive" | "outline"
  pulse?: boolean
}

export function PulseBadge({ children, variant = "default", pulse = true }: PulseBadgeProps) {
  return (
    <motion.div
      animate={pulse ? { scale: [1, 1.05, 1] } : {}}
      transition={pulse ? { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" } : {}}
    >
      <Badge variant={variant} className="relative">
        {children}
        {pulse && (
          <motion.div
            className="absolute inset-0 rounded-full bg-current opacity-20"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0, 0.2] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        )}
      </Badge>
    </motion.div>
  )
}

// Typing Text Effect
interface TypingTextProps {
  text: string
  speed?: number
  className?: string
}

export function TypingText({ text, speed = 50, className = "" }: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView && currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timer)
    }
  }, [isInView, currentIndex, text, speed])

  return (
    <span ref={ref} className={className}>
      {displayedText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
          className="inline-block"
        >
          |
        </motion.span>
      )}
    </span>
  )
}

// Scroll Reveal Animation
interface ScrollRevealProps {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  className?: string
}

export function ScrollReveal({ children, direction = "up", delay = 0, className = "" }: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
