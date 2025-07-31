"use client"

import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Marie Dubois",
    role: "CEO, TechStart Solutions",
    company: "Startup SaaS - 15 employés",
    content:
      "EcoBrain nous a fait économiser 2 400€ dès le premier mois en optimisant notre hébergement et nos processus. Le ROI est immédiat !",
    rating: 5,
    savings: "2 400€/mois",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Thomas Martin",
    role: "Directeur Général",
    company: "E-commerce Mode - 45 employés",
    content:
      "Grâce à EcoBrain, nous sommes passés de 34/100 à 87/100 en score écologique. Nos clients adorent notre badge de conformité !",
    rating: 5,
    savings: "Score: 87/100",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Sophie Laurent",
    role: "CFO",
    company: "Agence Marketing - 28 employés",
    content:
      "L'audit automatique a détecté que nos campagnes email gaspillaient 40% de budget. Maintenant on économise 1 200€/mois avec des SMS ciblés.",
    rating: 5,
    savings: "1 200€/mois",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Pierre Moreau",
    role: "Fondateur",
    company: "Logistique Verte - 67 employés",
    content:
      "EcoBrain a négocié automatiquement avec nos fournisseurs. Résultat : -25% sur nos emballages ET 100% recyclables. Magique !",
    rating: 5,
    savings: "-25% coûts",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Camille Rousseau",
    role: "Responsable RSE",
    company: "Cabinet Conseil - 89 employés",
    content:
      "Le dossier CSRD généré automatiquement nous a fait gagner 3 semaines de travail. Notre audit externe s'est passé sans problème !",
    rating: 5,
    savings: "3 semaines",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Julien Petit",
    role: "CEO",
    company: "Restaurant Chain - 120 employés",
    content:
      "Nos 12 restaurants sont maintenant 100% conformes. EcoBrain a trouvé des fournisseurs locaux 15% moins chers. Win-win total !",
    rating: 5,
    savings: "-15% achats",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function Testimonials() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">🌟 Ils Économisent Déjà Avec EcoBrain</h2>
          <p className="text-xl text-gray-600">Plus de 500 entreprises nous font confiance</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                <div className="relative mb-4">
                  <Quote className="w-6 h-6 text-green-200 absolute -top-2 -left-1" />
                  <p className="text-gray-700 italic pl-4">"{testimonial.content}"</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-gray-500">{testimonial.role}</p>
                      <p className="text-xs text-gray-400">{testimonial.company}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                      {testimonial.savings}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-4 bg-white rounded-full px-6 py-3 shadow-md">
            <div className="flex -space-x-2">
              {testimonials.slice(0, 4).map((testimonial, index) => (
                <Avatar key={index} className="w-8 h-8 border-2 border-white">
                  <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                  <AvatarFallback className="text-xs">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <div className="text-sm">
              <span className="font-semibold">500+ entreprises</span>
              <span className="text-gray-500"> nous font confiance</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
