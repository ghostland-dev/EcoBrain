"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EnhancedNavigation } from "@/components/enhanced-navigation"
import { ScrollReveal } from "@/components/micro-interactions"
import { useToast } from "@/hooks/use-toast"

const contactMethods = [
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email",
    description: "Écrivez-nous à tout moment",
    value: "contact@ecobrain.fr",
    action: "mailto:contact@ecobrain.fr",
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Téléphone",
    description: "Lun-Ven, 9h-18h",
    value: "+33 1 23 45 67 89",
    action: "tel:+33123456789",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "Chat en Direct",
    description: "Réponse immédiate",
    value: "Démarrer une conversation",
    action: "#",
    color: "from-purple-500 to-pink-600",
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "Rendez-vous",
    description: "Planifiez une démo",
    value: "Réserver un créneau",
    action: "/demo",
    color: "from-orange-500 to-red-600",
  },
]

const offices = [
  {
    city: "Paris",
    address: "15 Rue de la Paix, 75002 Paris",
    phone: "+33 1 23 45 67 89",
    email: "paris@ecobrain.fr",
  },
  {
    city: "Lyon",
    address: "42 Cours Franklin Roosevelt, 69006 Lyon",
    phone: "+33 4 78 90 12 34",
    email: "lyon@ecobrain.fr",
  },
  {
    city: "Toulouse",
    address: "8 Place du Capitole, 31000 Toulouse",
    phone: "+33 5 61 23 45 67",
    email: "toulouse@ecobrain.fr",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
    budget: "",
    timeline: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulation d'envoi
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les 24 heures.",
    })

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      phone: "",
      subject: "",
      message: "",
      budget: "",
      timeline: "",
    })
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <EnhancedNavigation />

      <main className="container mx-auto px-4 py-16">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">Contactez-Nous</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Une question ? Un projet ? Notre équipe d'experts est là pour vous accompagner dans votre transition
              écologique.
            </p>
          </div>
        </ScrollReveal>

        {/* Contact Methods */}
        <ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="cursor-pointer"
                onClick={() => {
                  if (method.action.startsWith("http") || method.action.startsWith("/")) {
                    window.open(method.action, "_blank")
                  } else if (method.action.startsWith("mailto:") || method.action.startsWith("tel:")) {
                    window.location.href = method.action
                  }
                }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white`}
                    >
                      {method.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{method.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{method.description}</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{method.value}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <ScrollReveal>
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Envoyez-nous un Message</CardTitle>
                <CardDescription>Remplissez ce formulaire et nous vous répondrons dans les 24 heures.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="company">Entreprise *</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="budget">Budget estimé</Label>
                      <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Sélectionnez votre budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="<1000">Moins de 1 000€</SelectItem>
                          <SelectItem value="1000-5000">1 000€ - 5 000€</SelectItem>
                          <SelectItem value="5000-10000">5 000€ - 10 000€</SelectItem>
                          <SelectItem value="10000+">Plus de 10 000€</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="timeline">Délai souhaité</Label>
                      <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Quand souhaitez-vous commencer ?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asap">Dès que possible</SelectItem>
                          <SelectItem value="1month">Dans le mois</SelectItem>
                          <SelectItem value="3months">Dans les 3 mois</SelectItem>
                          <SelectItem value="6months">Dans les 6 mois</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Sujet *</Label>
                    <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Choisissez le sujet de votre demande" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="demo">Demande de démo</SelectItem>
                        <SelectItem value="pricing">Questions sur les tarifs</SelectItem>
                        <SelectItem value="technical">Support technique</SelectItem>
                        <SelectItem value="partnership">Partenariat</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      required
                      rows={5}
                      className="mt-1"
                      placeholder="Décrivez votre projet ou votre question..."
                    />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full bg-green-600 hover:bg-green-700 py-3">
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Envoyer le Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Contact Info & Offices */}
          <div className="space-y-8">
            {/* Business Hours */}
            <ScrollReveal>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 text-green-600 mr-2" />
                    Horaires d'Ouverture
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Lundi - Vendredi</span>
                    <span className="font-medium">9h00 - 18h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Samedi</span>
                    <span className="font-medium">10h00 - 16h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Dimanche</span>
                    <span className="font-medium">Fermé</span>
                  </div>
                  <div className="pt-3 border-t">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Support d'urgence disponible 24/7 pour les clients Enterprise
                    </p>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* Offices */}
            <ScrollReveal>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 text-green-600 mr-2" />
                    Nos Bureaux
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {offices.map((office, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 pb-4 last:pb-0"
                    >
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{office.city}</h3>
                      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <p>{office.address}</p>
                        <p>{office.phone}</p>
                        <p>{office.email}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* FAQ Link */}
            <ScrollReveal>
              <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Questions Fréquentes</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Consultez notre FAQ pour des réponses rapides aux questions les plus courantes.
                  </p>
                  <Button variant="outline" className="bg-transparent" asChild>
                    <a href="/faq">Voir la FAQ</a>
                  </Button>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </main>
    </div>
  )
}
