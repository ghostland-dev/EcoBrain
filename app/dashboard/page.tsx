"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  BarChart3,
  TrendingUp,
  Leaf,
  Zap,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Download,
  Settings,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EnhancedNavigation } from "@/components/enhanced-navigation"
import { InteractiveCharts } from "@/components/interactive-charts"
import { NotificationCenter } from "@/components/notification-center"
import { GamificationSystem } from "@/components/gamification-system"
import { FloatingActionMenu } from "@/components/floating-action-menu"
import { ScrollReveal, AnimatedCounter } from "@/components/micro-interactions"

// Données simulées pour le dashboard
const dashboardData = {
  companyName: "Ma Super Entreprise",
  sector: "ecommerce",
  currentScore: 73,
  previousScore: 68,
  benchmarkScore: 58,
  totalSavings: 4280,
  monthlySavings: 357,
  co2Reduction: 2.3,
  recommendations: [
    {
      id: "1",
      type: "critical",
      title: "Migration Hébergement Vert",
      description: "Votre hébergeur actuel génère 2.3 tonnes CO2/an",
      action: "Migrer vers GreenGeeks",
      savings: "€890/an",
      priority: 1,
      status: "pending",
      deadline: "2024-02-15",
    },
    {
      id: "2",
      type: "high",
      title: "Optimisation Supply Chain",
      description: "60% de votre empreinte vient du transport",
      action: "Identifier fournisseurs locaux",
      savings: "€2,340/an",
      priority: 2,
      status: "in-progress",
      deadline: "2024-03-01",
    },
    {
      id: "3",
      type: "medium",
      title: "Transition Énergétique",
      description: "Consommation énergétique non optimisée",
      action: "Passer à 70% énergie renouvelable",
      savings: "€1,560/an",
      priority: 3,
      status: "completed",
      deadline: "2024-01-30",
    },
  ],
  recentActivity: [
    {
      id: "1",
      type: "improvement",
      title: "Score amélioré",
      description: "Votre score est passé de 68 à 73 points",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      icon: <TrendingUp className="w-4 h-4 text-green-600" />,
    },
    {
      id: "2",
      type: "action",
      title: "Recommandation implémentée",
      description: "Migration vers hébergement vert terminée",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      icon: <CheckCircle className="w-4 h-4 text-blue-600" />,
    },
    {
      id: "3",
      type: "alert",
      title: "Nouvelle opportunité détectée",
      description: "Fournisseur local identifié pour vos emballages",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      icon: <AlertTriangle className="w-4 h-4 text-orange-600" />,
    },
  ],
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => setIsLoading(false), 1500)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Terminé"
      case "in-progress":
        return "En cours"
      case "pending":
        return "En attente"
      default:
        return "Inconnu"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <EnhancedNavigation />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              ))}
            </div>
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <EnhancedNavigation />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <ScrollReveal>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard EcoBrain</h1>
              <p className="text-gray-600 dark:text-gray-300">Bienvenue, {dashboardData.companyName}</p>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationCenter />
              <Button variant="outline" className="bg-transparent">
                <Settings className="w-4 h-4 mr-2" />
                Paramètres
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <Download className="w-4 h-4 mr-2" />
                Rapport PDF
              </Button>
            </div>
          </div>
        </ScrollReveal>

        {/* KPI Cards */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div whileHover={{ scale: 1.02 }}>
              <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Score Écologique</p>
                      <p className="text-3xl font-bold">
                        <AnimatedCounter from={0} to={dashboardData.currentScore} />
                        /100
                      </p>
                      <p className="text-green-100 text-sm flex items-center">
                        <TrendingUp className="w-4 h-4 mr-1" />+
                        {dashboardData.currentScore - dashboardData.previousScore} ce mois
                      </p>
                    </div>
                    <Leaf className="w-12 h-12 text-green-200" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Économies Totales</p>
                      <p className="text-3xl font-bold">
                        €<AnimatedCounter from={0} to={dashboardData.totalSavings} />
                      </p>
                      <p className="text-blue-100 text-sm">€{dashboardData.monthlySavings}/mois</p>
                    </div>
                    <BarChart3 className="w-12 h-12 text-blue-200" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">Réduction CO2</p>
                      <p className="text-3xl font-bold">
                        <AnimatedCounter from={0} to={dashboardData.co2Reduction} suffix=" t" />
                      </p>
                      <p className="text-purple-100 text-sm">Cette année</p>
                    </div>
                    <Zap className="w-12 h-12 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm">Actions Restantes</p>
                      <p className="text-3xl font-bold">
                        <AnimatedCounter
                          from={0}
                          to={dashboardData.recommendations.filter((r) => r.status !== "completed").length}
                        />
                      </p>
                      <p className="text-orange-100 text-sm">À implémenter</p>
                    </div>
                    <AlertTriangle className="w-12 h-12 text-orange-200" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </ScrollReveal>

        {/* Main Content Tabs */}
        <ScrollReveal>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-white dark:bg-gray-800">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="recommendations">Recommandations</TabsTrigger>
              <TabsTrigger value="analytics">Analyses</TabsTrigger>
              <TabsTrigger value="gamification">Achievements</TabsTrigger>
              <TabsTrigger value="activity">Activité</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Progress Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Progression Mensuelle</CardTitle>
                    <CardDescription>Votre évolution vers l'excellence écologique</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Score Global</span>
                        <span className="font-semibold">{dashboardData.currentScore}/100</span>
                      </div>
                      <Progress value={dashboardData.currentScore} className="h-3" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Conformité CSRD</span>
                        <span className="font-semibold">87%</span>
                      </div>
                      <Progress value={87} className="h-3" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Objectif Annuel</span>
                        <span className="font-semibold">73%</span>
                      </div>
                      <Progress value={73} className="h-3" />
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Actions Rapides</CardTitle>
                    <CardDescription>Tâches prioritaires à effectuer</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {dashboardData.recommendations.slice(0, 3).map((rec) => (
                      <div
                        key={rec.id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{rec.title}</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{rec.savings}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(rec.status)} variant="outline">
                            {getStatusLabel(rec.status)}
                          </Badge>
                          <Button size="sm" variant="outline" className="bg-transparent">
                            Voir
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Activité Récente</CardTitle>
                  <CardDescription>Dernières actions et mises à jour</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData.recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">{activity.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-medium">{activity.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{activity.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.timestamp.toLocaleString("fr-FR")}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Plan d'Action Personnalisé</CardTitle>
                  <CardDescription>Recommandations prioritaires pour améliorer votre score</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData.recommendations.map((rec, index) => (
                      <motion.div
                        key={rec.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-6 rounded-lg border-l-4 ${
                          rec.type === "critical"
                            ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                            : rec.type === "high"
                              ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                              : "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <Badge className="mr-2 text-xs">#{rec.priority}</Badge>
                              <h3 className="font-semibold text-lg">{rec.title}</h3>
                              <Badge className={getStatusColor(rec.status)} variant="outline">
                                {getStatusLabel(rec.status)}
                              </Badge>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 mb-3">{rec.description}</p>
                            <div className="bg-white dark:bg-gray-800 p-3 rounded border">
                              <p className="text-sm font-medium text-green-700 dark:text-green-400">
                                ✅ Action recommandée:
                              </p>
                              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{rec.action}</p>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center space-x-4">
                                <div className="text-sm">
                                  <span className="text-gray-500">Échéance: </span>
                                  <span className="font-medium">
                                    {new Date(rec.deadline).toLocaleDateString("fr-FR")}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button size="sm" variant="outline" className="bg-transparent">
                                  <Calendar className="w-4 h-4 mr-2" />
                                  Planifier
                                </Button>
                                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                  Commencer
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="ml-6 text-right">
                            <Badge className="bg-green-100 text-green-800 text-lg px-3 py-1">{rec.savings}</Badge>
                            <p className="text-xs text-gray-500 mt-1">Économies annuelles</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <InteractiveCharts
                data={{
                  companyName: dashboardData.companyName,
                  sector: dashboardData.sector,
                  score: dashboardData.currentScore,
                  benchmarkScore: dashboardData.benchmarkScore,
                  recommendations: dashboardData.recommendations,
                }}
              />
            </TabsContent>

            <TabsContent value="gamification">
              <GamificationSystem
                userScore={dashboardData.currentScore}
                totalSavings={dashboardData.totalSavings}
                companyName={dashboardData.companyName}
              />
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Journal d'Activité Complet</CardTitle>
                  <CardDescription>Historique détaillé de toutes vos actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {dashboardData.recentActivity.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-4 p-4 border-l-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-r-lg transition-colors"
                      >
                        <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border">{activity.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{activity.title}</h3>
                            <span className="text-sm text-gray-500">{activity.timestamp.toLocaleString("fr-FR")}</span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 mb-3">{activity.description}</p>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="bg-transparent">
                              {activity.type}
                            </Badge>
                            <Button size="sm" variant="ghost">
                              Voir détails
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </ScrollReveal>
      </main>

      <FloatingActionMenu />
    </div>
  )
}
