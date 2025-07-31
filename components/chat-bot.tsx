"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Send, X, Bot, User, Loader2, ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  suggestions?: string[]
  rating?: "positive" | "negative" | null
}

interface ChatBotProps {
  onClose: () => void
  currentStep?: number
}

const predefinedResponses: Record<string, { content: string; suggestions?: string[] }> = {
  hello: {
    content:
      "Bonjour ! Je suis l'assistant EcoBrain. Je peux vous aider avec votre audit écologique, répondre à vos questions sur la conformité CSRD, ou vous expliquer comment économiser avec nos solutions. Comment puis-je vous aider ?",
    suggestions: ["Commencer un audit", "Questions sur CSRD", "Calculer mes économies", "Voir les tarifs"],
  },
  audit: {
    content:
      "L'audit EcoBrain analyse votre empreinte carbone en 2 minutes ! Il examine votre infrastructure IT, supply chain, consommation énergétique et vous donne un score avec des recommandations personnalisées. Voulez-vous commencer ?",
    suggestions: ["Oui, commencer l'audit", "Combien ça coûte ?", "Que va analyser l'audit ?"],
  },
  csrd: {
    content:
      "La directive CSRD (Corporate Sustainability Reporting Directive) oblige les entreprises à publier des rapports de durabilité détaillés. EcoBrain vous aide à atteindre 95% de conformité automatiquement. Besoin d'aide spécifique ?",
    suggestions: ["Qui est concerné par CSRD ?", "Quelles sont les échéances ?", "Comment EcoBrain aide ?"],
  },
  pricing: {
    content:
      "EcoBrain coûte 97€/mois avec un ROI garanti dès le premier mois. Nos clients économisent en moyenne 3 200€/an. L'audit initial est gratuit et sans engagement. Voulez-vous voir le détail ?",
    suggestions: ["Voir les fonctionnalités", "Calculer mon ROI", "Essai gratuit"],
  },
  savings: {
    content:
      "Nos clients économisent en moyenne 3 200€/an grâce à l'optimisation de l'hébergement web (-890€), supply chain locale (-2 340€), et transition énergétique (-1 560€). Voulez-vous calculer vos économies personnalisées ?",
    suggestions: ["Calculer mes économies", "Voir des exemples", "Commencer l'audit"],
  },
}

const quickSuggestions = [
  "Comment fonctionne l'audit ?",
  "Qu'est-ce que la CSRD ?",
  "Combien puis-je économiser ?",
  "Quels sont vos tarifs ?",
  "Comment commencer ?",
]

export function ChatBot({ onClose, currentStep }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: predefinedResponses.hello.content,
      timestamp: new Date(),
      suggestions: predefinedResponses.hello.suggestions,
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const getResponse = (input: string): { content: string; suggestions?: string[] } => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("audit") || lowerInput.includes("analyse")) {
      return predefinedResponses.audit
    }
    if (lowerInput.includes("csrd") || lowerInput.includes("conformité") || lowerInput.includes("directive")) {
      return predefinedResponses.csrd
    }
    if (lowerInput.includes("prix") || lowerInput.includes("tarif") || lowerInput.includes("coût")) {
      return predefinedResponses.pricing
    }
    if (lowerInput.includes("économie") || lowerInput.includes("économiser") || lowerInput.includes("roi")) {
      return predefinedResponses.savings
    }
    if (lowerInput.includes("bonjour") || lowerInput.includes("salut") || lowerInput.includes("hello")) {
      return predefinedResponses.hello
    }

    // Réponse par défaut
    return {
      content:
        "Je comprends votre question. Pour une réponse personnalisée, je vous recommande de commencer par notre audit gratuit qui analysera votre situation spécifique. Sinon, n'hésitez pas à reformuler votre question !",
      suggestions: ["Commencer l'audit gratuit", "Parler à un expert", "Voir la FAQ"],
    }
  }

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simuler un délai de réponse
    setTimeout(
      () => {
        const response = getResponse(content)
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content: response.content,
          timestamp: new Date(),
          suggestions: response.suggestions,
        }

        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  const handleRating = (messageId: string, rating: "positive" | "negative") => {
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, rating } : msg)))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(inputValue)
    }
  }

  return (
    <Card className="w-96 h-[500px] shadow-2xl border-2 border-green-200 dark:border-green-800 flex flex-col">
      <CardHeader className="pb-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-lg">Assistant EcoBrain</CardTitle>
              <div className="flex items-center space-x-1 text-green-100 text-sm">
                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                <span>En ligne</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[80%] ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === "user"
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {message.type === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className="space-y-2">
                    <div
                      className={`p-3 rounded-lg ${
                        message.type === "user"
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>

                    {message.suggestions && (
                      <div className="flex flex-wrap gap-1">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs h-7 bg-transparent"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}

                    {message.type === "bot" && (
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">Cette réponse était-elle utile ?</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRating(message.id, "positive")}
                          className={`h-6 w-6 p-0 ${message.rating === "positive" ? "text-green-600" : "text-gray-400"}`}
                        >
                          <ThumbsUp className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRating(message.id, "negative")}
                          className={`h-6 w-6 p-0 ${message.rating === "negative" ? "text-red-600" : "text-gray-400"}`}
                        >
                          <ThumbsDown className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </ScrollArea>

        {/* Quick suggestions */}
        {messages.length === 1 && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 mb-2">Suggestions rapides :</div>
            <div className="flex flex-wrap gap-1">
              {quickSuggestions.slice(0, 3).map((suggestion, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-green-50 dark:hover:bg-green-900/20 text-xs"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Input area */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tapez votre message..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isTyping}
              className="bg-green-600 hover:bg-green-700"
            >
              {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
