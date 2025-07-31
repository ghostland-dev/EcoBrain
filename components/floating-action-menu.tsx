"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, MessageCircle, Calculator, FileText, Zap, X, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ChatBot } from "./chat-bot"
import Link from "next/link"

interface FloatingAction {
  id: string
  label: string
  icon: React.ReactNode
  action: () => void
  color: string
  href?: string
}

export function FloatingActionMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [showChatBot, setShowChatBot] = useState(false)

  const actions: FloatingAction[] = [
    {
      id: "chat",
      label: "Assistant IA",
      icon: <MessageCircle className="w-5 h-5" />,
      action: () => setShowChatBot(true),
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      id: "audit",
      label: "Audit Gratuit",
      icon: <Zap className="w-5 h-5" />,
      action: () => {},
      color: "bg-green-600 hover:bg-green-700",
      href: "/audit",
    },
    {
      id: "calculator",
      label: "Calculateur ROI",
      icon: <Calculator className="w-5 h-5" />,
      action: () => {
        document.getElementById("roi-calculator")?.scrollIntoView({ behavior: "smooth" })
      },
      color: "bg-purple-600 hover:bg-purple-700",
    },
    {
      id: "demo",
      label: "Voir Démo",
      icon: <FileText className="w-5 h-5" />,
      action: () => {},
      color: "bg-orange-600 hover:bg-orange-700",
      href: "/dashboard",
    },
    {
      id: "help",
      label: "Centre d'Aide",
      icon: <HelpCircle className="w-5 h-5" />,
      action: () => {
        window.open("mailto:support@ecobrain.fr", "_blank")
      },
      color: "bg-gray-600 hover:bg-gray-700",
    },
  ]

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleActionClick = (action: FloatingAction) => {
    if (action.href) {
      return // Let Link handle navigation
    }
    action.action()
    setIsOpen(false)
  }

  return (
    <TooltipProvider>
      <div className="fixed bottom-6 right-6 z-50">
        {/* Chat Bot */}
        <AnimatePresence>
          {showChatBot && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="absolute bottom-20 right-0 mb-4"
            >
              <ChatBot onClose={() => setShowChatBot(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-20 right-0 space-y-3"
            >
              {actions.map((action, index) => (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, x: 20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.8 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white dark:bg-gray-800 px-3 py-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700"
                  >
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {action.label}
                    </span>
                  </motion.div>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      {action.href ? (
                        <Link href={action.href}>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={`w-12 h-12 rounded-full ${action.color} text-white shadow-lg flex items-center justify-center transition-colors`}
                          >
                            {action.icon}
                          </motion.button>
                        </Link>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleActionClick(action)}
                          className={`w-12 h-12 rounded-full ${action.color} text-white shadow-lg flex items-center justify-center transition-colors`}
                        >
                          {action.icon}
                        </motion.button>
                      )}
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p>{action.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className="w-14 h-14 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-xl"
            >
              <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
                {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
              </motion.div>
            </motion.button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>{isOpen ? "Fermer le menu" : "Menu d'actions rapides"}</p>
          </TooltipContent>
        </Tooltip>

        {/* Pulse Animation */}
        {!isOpen && (
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute inset-0 w-14 h-14 bg-green-600 rounded-full -z-10"
          />
        )}
      </div>
    </TooltipProvider>
  )
}
