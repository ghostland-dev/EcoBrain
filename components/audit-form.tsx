"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Building, Users, Server, Truck, Zap, CheckCircle, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface FormData {
  // Étape 1: Informations générales
  companyName: string
  email: string
  phone: string
  website: string

  // Étape 2: Secteur et taille
  sector: string
  employees: string
  revenue: string
  locations: string

  // Étape 3: Infrastructure IT
  hosting: string
  monthlyTraffic: string
  emailCampaigns: string
  cloudServices: string[]

  // Étape 4: Supply chain
  suppliers: string
  packaging: string
  shipping: string
  localSuppliers: string

  // Étape 5: Énergie
  energySource: string
  monthlyConsumption: string
  renewablePercentage: string
  vehicleFleet: string
}

const initialFormData: FormData = {
  companyName: "",
  email: "",
  phone: "",
  website: "",
  sector: "",
  employees: "",
  revenue: "",
  locations: "",
  hosting: "",
  monthlyTraffic: "",
  emailCampaigns: "",
  cloudServices: [],
  suppliers: "",
  packaging: "",
  shipping: "",
  localSuppliers: "",
  energySource: "",
  monthlyConsumption: "",
  renewablePercentage: "",
  vehicleFleet: "",
}

export function AuditForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const totalSteps = 6
  const progress = (currentStep / totalSteps) * 100

  const updateFormData = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulation d'envoi
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setShowResults(true)
  }

  // Calcul du score basé sur les réponses
  const calculateScore = () => {
    let score = 50 // Score de base

    // Bonus/malus basés sur les réponses
    if (formData.hosting === "green") score += 15
    if (formData.hosting === "traditional") score -= 10

    if (formData.localSuppliers === "high") score += 20
    if (formData.localSuppliers === "low") score -= 15

    if (formData.renewablePercentage === "high") score += 25
    if (formData.renewablePercentage === "low") score -= 20

    if (formData.packaging === "eco") score += 10
    if (formData.packaging === "traditional") score -= 5

    return Math.max(0, Math.min(100, score))
  }

  const getRecommendations = () => {
    const recommendations = []

    if (formData.hosting === "traditional") {
      recommendations.push({
        type: "critical",
        title: "Hébergement Web Non-Écologique",
        description: "Votre hébergeur actuel génère 2.3 tonnes CO2/an",
        action: "Migrer vers GreenGeeks (-80% CO2, même prix)",
        savings: "€890/an",
      })
    }

    if (formData.localSuppliers === "low") {
      recommendations.push({
        type: "high",
        title: "Supply Chain Internationale",
        description: "60% de votre empreinte carbone vient du transport",
        action: "Identifier des fournisseurs locaux",
        savings: "€2,340/an",
      })
    }

    if (formData.renewablePercentage === "low") {
      recommendations.push({
        type: "medium",
        title: "Énergie Non-Renouvelable",
        description: "Votre consommation énergétique n'est pas optimisée",
        action: "Passer à 70% d'énergie renouvelable",
        savings: "€1,560/an",
      })
    }

    return recommendations
  }

  if (showResults) {
    const score = calculateScore()
    const recommendations = getRecommendations()
    const totalSavings = recommendations.reduce(
      (sum, rec) => sum + Number.parseInt(rec.savings.replace(/[€,]/g, "").replace("/an", "")),
      0,
    )

    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl flex items-center justify-center">
            <CheckCircle className="w-8 h-8 mr-3" />
            Audit EcoBrain Terminé !
          </CardTitle>
          <CardDescription className="text-green-100">
            Voici votre analyse personnalisée et nos recommandations
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          {/* Score Global */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 mb-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-700">{score}</div>
                <div className="text-sm text-green-600">/100</div>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Score Écologique</h3>
            <p className="text-gray-600">
              {score >= 80
                ? "Excellent ! Vous êtes sur la bonne voie."
                : score >= 60
                  ? "Bien, mais des améliorations sont possibles."
                  : score >= 40
                    ? "Moyen, des actions sont nécessaires."
                    : "Critique, une action immédiate est requise."}
            </p>
          </div>

          {/* Économies Potentielles */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-700">€{totalSavings.toLocaleString()}</div>
                <div className="text-sm text-green-600">Économies potentielles/an</div>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-700">{recommendations.length}</div>
                <div className="text-sm text-blue-600">Actions recommandées</div>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-700">2-4</div>
                <div className="text-sm text-purple-600">Semaines d'implémentation</div>
              </CardContent>
            </Card>
          </div>

          {/* Recommandations */}
          <div className="space-y-4 mb-8">
            <h4 className="text-lg font-bold text-gray-900">🎯 Recommandations Prioritaires</h4>
            {recommendations.map((rec, index) => (
              <Card
                key={index}
                className={`border-l-4 ${
                  rec.type === "critical"
                    ? "border-red-500 bg-red-50"
                    : rec.type === "high"
                      ? "border-orange-500 bg-orange-50"
                      : "border-yellow-500 bg-yellow-50"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h5 className="font-semibold mb-1">{rec.title}</h5>
                      <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                      <p className="text-sm font-medium text-green-700">✅ {rec.action}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 ml-4">{rec.savings}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center space-y-4">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 px-8">
              <Leaf className="w-5 h-5 mr-2" />
              Commencer avec EcoBrain (97€/mois)
            </Button>
            <p className="text-sm text-gray-500">Garantie satisfait ou remboursé • Résultats en 24h • Support inclus</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div>
            <CardTitle className="text-2xl">Audit Écologique Gratuit</CardTitle>
            <CardDescription>
              Étape {currentStep} sur {totalSteps}
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 mb-2">{Math.round(progress)}% complété</div>
            <Progress value={progress} className="w-32" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        {/* Étape 1: Informations générales */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Building className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold">Informations Générales</h3>
              <p className="text-gray-600">Parlez-nous de votre entreprise</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="companyName">Nom de l'entreprise *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => updateFormData("companyName", e.target.value)}
                  placeholder="Ex: Ma Super Entreprise"
                />
              </div>
              <div>
                <Label htmlFor="email">Email professionnel *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  placeholder="contact@monentreprise.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  placeholder="01 23 45 67 89"
                />
              </div>
              <div>
                <Label htmlFor="website">Site web</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => updateFormData("website", e.target.value)}
                  placeholder="https://monentreprise.com"
                />
              </div>
            </div>
          </div>
        )}

        {/* Étape 2: Secteur et taille */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold">Secteur d'Activité & Taille</h3>
              <p className="text-gray-600">Aidez-nous à mieux comprendre votre business</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="sector">Secteur d'activité *</Label>
                <Select value={formData.sector} onValueChange={(value) => updateFormData("sector", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez votre secteur" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="saas">SaaS / Tech</SelectItem>
                    <SelectItem value="manufacturing">Industrie / Manufacturing</SelectItem>
                    <SelectItem value="services">Services / Conseil</SelectItem>
                    <SelectItem value="retail">Commerce de détail</SelectItem>
                    <SelectItem value="food">Restauration / Alimentaire</SelectItem>
                    <SelectItem value="logistics">Logistique / Transport</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="employees">Nombre d'employés *</Label>
                <Select value={formData.employees} onValueChange={(value) => updateFormData("employees", value)}>
                  <SelectTrigger>
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
              <div>
                <Label htmlFor="revenue">Chiffre d'affaires annuel</Label>
                <Select value={formData.revenue} onValueChange={(value) => updateFormData("revenue", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="CA approximatif" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-100k">0 - 100k€</SelectItem>
                    <SelectItem value="100k-500k">100k - 500k€</SelectItem>
                    <SelectItem value="500k-2M">500k - 2M€</SelectItem>
                    <SelectItem value="2M-10M">2M - 10M€</SelectItem>
                    <SelectItem value="10M+">10M€+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="locations">Nombre de sites</Label>
                <Select value={formData.locations} onValueChange={(value) => updateFormData("locations", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Implantations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 site unique</SelectItem>
                    <SelectItem value="2-5">2-5 sites</SelectItem>
                    <SelectItem value="6-20">6-20 sites</SelectItem>
                    <SelectItem value="20+">20+ sites</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Étape 3: Infrastructure IT */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Server className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold">Infrastructure IT</h3>
              <p className="text-gray-600">Analysons votre empreinte numérique</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label>Type d'hébergement web *</Label>
                <RadioGroup
                  value={formData.hosting}
                  onValueChange={(value) => updateFormData("hosting", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="traditional" id="traditional" />
                    <Label htmlFor="traditional">Hébergement traditionnel (OVH, AWS standard, etc.)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="green" id="green" />
                    <Label htmlFor="green">Hébergement vert (GreenGeeks, Infomaniak, etc.)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="unknown" id="unknown" />
                    <Label htmlFor="unknown">Je ne sais pas</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="monthlyTraffic">Trafic web mensuel</Label>
                  <Select
                    value={formData.monthlyTraffic}
                    onValueChange={(value) => updateFormData("monthlyTraffic", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Visiteurs/mois" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1k">0 - 1k visiteurs</SelectItem>
                      <SelectItem value="1k-10k">1k - 10k visiteurs</SelectItem>
                      <SelectItem value="10k-100k">10k - 100k visiteurs</SelectItem>
                      <SelectItem value="100k-1M">100k - 1M visiteurs</SelectItem>
                      <SelectItem value="1M+">1M+ visiteurs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="emailCampaigns">Emails marketing/mois</Label>
                  <Select
                    value={formData.emailCampaigns}
                    onValueChange={(value) => updateFormData("emailCampaigns", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Volume d'emails" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1k">0 - 1k emails</SelectItem>
                      <SelectItem value="1k-10k">1k - 10k emails</SelectItem>
                      <SelectItem value="10k-100k">10k - 100k emails</SelectItem>
                      <SelectItem value="100k+">100k+ emails</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Services cloud utilisés (plusieurs choix possibles)</Label>
                <div className="grid md:grid-cols-2 gap-3 mt-2">
                  {[
                    "Google Workspace",
                    "Microsoft 365",
                    "Dropbox",
                    "Slack",
                    "Zoom",
                    "Salesforce",
                    "AWS/Azure",
                    "Autre",
                  ].map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox
                        id={service}
                        checked={formData.cloudServices.includes(service)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateFormData("cloudServices", [...formData.cloudServices, service])
                          } else {
                            updateFormData(
                              "cloudServices",
                              formData.cloudServices.filter((s) => s !== service),
                            )
                          }
                        }}
                      />
                      <Label htmlFor={service}>{service}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Étape 4: Supply Chain */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Truck className="w-12 h-12 text-orange-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold">Supply Chain & Fournisseurs</h3>
              <p className="text-gray-600">Analysons votre chaîne d'approvisionnement</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="suppliers">Nombre de fournisseurs principaux</Label>
                <Select value={formData.suppliers} onValueChange={(value) => updateFormData("suppliers", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Fournisseurs clés" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-5">1-5 fournisseurs</SelectItem>
                    <SelectItem value="6-20">6-20 fournisseurs</SelectItem>
                    <SelectItem value="21-50">21-50 fournisseurs</SelectItem>
                    <SelectItem value="50+">50+ fournisseurs</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="packaging">Type d'emballage principal *</Label>
                <RadioGroup
                  value={formData.packaging}
                  onValueChange={(value) => updateFormData("packaging", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="traditional" id="pack-traditional" />
                    <Label htmlFor="pack-traditional">Emballages plastique/non-recyclables</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mixed" id="pack-mixed" />
                    <Label htmlFor="pack-mixed">Mix carton/plastique</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="eco" id="pack-eco" />
                    <Label htmlFor="pack-eco">100% recyclable/biodégradable</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="pack-none" />
                    <Label htmlFor="pack-none">Pas d'emballage physique</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="shipping">Mode de livraison principal</Label>
                  <Select value={formData.shipping} onValueChange={(value) => updateFormData("shipping", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Transport" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="express">Express (24-48h)</SelectItem>
                      <SelectItem value="standard">Standard (3-5 jours)</SelectItem>
                      <SelectItem value="eco">Éco (5-10 jours)</SelectItem>
                      <SelectItem value="local">Livraison locale uniquement</SelectItem>
                      <SelectItem value="digital">100% digital</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="localSuppliers">Pourcentage de fournisseurs locaux</Label>
                  <Select
                    value={formData.localSuppliers}
                    onValueChange={(value) => updateFormData("localSuppliers", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Proximité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">0-25% locaux</SelectItem>
                      <SelectItem value="medium">25-50% locaux</SelectItem>
                      <SelectItem value="high">50-75% locaux</SelectItem>
                      <SelectItem value="very-high">75%+ locaux</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Étape 5: Énergie */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Zap className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold">Consommation Énergétique</h3>
              <p className="text-gray-600">Dernière étape : votre usage énergétique</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label>Source d'énergie principale *</Label>
                <RadioGroup
                  value={formData.energySource}
                  onValueChange={(value) => updateFormData("energySource", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="traditional" id="energy-traditional" />
                    <Label htmlFor="energy-traditional">Réseau électrique standard</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mixed" id="energy-mixed" />
                    <Label htmlFor="energy-mixed">Mix énergétique (partiellement vert)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="renewable" id="energy-renewable" />
                    <Label htmlFor="energy-renewable">100% énergies renouvelables</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="unknown" id="energy-unknown" />
                    <Label htmlFor="energy-unknown">Je ne sais pas</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="monthlyConsumption">Consommation électrique mensuelle</Label>
                  <Select
                    value={formData.monthlyConsumption}
                    onValueChange={(value) => updateFormData("monthlyConsumption", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="kWh/mois" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-500">0 - 500 kWh</SelectItem>
                      <SelectItem value="500-2000">500 - 2000 kWh</SelectItem>
                      <SelectItem value="2000-5000">2000 - 5000 kWh</SelectItem>
                      <SelectItem value="5000+">5000+ kWh</SelectItem>
                      <SelectItem value="unknown">Je ne sais pas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="renewablePercentage">Pourcentage d'énergie renouvelable</Label>
                  <Select
                    value={formData.renewablePercentage}
                    onValueChange={(value) => updateFormData("renewablePercentage", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Part verte" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">0-25%</SelectItem>
                      <SelectItem value="medium">25-50%</SelectItem>
                      <SelectItem value="high">50-75%</SelectItem>
                      <SelectItem value="very-high">75%+</SelectItem>
                      <SelectItem value="unknown">Je ne sais pas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="vehicleFleet">Flotte de véhicules</Label>
                <Select value={formData.vehicleFleet} onValueChange={(value) => updateFormData("vehicleFleet", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Véhicules d'entreprise" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Aucun véhicule</SelectItem>
                    <SelectItem value="1-5-thermal">1-5 véhicules thermiques</SelectItem>
                    <SelectItem value="6-20-thermal">6-20 véhicules thermiques</SelectItem>
                    <SelectItem value="20+-thermal">20+ véhicules thermiques</SelectItem>
                    <SelectItem value="mixed">Mix thermique/électrique</SelectItem>
                    <SelectItem value="electric">100% électrique</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Étape 6: Validation finale */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold">Validation & Génération</h3>
              <p className="text-gray-600">Vérifiez vos informations avant génération du rapport</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <Card className="p-4">
                <h4 className="font-semibold mb-2">🏢 Entreprise</h4>
                <p>
                  <strong>{formData.companyName}</strong>
                </p>
                <p>
                  {formData.sector} • {formData.employees}
                </p>
                <p>{formData.email}</p>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold mb-2">💻 Infrastructure</h4>
                <p>
                  Hébergement:{" "}
                  {formData.hosting === "green"
                    ? "✅ Vert"
                    : formData.hosting === "traditional"
                      ? "❌ Standard"
                      : "❓ Inconnu"}
                </p>
                <p>Trafic: {formData.monthlyTraffic}</p>
                <p>Services: {formData.cloudServices.length} outils</p>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold mb-2">🚚 Supply Chain</h4>
                <p>Fournisseurs: {formData.suppliers}</p>
                <p>Emballage: {formData.packaging}</p>
                <p>Local: {formData.localSuppliers}</p>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold mb-2">⚡ Énergie</h4>
                <p>Source: {formData.energySource}</p>
                <p>Consommation: {formData.monthlyConsumption}</p>
                <p>Renouvelable: {formData.renewablePercentage}</p>
              </Card>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <h4 className="font-bold text-green-800 mb-2">🎯 Prêt pour l'analyse !</h4>
              <p className="text-green-700 mb-4">
                Nous allons analyser vos données et générer votre rapport personnalisé avec des recommandations
                concrètes.
              </p>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Génération en cours...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    Générer mon audit gratuit
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="bg-transparent">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Précédent
          </Button>

          {currentStep < totalSteps && (
            <Button
              onClick={nextStep}
              className="bg-green-600 hover:bg-green-700"
              disabled={
                (currentStep === 1 && (!formData.companyName || !formData.email)) ||
                (currentStep === 2 && (!formData.sector || !formData.employees)) ||
                (currentStep === 3 && !formData.hosting) ||
                (currentStep === 4 && !formData.packaging) ||
                (currentStep === 5 && !formData.energySource)
              }
            >
              Suivant
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
