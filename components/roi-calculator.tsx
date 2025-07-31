"use client"

import { useState } from "react"
import { Calculator, TrendingUp, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export function ROICalculator() {
  const [revenue, setRevenue] = useState([500000])
  const [employees, setEmployees] = useState([25])
  const [currentScore, setCurrentScore] = useState([45])

  // Calculs automatiques
  const monthlyRevenue = revenue[0] / 12
  const potentialFines = revenue[0] * 0.04 // 4% max du CA
  const avgSavings = monthlyRevenue * 0.15 // 15% d'économies moyennes
  const ecobrainCost = employees[0] <= 50 ? 97 : 297
  const yearlyROI = avgSavings * 12 - ecobrainCost * 12
  const paybackMonths = Math.ceil(((ecobrainCost * 12) / (avgSavings * 12)) * 12)

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center">
          <Calculator className="w-6 h-6 mr-2 text-green-600" />
          Calculateur ROI EcoBrain
        </CardTitle>
        <CardDescription>Découvrez combien vous pourriez économiser avec EcoBrain</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-6">
            <div>
              <Label htmlFor="revenue">Chiffre d'affaires annuel (€)</Label>
              <div className="mt-2">
                <Input
                  id="revenue"
                  type="number"
                  value={revenue[0]}
                  onChange={(e) => setRevenue([Number.parseInt(e.target.value) || 0])}
                  className="mb-2"
                />
                <Slider
                  value={revenue}
                  onValueChange={setRevenue}
                  max={5000000}
                  min={100000}
                  step={50000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>100K€</span>
                  <span>5M€</span>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="employees">Nombre d'employés</Label>
              <div className="mt-2">
                <Input
                  id="employees"
                  type="number"
                  value={employees[0]}
                  onChange={(e) => setEmployees([Number.parseInt(e.target.value) || 0])}
                  className="mb-2"
                />
                <Slider value={employees} onValueChange={setEmployees} max={500} min={1} step={1} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1</span>
                  <span>500+</span>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="score">Score écologique actuel estimé</Label>
              <div className="mt-2">
                <Input
                  id="score"
                  type="number"
                  value={currentScore[0]}
                  onChange={(e) => setCurrentScore([Number.parseInt(e.target.value) || 0])}
                  className="mb-2"
                />
                <Slider
                  value={currentScore}
                  onValueChange={setCurrentScore}
                  max={100}
                  min={0}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0 (Critique)</span>
                  <span>100 (Parfait)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-600 mb-1">€{potentialFines.toLocaleString()}</div>
                  <div className="text-xs text-red-500">Amendes potentielles</div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    €{Math.round(avgSavings).toLocaleString()}
                  </div>
                  <div className="text-xs text-green-500">Économies/mois</div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="font-semibold text-blue-800">ROI Annuel</span>
                  </div>
                  <div className="text-3xl font-bold text-blue-700 mb-1">€{yearlyROI.toLocaleString()}</div>
                  <div className="text-sm text-blue-600">Retour sur investissement en {paybackMonths} mois</div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Plan recommandé:</span>
                <span className="font-bold text-green-600">
                  {employees[0] <= 50 ? "Starter (97€/mois)" : "Supply Chain (297€/mois)"}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Score cible:</span>
                <span className="font-bold text-blue-600">85/100</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Temps d'implémentation:</span>
                <span className="font-bold text-purple-600">2-4 semaines</span>
              </div>
            </div>

            <Button className="w-full bg-green-600 hover:bg-green-700 text-lg py-3">
              <Leaf className="w-5 h-5 mr-2" />
              Commencer mon audit gratuit
            </Button>
          </div>
        </div>

        {/* Bottom Summary */}
        <div className="mt-8 p-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Résumé de Votre Potentiel</h3>
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div>
                <div className="text-2xl font-bold">€{Math.round(avgSavings * 12).toLocaleString()}</div>
                <div className="text-sm opacity-90">Économies annuelles</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{100 - currentScore[0]}%</div>
                <div className="text-sm opacity-90">Marge d'amélioration</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{Math.round((yearlyROI / (ecobrainCost * 12)) * 100)}%</div>
                <div className="text-sm opacity-90">ROI annuel</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
