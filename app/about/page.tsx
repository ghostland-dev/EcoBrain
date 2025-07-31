"use client"

import { motion } from "framer-motion"
import { Users, Globe, Heart, Zap, Leaf } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { EnhancedNavigation } from "@/components/enhanced-navigation"
import { ScrollReveal, AnimatedCounter } from "@/components/micro-interactions"
import Link from "next/link"

const team = [
  {
    name: "Marie Dubois",
    role: "CEO & Co-fondatrice",
    bio: "Ex-consultante McKinsey, spécialisée en transformation durable. 15 ans d'expérience en conseil stratégique.",
    image: "/placeholder.svg?height=300&width=300",
    linkedin: "#",
  },
  {
    name: "Thomas Martin",
    role: "CTO & Co-fondateur",
    bio: "Ancien Lead Engineer chez Google. Expert en IA et développement de solutions SaaS scalables.",
    image: "/placeholder.svg?height=300&width=300",
    linkedin: "#",
  },
  {
    name: "Sophie Laurent",
    role: "Head of Sustainability",
    bio: "Docteure en sciences environnementales, ancienne experte ADEME. Spécialiste CSRD et réglementation.",
    image: "/placeholder.svg?height=300&width=300",
    linkedin: "#",
  },
  {
    name: "Alexandre Chen",
    role: "Head of Product",
    bio: "Ex-Product Manager chez Stripe. Passionné par l'UX et l'impact des produits tech sur l'environnement.",
    image: "/placeholder.svg?height=300&width=300",
    linkedin: "#",
  },
]

const values = [
  {
    icon: <Leaf className="w-8 h-8" />,
    title: "Impact Environnemental",
    description: "Nous croyons que chaque entreprise peut devenir un acteur positif du changement climatique.",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Transparence",
    description: "Nous prônons la transparence totale dans nos méthodes, nos prix et nos résultats.",
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Innovation",
    description: "Nous utilisons les dernières technologies pour simplifier la conformité écologique.",
    color: "from-purple-500 to-pink-600",
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Accessibilité",
    description:
      "Nous rendons la conformité écologique accessible à toutes les entreprises, quelle que soit leur taille.",
    color: "from-orange-500 to-red-600",
  },
]

const milestones = [
  {
    year: "2022",
    title: "Fondation d'EcoBrain",
    description: "Création de l'entreprise avec la vision de démocratiser la conformité écologique.",
  },
  {
    year: "2023",
    title: "Première levée de fonds",
    description: "Levée de 2M€ en seed pour développer notre plateforme IA.",
  },
  {
    year: "2023",
    title: "100 premiers clients",
    description: "Franchissement du cap des 100 entreprises accompagnées.",
  },
  {
    year: "2024",
    title: "Conformité CSRD",
    description: "Lancement de notre module de conformité CSRD automatisée.",
  },
  {
    year: "2024",
    title: "500+ entreprises",
    description: "Plus de 500 entreprises nous font confiance pour leur transition écologique.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <EnhancedNavigation />

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <ScrollReveal>
          <div className="text-center mb-20">
            <Badge className="bg-green-100 text-green-800 mb-4">🌱 Notre Mission</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Démocratiser la Conformité Écologique
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Chez EcoBrain, nous croyons que chaque entreprise, quelle que soit sa taille, peut devenir un acteur
              positif du changement climatique. Notre mission est de rendre la conformité écologique simple, accessible
              et rentable.
            </p>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                <AnimatedCounter from={0} to={500} suffix="+" />
              </div>
              <div className="text-gray-600 dark:text-gray-400">Entreprises accompagnées</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                <AnimatedCounter from={0} to={15} suffix="M€" />
              </div>
              <div className="text-gray-600 dark:text-gray-400">Économies générées</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                <AnimatedCounter from={0} to={2500} suffix=" t" />
              </div>
              <div className="text-gray-600 dark:text-gray-400">CO2 évité</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">
                <AnimatedCounter from={0} to={95} suffix="%" />
              </div>
              <div className="text-gray-600 dark:text-gray-400">Satisfaction client</div>
            </div>
          </div>
        </ScrollReveal>

        {/* Story Section */}
        <ScrollReveal>
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Notre Histoire</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  EcoBrain est né d'un constat simple : la conformité écologique est devenue un enjeu majeur pour toutes
                  les entreprises, mais les outils existants sont complexes, coûteux et réservés aux grandes
                  corporations.
                </p>
                <p>
                  En 2022, Marie Dubois et Thomas Martin, forts de leurs expériences respectives en conseil stratégique
                  et en technologie, ont décidé de créer une solution qui démocratise l'accès à la conformité
                  écologique.
                </p>
                <p>
                  Aujourd'hui, EcoBrain accompagne plus de 500 entreprises dans leur transition écologique, en leur
                  faisant économiser en moyenne 3 200€ par an tout en améliorant leur impact environnemental.
                </p>
              </div>
            </div>
            <div className="relative">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Équipe EcoBrain"
                  className="rounded-2xl shadow-xl"
                />
              </motion.div>
            </div>
          </div>
        </ScrollReveal>

        {/* Values */}
        <ScrollReveal>
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Nos Valeurs</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div key={index} whileHover={{ scale: 1.05, y: -5 }} className="text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white`}
                  >
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <ScrollReveal>
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Notre Parcours</h2>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-green-200 dark:bg-green-800"></div>

                <div className="space-y-8">
                  {milestones.map((milestone, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative flex items-start"
                    >
                      <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-6 relative z-10">
                        {milestone.year}
                      </div>
                      <div className="flex-1 pb-8">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{milestone.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{milestone.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Team */}
        <ScrollReveal>
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Notre Équipe</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div key={index} whileHover={{ scale: 1.05 }} className="text-center">
                  <Card className="hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 overflow-hidden">
                        <img
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                      <p className="text-green-600 font-medium mb-3">{member.role}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{member.bio}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* CTA Section */}
        <ScrollReveal>
          <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <CardContent className="p-12 text-center">
              <Globe className="w-16 h-16 mx-auto mb-6 text-green-200" />
              <h3 className="text-3xl font-bold mb-4">Rejoignez Notre Mission</h3>
              <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                Ensemble, construisons un avenir plus durable pour les entreprises et la planète.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100" asChild>
                  <Link href="/audit">Commencer Votre Audit</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 bg-transparent"
                  asChild
                >
                  <Link href="/contact">Nous Contacter</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </main>
    </div>
  )
}
