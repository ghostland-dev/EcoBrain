"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, User, Building, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EnhancedNavigation } from "@/components/enhanced-navigation"
import { ScrollReveal } from "@/components/micro-interactions"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "97€/mois",
    features: ["Audit complet", "Dashboard temps réel", "Jusqu'à 50 employés", "Support email"],
  },
  {
    id: "professional",
    name: "Professional",
    price: "197€/mois",
    features: ["Tout du Starter", "Analyses illimitées", "API access", "Support prioritaire"],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "497€/mois",
    features: ["Tout du Professional", "White-label", "Support 24/7", "Account manager"],
  },
]

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    employees: "",
    plan: "professional",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [acceptNewsletter, setAcceptNewsletter] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      })
      return
    }

    if (!acceptTerms) {
      toast({
        title: "Erreur",
        description: "Vous devez accepter les conditions d'utilisation.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulation d'inscription
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Compte créé avec succès !",
      description: "Vérifiez votre email pour activer votre compte.",
    })

    // Redirection vers dashboard
    window.location.href = "/dashboard"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <EnhancedNavigation />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Créez Votre Compte EcoBrain</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Commencez votre essai gratuit de 14 jours dès maintenant
              </p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Signup Form */}
            <ScrollReveal>
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Informations du Compte</CardTitle>
                  <CardDescription>Remplissez vos informations pour créer votre compte</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Info */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Prénom *</Label>
                        <div className="relative mt-1">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            required
                            className="pl-10"
                            placeholder="Votre prénom"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="lastName">Nom *</Label>
                        <div className="relative mt-1">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            required
                            className="pl-10"
                            placeholder="Votre nom"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <Label htmlFor="email">Email professionnel *</Label>
                      <div className="relative mt-1">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                          className="pl-10"
                          placeholder="vous@entreprise.com"
                        />
                      </div>
                    </div>

                    {/* Company Info */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company">Entreprise *</Label>
                        <div className="relative mt-1">
                          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) => handleInputChange("company", e.target.value)}
                            required
                            className="pl-10"
                            placeholder="Nom de votre entreprise"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="employees">Nombre d'employés</Label>
                        <Select
                          value={formData.employees}
                          onValueChange={(value) => handleInputChange("employees", value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Taille de l'équipe" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">1-10 employés</SelectItem>
                            <SelectItem value="11-50">11-50 employés</SelectItem>
                            <SelectItem value="51-200">51-200 employés</SelectItem>
                            <SelectItem value="201-500">201-500 employés</SelectItem>
                            <SelectItem value="500+">500+ employés</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Password */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="password">Mot de passe *</Label>
                        <div className="relative mt-1">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            required
                            className="pl-10 pr-10"
                            placeholder="Mot de passe sécurisé"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
                        <div className="relative mt-1">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                            required
                            className="pl-10 pr-10"
                            placeholder="Confirmez votre mot de passe"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Plan Selection */}
                    <div>
                      <Label>Choisissez votre plan</Label>
                      <div className="grid grid-cols-1 gap-3 mt-2">
                        {plans.map((plan) => (
                          <div
                            key={plan.id}
                            className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              formData.plan === plan.id
                                ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                                : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                            }`}
                            onClick={() => handleInputChange("plan", plan.id)}
                          >
                            {plan.popular && (
                              <div className="absolute -top-2 left-4">
                                <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">Populaire</span>
                              </div>
                            )}
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{plan.price}</p>
                              </div>
                              <div
                                className={`w-4 h-4 rounded-full border-2 ${
                                  formData.plan === plan.id ? "border-green-500 bg-green-500" : "border-gray-300"
                                }`}
                              >
                                {formData.plan === plan.id && <Check className="w-2 h-2 text-white m-0.5" />}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Terms and Newsletter */}
                    <div className="space-y-4">
                      <div className="flex items-start space-x-2">
                        <Checkbox id="terms" checked={acceptTerms} onCheckedChange={setAcceptTerms} className="mt-1" />
                        <Label htmlFor="terms" className="text-sm leading-relaxed">
                          J'accepte les{" "}
                          <Link href="/legal/terms" className="text-green-600 hover:underline">
                            conditions d'utilisation
                          </Link>{" "}
                          et la{" "}
                          <Link href="/legal/privacy" className="text-green-600 hover:underline">
                            politique de confidentialité
                          </Link>
                        </Label>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="newsletter"
                          checked={acceptNewsletter}
                          onCheckedChange={setAcceptNewsletter}
                          className="mt-1"
                        />
                        <Label htmlFor="newsletter" className="text-sm">
                          Je souhaite recevoir les actualités et conseils EcoBrain par email
                        </Label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-green-600 hover:bg-green-700 py-3 text-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Création du compte...
                        </>
                      ) : (
                        <>
                          Créer mon compte
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>

                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                      Déjà un compte ?{" "}
                      <Link href="/auth/login" className="text-green-600 hover:underline font-medium">
                        Se connecter
                      </Link>
                    </p>
                  </form>
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* Benefits */}
            <ScrollReveal direction="right">
              <div className="space-y-8">
                <Card className="bg-gradient-to-br from-green-600 to-emerald-600 text-white">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4">Essai Gratuit 14 Jours</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <Check className="w-5 h-5 mr-3 text-green-200" />
                        Accès complet à toutes les fonctionnalités
                      </li>
                      <li className="flex items-center">
                        <Check className="w-5 h-5 mr-3 text-green-200" />
                        Aucune carte de crédit requise
                      </li>
                      <li className="flex items-center">
                        <Check className="w-5 h-5 mr-3 text-green-200" />
                        Support inclus pendant l'essai
                      </li>
                      <li className="flex items-center">
                        <Check className="w-5 h-5 mr-3 text-green-200" />
                        Annulation possible à tout moment
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      Ce que vous obtenez immédiatement :
                    </h3>
                    <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 mr-3 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Audit écologique complet</strong>
                          <br />
                          Analyse de votre empreinte carbone en 2 minutes
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 mr-3 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Dashboard temps réel</strong>
                          <br />
                          Suivi de vos performances environnementales
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 mr-3 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Recommandations personnalisées</strong>
                          <br />
                          Actions concrètes pour économiser et réduire votre impact
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 mr-3 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Conformité CSRD automatisée</strong>
                          <br />
                          Rapports générés automatiquement
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-gray-50 dark:bg-gray-800">
                  <CardContent className="p-8 text-center">
                    <div className="text-4xl mb-4">🔒</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Sécurité Garantie</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Vos données sont chiffrées et protégées selon les standards bancaires. Conformité RGPD garantie.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>
    </div>
  )
}
