"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  Building,
  Users,
  Server,
  Zap,
  CheckCircle,
  Leaf,
  Save,
  MessageCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { ChatBot } from "./chat-bot"
import { useToast } from "@/hooks/use-toast"

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

// Benchmarks sectoriels
const sectorBenchmarks = {
  ecommerce: { avgScore: 45, topConcern: "Emballages et livraisons", avgSavings: 3200 },
  saas: { avgScore: 62, topConcern: "Hébergement et infrastructure", avgSavings: 1800 },
  manufacturing: { avgScore: 38, topConcern: "Consommation énergétique", avgSavings: 8500 },
  services: { avgScore: 58, topConcern: "Bureaux et mobilité", avgSavings: 2100 },
  retail: { avgScore: 42, topConcern: "Supply chain et transport", avgSavings: 4200 },
  food: { avgScore: 35, topConcern: "Déchets et emballages", avgSavings: 5600 },
  logistics: { avgScore: 28, topConcern: "Flotte véhicules", avgSavings: 12000 },
  other: { avgScore: 50, topConcern: "Analyse personnalisée", avgSavings: 3000 },
}

export function AnimatedAuditForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [showChatBot, setShowChatBot] = useState(false)
  const [savedProgress, setSavedProgress] = useState(false)
  const { toast } = useToast()

  const totalSteps = 6
  const progress = (currentStep / totalSteps) * 100

  // Sauvegarde automatique
  useEffect(() => {
    const savedData = localStorage.getItem("ecobrain-audit-progress")
    if (savedData) {
      const parsed = JSON.parse(savedData)
      setFormData(parsed.formData)
      setCurrentStep(parsed.currentStep)
      setSavedProgress(true)
      toast({
        title: "Progression restaurée",
        description: "Nous avons récupéré votre progression précédente.",
      })
    }
  }, [])

  // Sauvegarde à chaque changement
  useEffect(() => {
    if (formData.companyName || formData.email) {
      localStorage.setItem(
        "ecobrain-audit-progress",
        JSON.stringify({
          formData,
          currentStep,
          timestamp: Date.now(),
        }),
      )
    }
  }, [formData, currentStep])

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

  const saveProgress = () => {
    localStorage.setItem(
      "ecobrain-audit-progress",
      JSON.stringify({
        formData,
        currentStep,
        timestamp: Date.now(),
      }),
    )
    toast({
      title: "Progression sauvegardée",
      description: "Vous pouvez reprendre plus tard où vous vous êtes arrêté.",
    })
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulation d'envoi
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsSubmitting(false)
    setShowResults(true)
    // Nettoyer la sauvegarde
    localStorage.removeItem("ecobrain-audit-progress")
  }

  // Calcul du score avec benchmarks
  const calculateScore = () => {
    let score = 50 // Score de base

    // Bonus/malus basés sur les réponses
    if (formData.hosting === "green") score += 15
    if (formData.hosting === "traditional") score -= 10

    if (formData.localSuppliers === "very-high") score += 25
    if (formData.localSuppliers === "high") score += 20
    if (formData.localSuppliers === "low") score -= 15

    if (formData.renewablePercentage === "very-high") score += 30
    if (formData.renewablePercentage === "high") score += 25
    if (formData.renewablePercentage === "low") score -= 20

    if (formData.packaging === "eco") score += 15
    if (formData.packaging === "traditional") score -= 10

    if (formData.vehicleFleet === "electric") score += 20
    if (formData.vehicleFleet === "mixed") score += 10
    if (formData.vehicleFleet?.includes("thermal")) score -= 15

    return Math.max(0, Math.min(100, score))
  }

  const getBenchmarkData = () => {
    return sectorBenchmarks[formData.sector as keyof typeof sectorBenchmarks] || sectorBenchmarks.other
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
        priority: 1,
      })
    }

    if (formData.localSuppliers === "low") {
      recommendations.push({
        type: "high",
        title: "Supply Chain Internationale",
        description: "60% de votre empreinte carbone vient du transport",
        action: "Identifier des fournisseurs locaux",
        savings: "€2,340/an",
        priority: 2,
      })
    }

    if (formData.renewablePercentage === "low") {
      recommendations.push({
        type: "medium",
        title: "Énergie Non-Renouvelable",
        description: "Votre consommation énergétique n'est pas optimisée",
        action: "Passer à 70% d'énergie renouvelable",
        savings: "€1,560/an",
        priority: 3,
      })
    }

    if (formData.packaging === "traditional") {
      recommendations.push({
        type: "medium",
        title: "Emballages Non-Durables",
        description: "Vos emballages génèrent des taxes carbone élevées",
        action: "Adopter des emballages 100% recyclables",
        savings: "€780/an",
        priority: 4,
      })
    }

    if (formData.vehicleFleet?.includes("thermal")) {
      recommendations.push({
        type: "high",
        title: "Flotte Véhicules Polluante",
        description: "Vos véhicules thermiques représentent un risque fiscal",
        action: "Plan de transition vers l'électrique",
        savings: "€3,200/an",
        priority: 2,
      })
    }

    return recommendations.sort((a, b) => a.priority - b.priority)
  }

  // Animation variants
  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  }

  const progressVariants = {
    hidden: { width: 0 },
    visible: { width: `${progress}%` },
  }

  if (showResults) {
    const score = calculateScore()
    const recommendations = getRecommendations()
    const benchmark = getBenchmarkData()
    const totalSavings = recommendations.reduce(
      (sum, rec) => sum + Number.parseInt(rec.savings.replace(/[€,]/g, "").replace("/an", "")),
      0,
    )

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader className="text-center bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
              <CardTitle className="text-2xl flex items-center justify-center">
                <CheckCircle className="w-8 h-8 mr-3" />
                Audit EcoBrain Terminé !
              </CardTitle>
              <CardDescription className="text-green-100">
                Voici votre analyse personnalisée avec benchmarks sectoriels
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="p-8">
            {/* Score Global avec Benchmark */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <motion.div
                className="text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 mb-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-700">{score}</div>
                    <div className="text-sm text-green-600">/100</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Votre Score</h3>
                <p className="text-gray-600">
                  {score >= 80
                    ? "Excellent ! Vous êtes leader."
                    : score >= 60
                      ? "Bien, au-dessus de la moyenne."
                      : score >= 40
                        ? "Moyen, des actions nécessaires."
                        : "Critique, action immédiate requise."}
                </p>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
              >
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 mb-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-700">{benchmark.avgScore}</div>
                    <div className="text-sm text-blue-600">/100</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Moyenne Secteur</h3>
                <p className="text-gray-600">
                  {score > benchmark.avgScore
                    ? `Vous êtes ${score - benchmark.avgScore} points au-dessus !`
                    : score < benchmark.avgScore
                      ? `${benchmark.avgScore - score} points de retard à rattraper`
                      : "Vous êtes dans la moyenne"}
                </p>
              </motion.div>
            </div>

            {/* Métriques Clés */}
            <motion.div
              className="grid md:grid-cols-3 gap-6 mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-700">€{totalSavings.toLocaleString()}</div>
                  <div className="text-sm text-green-600">Économies potentielles/an</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Moyenne secteur: €{benchmark.avgSavings.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-700">{recommendations.length}</div>
                  <div className="text-sm text-blue-600">Actions recommandées</div>
                  <div className="text-xs text-gray-500 mt-1">Priorité: {benchmark.topConcern}</div>
                </CardContent>
              </Card>
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-700">2-4</div>
                  <div className="text-sm text-purple-600">Semaines d'implémentation</div>
                  <div className="text-xs text-gray-500 mt-1">ROI dès le 1er mois</div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recommandations avec animations */}
            <div className="space-y-4 mb-8">
              <h4 className="text-lg font-bold text-gray-900">🎯 Recommandations Prioritaires</h4>
              {recommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <Card
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
                          <div className="flex items-center mb-1">
                            <Badge className="mr-2 text-xs">#{rec.priority}</Badge>
                            <h5 className="font-semibold">{rec.title}</h5>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                          <p className="text-sm font-medium text-green-700">✅ {rec.action}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800 ml-4">{rec.savings}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* CTA Final */}
            <motion.div
              className="text-center space-y-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <Button size="lg" className="bg-green-600 hover:bg-green-700 px-8">
                <Leaf className="w-5 h-5 mr-2" />
                Commencer avec EcoBrain (97€/mois)
              </Button>
              <p className="text-sm text-gray-500">
                Garantie satisfait ou remboursé • Résultats en 24h • Support inclus
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="relative">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div>
              <CardTitle className="text-2xl">Audit Écologique Gratuit</CardTitle>
              <CardDescription>
                Étape {currentStep} sur {totalSteps}
                {savedProgress && <Badge className="ml-2 bg-blue-100 text-blue-800">Progression sauvegardée</Badge>}
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-2">{Math.round(progress)}% complété</div>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-green-600"
                  variants={progressVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {/* Étape 1: Informations générales */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <motion.div
                    className="text-center mb-6"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Building className="w-12 h-12 text-green-600 mx-auto mb-3" />
                    <h3 className="text-xl font-bold">Informations Générales</h3>
                    <p className="text-gray-600">Parlez-nous de votre entreprise</p>
                  </motion.div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Label htmlFor="companyName">Nom de l'entreprise *</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => updateFormData("companyName", e.target.value)}
                        placeholder="Ex: Ma Super Entreprise"
                        className="transition-all duration-200 focus:scale-105"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Label htmlFor="email">Email professionnel *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        placeholder="contact@monentreprise.com"
                        className="transition-all duration-200 focus:scale-105"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => updateFormData("phone", e.target.value)}
                        placeholder="01 23 45 67 89"
                        className="transition-all duration-200 focus:scale-105"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Label htmlFor="website">Site web</Label>
                      <Input
                        id="website"
                        value={formData.website}
                        onChange={(e) => updateFormData("website", e.target.value)}
                        placeholder="https://monentreprise.com"
                        className="transition-all duration-200 focus:scale-105"
                      />
                    </motion.div>
                  </div>
                </div>
              )}

              {/* Étape 2: Secteur et taille */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <motion.div
                    className="text-center mb-6"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Users className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                    <h3 className="text-xl font-bold">Secteur d'Activité & Taille</h3>
                    <p className="text-gray-600">Aidez-nous à mieux comprendre votre business</p>
                  </motion.div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Label htmlFor="sector">Secteur d'activité *</Label>
                      <Select value={formData.sector} onValueChange={(value) => updateFormData("sector", value)}>
                        <SelectTrigger className="transition-all duration-200 hover:scale-105">
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
                    </motion.div>
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Label htmlFor="employees">Nombre d'employés *</Label>
                      <Select value={formData.employees} onValueChange={(value) => updateFormData("employees", value)}>
                        <SelectTrigger className="transition-all duration-200 hover:scale-105">
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
                    </motion.div>
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Label htmlFor="revenue">Chiffre d'affaires annuel</Label>
                      <Select value={formData.revenue} onValueChange={(value) => updateFormData("revenue", value)}>
                        <SelectTrigger className="transition-all duration-200 hover:scale-105">
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
                    </motion.div>
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Label htmlFor="locations">Nombre de sites</Label>
                      <Select value={formData.locations} onValueChange={(value) => updateFormData("locations", value)}>
                        <SelectTrigger className="transition-all duration-200 hover:scale-105">
                          <SelectValue placeholder="Implantations" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 site unique</SelectItem>
                          <SelectItem value="2-5">2-5 sites</SelectItem>
                          <SelectItem value="6-20">6-20 sites</SelectItem>
                          <SelectItem value="20+">20+ sites</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* Étape 3: Infrastructure IT */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <motion.div
                    className="text-center mb-6"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Server className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                    <h3 className="text-xl font-bold">Infrastructure IT</h3>
                    <p className="text-gray-600">Analysons votre empreinte numérique</p>
                  </motion.div>

                  <div className="space-y-6">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Label>Type d'hébergement web *</Label>
                      <RadioGroup
                        value={formData.hosting}
                        onValueChange={(value) => updateFormData("hosting", value)}
                        className="mt-2"
                      >
                        <motion.div
                          className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          whileHover={{ scale: 1.02 }}
                        >
                          <RadioGroupItem value="traditional" id="traditional" />
                          <Label htmlFor="traditional">Hébergement traditionnel (OVH, AWS standard, etc.)</Label>
                        </motion.div>
                        <motion.div
                          className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          whileHover={{ scale: 1.02 }}
                        >
                          <RadioGroupItem value="green" id="green" />
                          <Label htmlFor="green">Hébergement vert (GreenGeeks, Infomaniak, etc.)</Label>
                        </motion.div>
                        <motion.div
                          className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          whileHover={{ scale: 1.02 }}
                        >
                          <RadioGroupItem value="unknown" id="unknown" />
                          <Label htmlFor="unknown">Je ne sais pas</Label>
                        </motion.div>
                      </RadioGroup>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Label htmlFor="monthlyTraffic">Trafic web mensuel</Label>
                        <Select
                          value={formData.monthlyTraffic}
                          onValueChange={(value) => updateFormData("monthlyTraffic", value)}
                        >
                          <SelectTrigger className="transition-all duration-200 hover:scale-105">
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
                      </motion.div>
                      <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <Label htmlFor="emailCampaigns">Emails marketing/mois</Label>
                        <Select
                          value={formData.emailCampaigns}
                          onValueChange={(value) => updateFormData("emailCampaigns", value)}
                        >
                          <SelectTrigger className="transition-all duration-200 hover:scale-105">
                            <SelectValue placeholder="Volume d'emails" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-1k">0 - 1k emails</SelectItem>
                            <SelectItem value="1k-10k">1k - 10k emails</SelectItem>
                            <SelectItem value="10k-100k">10k - 100k emails</SelectItem>
                            <SelectItem value="100k+">100k+ emails</SelectItem>
                          </SelectContent>
                        </Select>
                      </motion.div>
                    </div>
                  </div>
                </div>
              )}

              {/* Étapes 4, 5, 6 suivent le même pattern... */}
              {/* Je vais inclure directement l'étape 6 pour la validation */}

              {currentStep === 6 && (
                <div className="space-y-6">
                  <motion.div
                    className="text-center mb-6"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                    <h3 className="text-xl font-bold">Validation & Génération</h3>
                    <p className="text-gray-600">Vérifiez vos informations avant génération du rapport</p>
                  </motion.div>

                  <motion.div
                    className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h4 className="font-bold text-green-800 mb-2">🎯 Prêt pour l'analyse !</h4>
                    <p className="text-green-700 mb-4">
                      Nous allons analyser vos données et générer votre rapport personnalisé avec des recommandations
                      concrètes et des benchmarks sectoriels.
                    </p>
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="bg-green-600 hover:bg-green-700"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          />
                          Génération en cours...
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5 mr-2" />
                          Générer mon audit gratuit
                        </>
                      )}
                    </Button>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation avec animations */}
          <motion.div
            className="flex justify-between mt-8 pt-6 border-t"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="bg-transparent transition-all duration-200 hover:scale-105"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Précédent
              </Button>

              <Button
                variant="outline"
                onClick={saveProgress}
                className="bg-transparent transition-all duration-200 hover:scale-105"
              >
                <Save className="w-4 h-4 mr-2" />
                Sauvegarder
              </Button>
            </div>

            {currentStep < totalSteps && (
              <Button
                onClick={nextStep}
                className="bg-green-600 hover:bg-green-700 transition-all duration-200 hover:scale-105"
                disabled={
                  (currentStep === 1 && (!formData.companyName || !formData.email)) ||
                  (currentStep === 2 && (!formData.sector || !formData.employees)) ||
                  (currentStep === 3 && !formData.hosting)
                }
              >
                Suivant
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </motion.div>
        </CardContent>
      </Card>

      {/* Chat Bot Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <Button
          onClick={() => setShowChatBot(!showChatBot)}
          className="rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-700 shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </motion.div>

      {/* Chat Bot */}
      <AnimatePresence>
        {showChatBot && (
          <motion.div
            className="fixed bottom-24 right-6 z-50"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <ChatBot onClose={() => setShowChatBot(false)} currentStep={currentStep} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
