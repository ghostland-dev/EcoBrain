"use client"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import { Line, Bar, Doughnut, Radar } from "react-chartjs-2"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, BarChart3, PieChart, Target } from "lucide-react"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

interface ChartData {
  companyName: string
  sector: string
  score: number
  benchmarkScore: number
  recommendations: Array<{
    type: string
    title: string
    savings: string
  }>
}

interface InteractiveChartsProps {
  data: ChartData
}

export function InteractiveCharts({ data }: InteractiveChartsProps) {
  // Données pour le graphique de progression temporelle
  const progressionData = {
    labels: ["Aujourd'hui", "1 mois", "3 mois", "6 mois", "12 mois"],
    datasets: [
      {
        label: "Votre progression",
        data: [data.score, data.score + 15, data.score + 25, data.score + 35, data.score + 40],
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Moyenne secteur",
        data: [
          data.benchmarkScore,
          data.benchmarkScore + 5,
          data.benchmarkScore + 8,
          data.benchmarkScore + 12,
          data.benchmarkScore + 15,
        ],
        borderColor: "rgb(156, 163, 175)",
        backgroundColor: "rgba(156, 163, 175, 0.1)",
        fill: false,
        borderDash: [5, 5],
      },
    ],
  }

  // Données pour le graphique des économies par catégorie
  const savingsData = {
    labels: ["Hébergement", "Supply Chain", "Énergie", "Transport", "Déchets"],
    datasets: [
      {
        label: "Économies (€/an)",
        data: [890, 2340, 1560, 1200, 450],
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(139, 92, 246, 0.8)",
        ],
        borderColor: [
          "rgb(34, 197, 94)",
          "rgb(16, 185, 129)",
          "rgb(59, 130, 246)",
          "rgb(245, 158, 11)",
          "rgb(139, 92, 246)",
        ],
        borderWidth: 2,
      },
    ],
  }

  // Données pour le graphique en secteurs des émissions CO2
  const emissionsData = {
    labels: ["Transport & Logistique", "Hébergement & IT", "Bureaux & Énergie", "Marketing Digital", "Autres"],
    datasets: [
      {
        data: [45, 28, 18, 9, 5],
        backgroundColor: [
          "rgba(239, 68, 68, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(156, 163, 175, 0.8)",
        ],
        borderColor: [
          "rgb(239, 68, 68)",
          "rgb(245, 158, 11)",
          "rgb(34, 197, 94)",
          "rgb(59, 130, 246)",
          "rgb(156, 163, 175)",
        ],
        borderWidth: 2,
      },
    ],
  }

  // Données pour le radar des performances
  const radarData = {
    labels: ["Hébergement", "Supply Chain", "Énergie", "Déchets", "Transport", "Conformité"],
    datasets: [
      {
        label: "Votre entreprise",
        data: [
          data.score >= 70 ? 85 : data.score >= 50 ? 65 : 45,
          data.score >= 60 ? 75 : data.score >= 40 ? 55 : 35,
          data.score >= 80 ? 90 : data.score >= 60 ? 70 : 50,
          data.score >= 70 ? 80 : data.score >= 50 ? 60 : 40,
          data.score >= 50 ? 70 : data.score >= 30 ? 50 : 30,
          Math.min(95, data.score + 10),
        ],
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        borderColor: "rgb(34, 197, 94)",
        pointBackgroundColor: "rgb(34, 197, 94)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(34, 197, 94)",
      },
      {
        label: "Moyenne secteur",
        data: [
          data.benchmarkScore - 5,
          data.benchmarkScore,
          data.benchmarkScore + 5,
          data.benchmarkScore - 10,
          data.benchmarkScore + 2,
          data.benchmarkScore,
        ],
        backgroundColor: "rgba(156, 163, 175, 0.2)",
        borderColor: "rgb(156, 163, 175)",
        pointBackgroundColor: "rgb(156, 163, 175)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(156, 163, 175)",
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.label}: ${context.parsed}%`,
        },
      },
    },
  }

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">📊 Analyse Visuelle Détaillée</h2>
        <p className="text-gray-600">Visualisations interactives de votre performance écologique</p>
      </div>

      {/* Graphique de progression temporelle */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
            Projection de Progression
          </CardTitle>
          <CardDescription>Évolution de votre score avec EcoBrain sur 12 mois</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <Line data={progressionData} options={chartOptions} />
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-700">+15</div>
              <div className="text-xs text-green-600">Points en 1 mois</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-700">+25</div>
              <div className="text-xs text-blue-600">Points en 3 mois</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="text-lg font-bold text-purple-700">+35</div>
              <div className="text-xs text-purple-600">Points en 6 mois</div>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="text-lg font-bold text-orange-700">+40</div>
              <div className="text-xs text-orange-600">Points en 1 an</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Graphique des économies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
              Économies par Catégorie
            </CardTitle>
            <CardDescription>Répartition des économies potentielles annuelles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Bar data={savingsData} options={chartOptions} />
            </div>
            <div className="mt-4 text-center">
              <Badge className="bg-green-100 text-green-800">
                Total: €{savingsData.datasets[0].data.reduce((a, b) => a + b, 0).toLocaleString()}/an
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Graphique des émissions CO2 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="w-5 h-5 text-orange-600 mr-2" />
              Répartition Émissions CO2
            </CardTitle>
            <CardDescription>Sources principales de votre empreinte carbone</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Doughnut data={emissionsData} options={doughnutOptions} />
            </div>
            <div className="mt-4 text-center">
              <Badge className="bg-red-100 text-red-800">Transport: 45% - Priorité #1</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Radar des performances */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 text-purple-600 mr-2" />
            Radar de Performance
          </CardTitle>
          <CardDescription>Comparaison détaillée par domaine vs moyenne sectorielle</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <Radar data={radarData} options={radarOptions} />
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="font-semibold text-green-700">Points forts</div>
              <div className="text-sm text-green-600">Énergie, Conformité</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="font-semibold text-orange-700">À améliorer</div>
              <div className="text-sm text-orange-600">Transport, Déchets</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="font-semibold text-blue-700">Potentiel</div>
              <div className="text-sm text-blue-600">+{100 - data.score} points</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
