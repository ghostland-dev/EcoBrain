"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight, ArrowLeft, CheckCircle, Lightbulb, Target, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface OnboardingStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  target: string
  position: "top" | "bottom" | "left" | "right"
  action?: string
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: "welcome",
    title: "Bienvenue sur EcoBrain ! 🎉",
    description: "Découvrez comment transformer votre entreprise en leader écologique tout en économisant de l'argent.",
    icon: <Lightbulb className="w-6 h-6 text-yellow-500" />,
    target: "hero-section",
    position: "bottom",
    action: "Commencer la visite",
  },
  {
    id: "audit",
    title: "Audit Gratuit en 2 Minutes",
    description: "Notre IA analyse vos processus et identifie immédiatement les opportunités d'économies écologiques.",
    icon: <Target className="w-6 h-6 text-blue-500" />,
    target: "audit-button",
    position: "bottom",
    action: "Essayer l'audit",
  },
  {
    id: "dashboard",
    title: "Dashboard Interactif",
    description: "Visualisez vos performances, suivez vos progrès et recevez des recommandations personnalisées.",
    icon: <Zap className="w-6 h-6 text-purple-500" />,
    target: "dashboard-link",
    position: "left",
    action: "Voir la démo",
  },
  {
    id: "roi",
    title: "Calculateur ROI",
    description: "Découvrez exactement combien vous pouvez économiser avec EcoBrain selon votre profil d'entreprise.",
    icon: <CheckCircle className="w-6 h-6 text-green-500" />,
    target: "roi-calculator",
    position: "top",
    action: "Calculer mes économies",
  },
]

interface UserOnboardingProps {
  isVisible: boolean
  onComplete: () => void
}

export function UserOnboarding({ isVisible, onComplete }: UserOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setIsActive(true)
    }
  }, [isVisible])

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      completeOnboarding()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const completeOnboarding = () => {
    setIsActive(false)
    onComplete()
    localStorage.setItem("ecobrain-onboarding-completed", "true")
  }

  const skipOnboarding = () => {
    completeOnboarding()
  }

  const currentStepData = onboardingSteps[currentStep]

  if (!isActive) return null

  return (
    <AnimatePresence>
      {isActive && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />

          {/* Spotlight effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none"
            style={{
              background: `radial-gradient(circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), transparent 150px, rgba(0,0,0,0.8) 300px)`,
            }}
          />

          {/* Onboarding Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <Card className="shadow-2xl border-2 border-green-200 bg-white dark:bg-gray-900">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {currentStepData.icon}
                    <Badge variant="outline" className="text-xs">
                      {currentStep + 1}/{onboardingSteps.length}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm" onClick={skipOnboarding}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <motion.h3
                    key={currentStepData.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xl font-bold text-gray-900 dark:text-white"
                  >
                    {currentStepData.title}
                  </motion.h3>

                  <motion.p
                    key={currentStepData.description}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-600 dark:text-gray-300 leading-relaxed"
                  >
                    {currentStepData.description}
                  </motion.p>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="bg-green-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-4">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 0}
                      className="bg-transparent"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Précédent
                    </Button>

                    <div className="flex space-x-2">
                      <Button variant="ghost" onClick={skipOnboarding} className="text-gray-500">
                        Passer
                      </Button>
                      <Button onClick={nextStep} className="bg-green-600 hover:bg-green-700">
                        {currentStep === onboardingSteps.length - 1 ? "Terminer" : currentStepData.action}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Step indicators */}
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
            <div className="flex space-x-2">
              {onboardingSteps.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-3 h-3 rounded-full cursor-pointer ${
                    index === currentStep ? "bg-green-600" : index < currentStep ? "bg-green-400" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentStep(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
