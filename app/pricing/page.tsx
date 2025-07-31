"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, X, Star, Zap, Crown, Shield, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { EnhancedNavigation } from "@/components/enhanced-navigation"
import { ScrollReveal, AnimatedCounter } from "@/components/micro-interactions"
import Link from "next/link"

const plans = [
  {
    id: "starter",
    name: "Starter",
    description: "Parfait pour les petites entreprises",
    monthlyPrice: 97,
    yearlyPrice: 970,
    icon: <Zap className="w-6 h-6" />,
    color: "from-green-500 to-emerald-600",
    popular: false,
    features: [
      "Audit écologique complet",
      "Dashboard temps réel",
      "Jusqu'à 50 employés",
      "Recommandations IA",
      "Rapports PDF",
      "Support email",
      "Conformité CSRD de base",
      "1 site web analysé",
    ],
    limits: ["Analyses limitées à 10/mois", "Pas d'API access", "Pas de white-label"],
  },
  {
    id: "professional",
    name: "Professional",
    description: "Pour les entreprises en croissance",
    monthlyPrice: 197,
    yearlyPrice: 1970,
    icon: <Star className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-600",
    popular: true,
    features: [
      "Tout du plan Starter",
      "Jusqu'à 200 employés",
      "Analyses illimitées",
      "API access complet",
      "Intégrations avancées",
      "Support prioritaire",
      "Conformité CSRD avancée",
      "5 sites web analysés",
      "Rapports personnalisés",
      "Alertes temps réel",
    ],
    limits: ["Pas de white-label", "Support limité aux heures ouvrables"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Solution sur mesure pour les grandes entreprises",
    monthlyPrice: 497,
    yearlyPrice: 4970,
    icon: <Crown className="w-6 h-6" />,
    color: "from-purple-500 to-pink-600",
    popular: false,
    features: [
      "Tout du plan Professional",
      "Employés illimités",
      "Sites web illimités",
      "White-label complet",
      "Support 24/7 dédié",
      "Conformité CSRD premium",
      "Intégrations sur mesure",
      "Formation équipe incluse",
      "SLA garanti 99.9%",
      "Déploiement on-premise",
      "Audit de sécurité",
      "Account manager dédié",
    ],
    limits: [],
  },
]

const faqs = [
  {
    question: "Puis-je changer de plan à tout moment ?",
    answer:
      "Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Les changements prennent effet immédiatement et la facturation est ajustée au prorata.",
  },
  {
    question: "Y a-t-il une période d'essai gratuite ?",
    answer:
      "Oui, tous nos plans incluent un essai gratuit de 14 jours. Aucune carte de crédit n'est requise pour commencer.",
  },
  {
    question: "Que se passe-t-il si je dépasse les limites de mon plan ?",
    answer:
      "Nous vous préviendrons avant d'atteindre les limites. Vous pourrez alors upgrader votre plan ou acheter des crédits supplémentaires.",
  },
  {
    question: "Les données sont-elles sécurisées ?",
    answer:
      "Absolument. Nous utilisons un chiffrement de niveau bancaire et sommes conformes RGPD. Vos données ne sont jamais partagées avec des tiers.",
  },
  {
    question: "Proposez-vous des remises pour les associations ?",
    answer:
      "Oui, nous offrons 50% de réduction pour les associations, ONG et établissements d'enseignement. Contactez-nous pour plus d'informations.",
  },
]

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState("professional")

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <EnhancedNavigation />

      <main className="container mx-auto px-4 py-16">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <Badge className="bg-green-100 text-green-800 mb-4">
              💰 Économisez jusqu'à 20% avec la facturation annuelle
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">Tarifs Transparents</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Choisissez le plan qui correspond à vos besoins. Tous les plans incluent un essai gratuit de 14 jours.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-12">
              <span
                className={`text-sm ${!isYearly ? "text-gray-900 dark:text-white font-semibold" : "text-gray-500"}`}
              >
                Mensuel
              </span>
              <Switch checked={isYearly} onCheckedChange={setIsYearly} />
              <span className={`text-sm ${isYearly ? "text-gray-900 dark:text-white font-semibold" : "text-gray-500"}`}>
                Annuel
              </span>
              {isYearly && <Badge className="bg-green-100 text-green-800 ml-2">-20%</Badge>}
            </div>
          </div>
        </ScrollReveal>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <ScrollReveal key={plan.id} delay={index * 0.1}>
              <motion.div whileHover={{ scale: 1.02, y: -5 }} className="relative">
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1">
                      ⭐ Plus Populaire
                    </Badge>
                  </div>
                )}

                <Card
                  className={`h-full ${plan.popular ? "ring-2 ring-blue-500 shadow-xl" : "shadow-lg"} hover:shadow-2xl transition-all duration-300`}
                >
                  <CardHeader className="text-center pb-8">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white`}
                    >
                      {plan.icon}
                    </div>
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <CardDescription className="text-base">{plan.description}</CardDescription>

                    <div className="mt-6">
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">
                          €
                          <AnimatedCounter
                            from={0}
                            to={isYearly ? Math.floor(plan.yearlyPrice / 12) : plan.monthlyPrice}
                          />
                        </span>
                        <span className="text-gray-500 ml-2">/mois</span>
                      </div>
                      {isYearly && <div className="text-sm text-gray-500 mt-2">Facturé €{plan.yearlyPrice}/an</div>}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Features */}
                    <div className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}

                      {plan.limits.map((limit, limitIndex) => (
                        <div key={limitIndex} className="flex items-center opacity-60">
                          <X className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                          <span className="text-sm text-gray-500 line-through">{limit}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Button
                      className={`w-full py-3 text-lg font-semibold ${
                        plan.popular
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          : "bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                      }`}
                      onClick={() => setSelectedPlan(plan.id)}
                      asChild
                    >
                      <Link href="/auth/signup">
                        Commencer l'essai gratuit
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Link>
                    </Button>

                    <p className="text-xs text-center text-gray-500">14 jours gratuits • Aucune carte requise</p>
                  </CardContent>
                </Card>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Enterprise CTA */}
        <ScrollReveal>
          <Card className="bg-gradient-to-r from-gray-900 to-gray-800 text-white mb-20">
            <CardContent className="p-12 text-center">
              <Shield className="w-16 h-16 mx-auto mb-6 text-blue-400" />
              <h3 className="text-3xl font-bold mb-4">Besoin d'une Solution Sur Mesure ?</h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Pour les grandes entreprises avec des besoins spécifiques, nous proposons des solutions personnalisées
                avec SLA garantis et support dédié.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100" asChild>
                  <Link href="/contact">Demander un Devis</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 bg-transparent"
                  asChild
                >
                  <Link href="/demo">Planifier une Démo</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* FAQ Section */}
        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Questions Fréquentes</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{faq.question}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Final CTA */}
        <ScrollReveal>
          <div className="text-center mt-20">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Prêt à Commencer ?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Rejoignez plus de 500 entreprises qui font confiance à EcoBrain
            </p>
            <Button size="lg" className="bg-green-600 hover:bg-green-700 px-8" asChild>
              <Link href="/auth/signup">
                Démarrer l'Essai Gratuit
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </main>
    </div>
  )
}
