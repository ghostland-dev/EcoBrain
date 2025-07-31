"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { EnhancedNavigation } from "@/components/enhanced-navigation"
import { ScrollReveal } from "@/components/micro-interactions"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulation de connexion
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Connexion réussie !",
      description: "Redirection vers votre dashboard...",
    })

    // Redirection vers dashboard
    setTimeout(() => {
      window.location.href = "/dashboard"
    }, 1000)
  }

  const handleGoogleLogin = () => {
    toast({
      title: "Connexion Google",
      description: "Redirection vers Google...",
    })
  }

  const handleMicrosoftLogin = () => {
    toast({
      title: "Connexion Microsoft",
      description: "Redirection vers Microsoft...",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <EnhancedNavigation />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Connexion à EcoBrain</h1>
              <p className="text-gray-600 dark:text-gray-300">Accédez à votre dashboard écologique</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle>Se Connecter</CardTitle>
                <CardDescription>Entrez vos identifiants pour accéder à votre compte</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email */}
                  <div>
                    <Label htmlFor="email">Email</Label>
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

                  {/* Password */}
                  <div>
                    <Label htmlFor="password">Mot de passe</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        required
                        className="pl-10 pr-10"
                        placeholder="Votre mot de passe"
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

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" checked={rememberMe} onCheckedChange={setRememberMe} />
                      <Label htmlFor="remember" className="text-sm">
                        Se souvenir de moi
                      </Label>
                    </div>
                    <Link href="/auth/forgot-password" className="text-sm text-green-600 hover:underline">
                      Mot de passe oublié ?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-green-600 hover:bg-green-700 py-3">
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Connexion...
                      </>
                    ) : (
                      <>
                        Se connecter
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>

                {/* Social Login */}
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">Ou continuer avec</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <Button variant="outline" onClick={handleGoogleLogin} className="bg-transparent">
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Google
                    </Button>
                    <Button variant="outline" onClick={handleMicrosoftLogin} className="bg-transparent">
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                        <path fill="#f25022" d="M1 1h10v10H1z" />
                        <path fill="#00a4ef" d="M13 1h10v10H13z" />
                        <path fill="#7fba00" d="M1 13h10v10H1z" />
                        <path fill="#ffb900" d="M13 13h10v10H13z" />
                      </svg>
                      Microsoft
                    </Button>
                  </div>
                </div>

                {/* Sign Up Link */}
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
                  Pas encore de compte ?{" "}
                  <Link href="/auth/signup" className="text-green-600 hover:underline font-medium">
                    Créer un compte
                  </Link>
                </p>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Benefits */}
          <ScrollReveal>
            <Card className="mt-8 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Pourquoi EcoBrain ?</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-2xl font-bold text-green-600">97%</div>
                    <div className="text-gray-600 dark:text-gray-400">Conformité CSRD</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">€3.2K</div>
                    <div className="text-gray-600 dark:text-gray-400">Économies/an</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">24h</div>
                    <div className="text-gray-600 dark:text-gray-400">Délai résultats</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">500+</div>
                    <div className="text-gray-600 dark:text-gray-400">Entreprises</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </main>
    </div>
  )
}
