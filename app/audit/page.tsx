"use client"

import { useState, useEffect } from "react"
import { AnimatedAuditForm } from "@/components/animated-audit-form"
import { EnhancedResults } from "@/components/enhanced-results"
import { EnhancedNavigation } from "@/components/enhanced-navigation"
import { FloatingActionMenu } from "@/components/floating-action-menu"
import { UserOnboarding } from "@/components/user-onboarding"

export default function AuditPage() {
  const [showResults, setShowResults] = useState(false)
  const [auditData, setAuditData] = useState(null)
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    // Vérifier si l'onboarding a déjà été fait
    const onboardingCompleted = localStorage.getItem("ecobrain-onboarding-completed")
    if (!onboardingCompleted) {
      setShowOnboarding(true)
    }
  }, [])

  const handleAuditComplete = (data: any) => {
    setAuditData(data)
    setShowResults(true)
  }

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <EnhancedNavigation />

      <main className="container mx-auto px-4 py-8">
        {!showResults ? (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Audit Écologique Gratuit</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Découvrez votre potentiel d'économies en 2 minutes
              </p>
            </div>
            <AnimatedAuditForm onComplete={handleAuditComplete} />
          </div>
        ) : (
          <EnhancedResults auditData={auditData} />
        )}
      </main>

      <FloatingActionMenu />

      <UserOnboarding isVisible={showOnboarding} onComplete={handleOnboardingComplete} />
    </div>
  )
}
