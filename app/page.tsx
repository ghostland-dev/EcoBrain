"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Play, CheckCircle, TrendingUp, Award, Zap, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { EnhancedNavigation } from "@/components/enhanced-navigation"
import { FloatingActionMenu } from "@/components/floating-action-menu"
import { UserOnboarding } from "@/components/user-onboarding"
import { ROICalculator } from "@/components/roi-calculator"
import { Testimonials } from "@/components/testimonials"
import { AuditForm } from "@/components/audit-form"
import { ScrollReveal, AnimatedCounter, TypingText, HoverCard3D, AnimatedButton } from "@/components/micro-interactions"
import Link from "next/link"

export default function HomePage() {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showAuditForm, setShowAuditForm] = useState(false)

  useEffect(() => {
    // Vérifier si l'onboarding a déjà été fait
    const onboardingCompleted = localStorage.getItem("ecobrain-onboarding-completed")
    if (!onboardingCompleted) {
      // Délai avant d'afficher l'onboarding
      setTimeout(() => setShowOnboarding(true), 2000)
    }
  }, [])

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <EnhancedNavigation />

      {/* Hero Section */}
      <section id="hero-section" className="relative overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200 transition-colors">
                    🚀 Nouveau : Conformité CSRD automatisée
                  </Badge>
                  <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                    <TypingText text="Conformité Écologique Simplifiée par l'IA" speed={80} className="gradient-text" />
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                    Transformez votre entreprise en leader écologique tout en économisant de l'argent. Audit gratuit en
                    2 minutes, résultats garantis.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <AnimatedButton
                    onClick={() => setShowAuditForm(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg"
                    size="lg"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Audit Gratuit (2 min)
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </AnimatedButton>

                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8 py-4 text-lg bg-transparent border-2 hover:bg-gray-50 dark:hover:bg-gray-800"
                    asChild
                  >
                    <Link href="/dashboard">
                      <Play className="w-5 h-5 mr-2" />
                      Voir la Démo
                    </Link>
                  </Button>
                </div>

                <div className="flex items-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    Gratuit et sans engagement
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    Résultats en 24h
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    ROI garanti
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="relative">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <img
                    src="/placeholder.svg?height=600&width=800"
                    alt="EcoBrain Dashboard"
                    className="rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700"
                  />
                </motion.div>

                {/* Floating elements */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute -top-4 -right-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg"
                >
                  <Leaf className="w-8 h-8" />
                </motion.div>

                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      <AnimatedCounter from={0} to={97} suffix="%" />
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Conformité CSRD</div>
                  </div>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <ScrollReveal>
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  <AnimatedCounter from={0} to={500} suffix="+" />
                </div>
                <div className="text-gray-600 dark:text-gray-400">Entreprises accompagnées</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  €<AnimatedCounter from={0} to={3200} />
                </div>
                <div className="text-gray-600 dark:text-gray-400">Économies moyennes/an</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  <AnimatedCounter from={0} to={95} suffix="%" />
                </div>
                <div className="text-gray-600 dark:text-gray-400">Conformité CSRD</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">
                  <AnimatedCounter from={0} to={24} suffix="h" />
                </div>
                <div className="text-gray-600 dark:text-gray-400">Délai de résultats</div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Pourquoi Choisir EcoBrain ?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                La seule plateforme qui transforme la conformité écologique en avantage concurrentiel
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            <ScrollReveal delay={0.1}>
              <HoverCard3D>
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">Audit IA en 2 Minutes</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base leading-relaxed">
                    Notre IA analyse votre infrastructure, supply chain et consommation énergétique pour identifier
                    immédiatement les opportunités d'économies.
                  </CardDescription>
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      Scan automatique complet
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      Recommandations personnalisées
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      Score de conformité instantané
                    </div>
                  </div>
                </CardContent>
              </HoverCard3D>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <HoverCard3D>
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">ROI Garanti dès le 1er Mois</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base leading-relaxed">
                    Nos clients économisent en moyenne 3 200€/an grâce à l'optimisation automatique de leurs processus
                    et la réduction des taxes carbone.
                  </CardDescription>
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      Économies hébergement web
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      Optimisation supply chain
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      Réduction taxes carbone
                    </div>
                  </div>
                </CardContent>
              </HoverCard3D>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <HoverCard3D>
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">Conformité CSRD Automatisée</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base leading-relaxed">
                    Atteignez 95% de conformité CSRD automatiquement avec nos rapports générés par IA et notre suivi en
                    temps réel.
                  </CardDescription>
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      Rapports automatiques
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      Suivi temps réel
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      Alertes de conformité
                    </div>
                  </div>
                </CardContent>
              </HoverCard3D>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <ScrollReveal>
        <section id="roi-calculator" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Calculez Vos Économies Potentielles
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Découvrez combien vous pouvez économiser avec EcoBrain
              </p>
            </div>
            <ROICalculator />
          </div>
        </section>
      </ScrollReveal>

      {/* Testimonials Section */}
      <ScrollReveal>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Ils Nous Font Confiance
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Plus de 500 entreprises ont déjà transformé leur approche écologique
              </p>
            </div>
            <Testimonials />
          </div>
        </section>
      </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal>
        <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Prêt à Transformer Votre Entreprise ?</h2>
              <p className="text-xl text-green-100 mb-8">
                Rejoignez les 500+ entreprises qui économisent déjà avec EcoBrain
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AnimatedButton
                  onClick={() => setShowAuditForm(true)}
                  className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                  size="lg"
                >
                  Commencer l'Audit Gratuit
                  <ArrowRight className="w-5 h-5 ml-2" />
                </AnimatedButton>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg bg-transparent"
                  asChild
                >
                  <Link href="/dashboard">Voir la Démo Interactive</Link>
                </Button>
              </div>
              <p className="text-green-100 text-sm mt-6">
                ✅ Gratuit et sans engagement • ✅ Résultats en 24h • ✅ Support inclus
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Floating Action Menu */}
      <FloatingActionMenu />

      {/* Onboarding */}
      <UserOnboarding isVisible={showOnboarding} onComplete={handleOnboardingComplete} />

      {/* Audit Form Modal */}
      {showAuditForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Audit Écologique Gratuit</h2>
                <Button
                  variant="ghost"
                  onClick={() => setShowAuditForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </Button>
              </div>
              <AuditForm />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
