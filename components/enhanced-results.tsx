"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, TrendingUp, Award, Target, Calendar, BarChart3 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { PDFGenerator } from "./pdf-generator"
import { InteractiveCharts } from "./interactive-charts"
import { NotificationCenter } from "./notification-center"
import { GamificationSystem } from "./gamification-system"

interface AuditData {
  companyName: string
  email: string
  sector: string
  employees: string
  score: number
  benchmarkScore: number
  recommendations: Array<{
    type: string
    title: string
    description: string
    action: string
    savings: string
    priority: number
  }>
  totalSavings: number
  timestamp: Date
}

interface EnhancedResultsProps {
  auditData: AuditData
}

export function EnhancedResults({ auditData }: EnhancedResultsProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-700"
    if (score >= 60) return "text-blue-700"
    if (score >= 40) return "text-yellow-700"
    return "text-red-700"
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "from-green-100 to-emerald-100"
    if (score >= 60) return "from-blue-100 to-cyan-100"
    if (score >= 40) return "from-yellow-100 to-orange-100"
    return "from-red-100 to-pink-100"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Bien"
    if (score >= 40) return "Moyen"
    return "À améliorer"
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl mx-auto space-y-8"
    >
      {/* En-tête avec score principal et notifications */}
      <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <CardHeader className="text-center">
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className="flex items-center justify-between mb-4">
              <div></div>
              <CardTitle className="text-3xl flex items-center justify-center">
                <CheckCircle className="w-8 h-8 mr-3" />
                Audit EcoBrain Terminé !
              </CardTitle>
              <NotificationCenter />
            </div>
            <CardDescription className="text-green-100 text-lg">
              {auditData.companyName} - Analyse complète avec recommandations personnalisées
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="space-y-2"
            >
              <div
                className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br ${getScoreBgColor(auditData.score)} mb-2`}
              >
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getScoreColor(auditData.score)}`}>{auditData.score}</div>
                  <div className={`text-sm ${getScoreColor(auditData.score)}`}>/100</div>
                </div>
              </div>
              <h3 className="font-bold">Votre Score</h3>
              <Badge className="bg-white/20">{getScoreLabel(auditData.score)}</Badge>
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="space-y-2"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/20 mb-2">
                <div className="text-center">
                  <div className="text-3xl font-bold">€{auditData.totalSavings.toLocaleString()}</div>
                  <div className="text-sm">/an</div>
                </div>
              </div>
              <h3 className="font-bold">Économies Potentielles</h3>
              <Badge className="bg-white/20">ROI &lt; 3 mois</Badge>
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="space-y-2"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/20 mb-2">
                <div className="text-center">
                  <div className="text-3xl font-bold">{auditData.recommendations.length}</div>
                  <div className="text-sm">actions</div>
                </div>
              </div>
              <h3 className="font-bold">Recommandations</h3>
              <Badge className="bg-white/20">Priorisées</Badge>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation par onglets */}
      <div className="flex flex-wrap gap-2 justify-center">
        {[
          { id: "overview", label: "Vue d'ensemble", icon: TrendingUp },
          { id: "charts", label: "Graphiques", icon: BarChart3 },
          { id: "gamification", label: "Achievements", icon: Award },
          { id: "recommendations", label: "Recommandations", icon: Target },
          { id: "roadmap", label: "Plan d'action", icon: Calendar },
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "outline"}
            onClick={() => setActiveTab(tab.id)}
            className={activeTab === tab.id ? "bg-green-600 hover:bg-green-700" : "bg-transparent"}
          >
            {tab.icon && <tab.icon className="w-4 h-4 mr-2" />}
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Contenu des onglets */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "overview" && (
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Analyse de Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Score Écologique Global</span>
                    <span className="font-semibold">{auditData.score}/100</span>
                  </div>
                  <Progress value={auditData.score} className="h-3" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Conformité CSRD</span>
                    <span className="font-semibold">{Math.min(95, auditData.score + 10)}%</span>
                  </div>
                  <Progress value={Math.min(95, auditData.score + 10)} className="h-3" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Potentiel d'amélioration</span>
                    <span className="font-semibold">{100 - auditData.score} points</span>
                  </div>
                  <Progress value={100 - auditData.score} className="h-3" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Impact Financier</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Économies annuelles</span>
                    <span className="text-xl font-bold text-green-700">€{auditData.totalSavings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">Coût EcoBrain</span>
                    <span className="text-xl font-bold text-blue-700">€1,164/an</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="font-medium">Bénéfice net</span>
                    <span className="text-xl font-bold text-purple-700">
                      €{(auditData.totalSavings - 1164).toLocaleString()}/an
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "charts" && (
          <InteractiveCharts
            data={{
              companyName: auditData.companyName,
              sector: auditData.sector,
              score: auditData.score,
              benchmarkScore: auditData.benchmarkScore,
              recommendations: auditData.recommendations,
            }}
          />
        )}

        {activeTab === "gamification" && (
          <GamificationSystem
            userScore={auditData.score}
            totalSavings={auditData.totalSavings}
            companyName={auditData.companyName}
          />
        )}

        {activeTab === "recommendations" && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">🎯 Recommandations Prioritaires</h3>
            {auditData.recommendations.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
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
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <Badge className="mr-2 text-xs">#{rec.priority}</Badge>
                          <h4 className="font-semibold text-lg">{rec.title}</h4>
                        </div>
                        <p className="text-gray-600 mb-3">{rec.description}</p>
                        <div className="bg-white p-3 rounded border">
                          <p className="text-sm font-medium text-green-700">✅ Action recommandée:</p>
                          <p className="text-sm text-gray-700 mt-1">{rec.action}</p>
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <Badge className="bg-green-100 text-green-800 text-lg px-3 py-1">{rec.savings}</Badge>
                        <p className="text-xs text-gray-500 mt-1">Économies annuelles</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "roadmap" && (
          <Card>
            <CardHeader>
              <CardTitle>Plan d'Action - Roadmap 3 Mois</CardTitle>
              <CardDescription>Votre feuille de route vers l'excellence écologique</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    phase: "Phase 1 - Démarrage (Semaines 1-2)",
                    color: "bg-blue-500",
                    actions: [
                      "Souscription EcoBrain et configuration",
                      "Audit approfondi automatisé",
                      "Identification des fournisseurs verts",
                      "Formation de l'équipe projet",
                    ],
                    impact: "Score +15 points, bases solides",
                  },
                  {
                    phase: "Phase 2 - Implémentation (Semaines 3-6)",
                    color: "bg-orange-500",
                    actions: [
                      "Migration vers hébergement vert",
                      "Optimisation de la supply chain",
                      "Mise en place des nouveaux processus",
                      "Suivi des premiers résultats",
                    ],
                    impact: "Économies: €890/mois, conformité 70%",
                  },
                  {
                    phase: "Phase 3 - Optimisation (Semaines 7-12)",
                    color: "bg-green-500",
                    actions: [
                      "Transition énergétique complète",
                      "Préparation certification ISO 14001",
                      "Automatisation du reporting",
                      "Plan de communication externe",
                    ],
                    impact: "Conformité CSRD: 95%, leadership sectoriel",
                  },
                ].map((phase, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.2 }}
                    className="relative"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-4 h-4 rounded-full ${phase.color} mt-2 flex-shrink-0`}></div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-2">{phase.phase}</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-semibold text-sm mb-2">Actions clés:</h5>
                            <ul className="space-y-1">
                              {phase.actions.map((action, actionIndex) => (
                                <li key={actionIndex} className="text-sm text-gray-600 flex items-start">
                                  <span className="text-green-500 mr-2">•</span>
                                  {action}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-gray-50 p-3 rounded">
                            <h5 className="font-semibold text-sm mb-1">Impact attendu:</h5>
                            <p className="text-sm text-green-700 font-medium">{phase.impact}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < 2 && <div className="w-px h-8 bg-gray-300 ml-2 mt-4"></div>}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>

      {/* Section PDF Generator */}
      <PDFGenerator auditData={auditData} />

      {/* CTA Final */}
      <motion.div
        className="text-center space-y-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">Prêt à Transformer Votre Entreprise ?</h3>
            <p className="text-lg mb-6">
              Commencez dès aujourd'hui et économisez €{auditData.totalSavings.toLocaleString()} par an
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8">
                Commencer avec EcoBrain (97€/mois)
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 bg-transparent"
              >
                Planifier une démo
              </Button>
            </div>
            <p className="text-sm text-green-100 mt-4">
              Garantie satisfait ou remboursé • Support inclus • ROI dès le 1er mois
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
