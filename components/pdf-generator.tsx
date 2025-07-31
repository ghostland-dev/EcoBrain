"use client"

import { useState } from "react"
import jsPDF from "jspdf"
import "jspdf-autotable"
import { Download, FileText, Eye, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

// Extension des types jsPDF pour autotable
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF
  }
}

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

interface PDFGeneratorProps {
  auditData: AuditData
}

export function PDFGenerator({ auditData }: PDFGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const { toast } = useToast()

  const generatePDF = async () => {
    setIsGenerating(true)

    try {
      const pdf = new jsPDF("p", "mm", "a4")
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()

      // Couleurs de marque
      const primaryColor = [34, 197, 94] // green-500
      const secondaryColor = [16, 185, 129] // emerald-500
      const textColor = [31, 41, 55] // gray-800
      const lightGray = [243, 244, 246] // gray-100

      // Page 1 - Couverture
      pdf.setFillColor(...primaryColor)
      pdf.rect(0, 0, pageWidth, 80, "F")

      // Logo et titre
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(32)
      pdf.setFont("helvetica", "bold")
      pdf.text("EcoBrain", 20, 35)

      pdf.setFontSize(18)
      pdf.setFont("helvetica", "normal")
      pdf.text("Rapport d'Audit Écologique", 20, 50)

      // Informations entreprise
      pdf.setTextColor(...textColor)
      pdf.setFontSize(24)
      pdf.setFont("helvetica", "bold")
      pdf.text(auditData.companyName, 20, 100)

      pdf.setFontSize(12)
      pdf.setFont("helvetica", "normal")
      pdf.text(`Secteur: ${auditData.sector}`, 20, 115)
      pdf.text(`Employés: ${auditData.employees}`, 20, 125)
      pdf.text(`Date: ${auditData.timestamp.toLocaleDateString("fr-FR")}`, 20, 135)

      // Score principal avec cercle
      const centerX = pageWidth - 60
      const centerY = 120
      const radius = 35

      // Cercle de fond
      pdf.setFillColor(...lightGray)
      pdf.circle(centerX, centerY, radius, "F")

      // Cercle de score (arc)
      const scorePercentage = auditData.score / 100
      pdf.setDrawColor(...primaryColor)
      pdf.setLineWidth(8)

      // Dessiner l'arc du score
      const startAngle = -90
      const endAngle = startAngle + scorePercentage * 360
      pdf.arc(centerX, centerY, radius - 4, startAngle, endAngle, "S")

      // Score au centre
      pdf.setTextColor(...primaryColor)
      pdf.setFontSize(28)
      pdf.setFont("helvetica", "bold")
      pdf.text(auditData.score.toString(), centerX - 8, centerY + 5)

      pdf.setFontSize(10)
      pdf.text("/100", centerX + 8, centerY + 5)

      // Résumé exécutif
      pdf.setTextColor(...textColor)
      pdf.setFontSize(16)
      pdf.setFont("helvetica", "bold")
      pdf.text("Résumé Exécutif", 20, 170)

      pdf.setFontSize(11)
      pdf.setFont("helvetica", "normal")
      const executiveSummary = [
        `Votre entreprise obtient un score écologique de ${auditData.score}/100,`,
        `${
          auditData.score > auditData.benchmarkScore
            ? `soit ${auditData.score - auditData.benchmarkScore} points au-dessus`
            : `soit ${auditData.benchmarkScore - auditData.score} points en dessous`
        } de la moyenne sectorielle (${auditData.benchmarkScore}/100).`,
        "",
        `Nos recommandations peuvent vous faire économiser jusqu'à`,
        `${auditData.totalSavings.toLocaleString()}€ par an tout en améliorant`,
        `significativement votre conformité environnementale.`,
      ]

      let yPos = 185
      executiveSummary.forEach((line) => {
        pdf.text(line, 20, yPos)
        yPos += 8
      })

      // Page 2 - Analyse détaillée
      pdf.addPage()

      // En-tête de page
      pdf.setFillColor(...primaryColor)
      pdf.rect(0, 0, pageWidth, 25, "F")
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(14)
      pdf.setFont("helvetica", "bold")
      pdf.text("Analyse Détaillée", 20, 17)

      // Comparaison avec benchmark
      pdf.setTextColor(...textColor)
      pdf.setFontSize(16)
      pdf.setFont("helvetica", "bold")
      pdf.text("Comparaison Sectorielle", 20, 45)

      // Graphique de comparaison (barres horizontales)
      const barY = 60
      const barHeight = 15
      const maxBarWidth = 120

      // Barre de votre score
      pdf.setFillColor(...primaryColor)
      const yourScoreWidth = (auditData.score / 100) * maxBarWidth
      pdf.rect(20, barY, yourScoreWidth, barHeight, "F")
      pdf.setTextColor(...textColor)
      pdf.setFontSize(10)
      pdf.text(`Votre score: ${auditData.score}/100`, 20, barY - 3)

      // Barre benchmark
      pdf.setFillColor(156, 163, 175) // gray-400
      const benchmarkWidth = (auditData.benchmarkScore / 100) * maxBarWidth
      pdf.rect(20, barY + 25, benchmarkWidth, barHeight, "F")
      pdf.text(`Moyenne secteur: ${auditData.benchmarkScore}/100`, 20, barY + 22)

      // Métriques clés
      pdf.setFontSize(16)
      pdf.setFont("helvetica", "bold")
      pdf.text("Métriques Clés", 20, 120)

      const metrics = [
        ["Économies potentielles annuelles", `€${auditData.totalSavings.toLocaleString()}`],
        ["Nombre de recommandations", auditData.recommendations.length.toString()],
        ["Actions critiques", auditData.recommendations.filter((r) => r.type === "critical").length.toString()],
        ["Retour sur investissement", "< 3 mois"],
        ["Temps d'implémentation", "2-4 semaines"],
      ]

      pdf.autoTable({
        startY: 130,
        head: [["Métrique", "Valeur"]],
        body: metrics,
        theme: "grid",
        headStyles: {
          fillColor: primaryColor,
          textColor: [255, 255, 255],
          fontSize: 11,
          fontStyle: "bold",
        },
        bodyStyles: {
          fontSize: 10,
          textColor: textColor,
        },
        alternateRowStyles: {
          fillColor: lightGray,
        },
        margin: { left: 20, right: 20 },
      })

      // Page 3 - Recommandations
      pdf.addPage()

      // En-tête
      pdf.setFillColor(...primaryColor)
      pdf.rect(0, 0, pageWidth, 25, "F")
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(14)
      pdf.setFont("helvetica", "bold")
      pdf.text("Recommandations Prioritaires", 20, 17)

      let currentY = 40

      auditData.recommendations.forEach((rec, index) => {
        if (currentY > 250) {
          pdf.addPage()
          currentY = 30
        }

        // Couleur selon priorité
        let priorityColor = primaryColor
        if (rec.type === "critical")
          priorityColor = [239, 68, 68] // red-500
        else if (rec.type === "high")
          priorityColor = [245, 158, 11] // amber-500
        else priorityColor = [34, 197, 94] // green-500

        // Bandeau de priorité
        pdf.setFillColor(...priorityColor)
        pdf.rect(20, currentY, 5, 25, "F")

        // Contenu de la recommandation
        pdf.setTextColor(...textColor)
        pdf.setFontSize(12)
        pdf.setFont("helvetica", "bold")
        pdf.text(`${index + 1}. ${rec.title}`, 30, currentY + 8)

        pdf.setFontSize(10)
        pdf.setFont("helvetica", "normal")
        const descLines = pdf.splitTextToSize(rec.description, 150)
        pdf.text(descLines, 30, currentY + 15)

        pdf.setFont("helvetica", "bold")
        pdf.text("Action recommandée:", 30, currentY + 25)
        pdf.setFont("helvetica", "normal")
        const actionLines = pdf.splitTextToSize(rec.action, 120)
        pdf.text(actionLines, 30, currentY + 32)

        // Économies
        pdf.setFillColor(...primaryColor)
        pdf.setTextColor(255, 255, 255)
        pdf.setFontSize(10)
        pdf.setFont("helvetica", "bold")
        pdf.rect(150, currentY + 5, 35, 12, "F")
        pdf.text(rec.savings, 155, currentY + 13)

        currentY += 50
      })

      // Page 4 - Plan d'action
      pdf.addPage()

      // En-tête
      pdf.setFillColor(...primaryColor)
      pdf.rect(0, 0, pageWidth, 25, "F")
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(14)
      pdf.setFont("helvetica", "bold")
      pdf.text("Plan d'Action - Prochaines Étapes", 20, 17)

      pdf.setTextColor(...textColor)
      pdf.setFontSize(16)
      pdf.setFont("helvetica", "bold")
      pdf.text("Roadmap de Mise en Œuvre", 20, 45)

      const roadmapSteps = [
        {
          phase: "Phase 1 (Semaine 1-2)",
          actions: ["Souscription EcoBrain", "Audit approfondi automatisé", "Identification fournisseurs verts"],
          impact: "Score +15 points",
        },
        {
          phase: "Phase 2 (Semaine 3-4)",
          actions: ["Migration hébergement vert", "Optimisation supply chain", "Formation équipes"],
          impact: "Économies: €890/mois",
        },
        {
          phase: "Phase 3 (Mois 2-3)",
          actions: ["Transition énergétique", "Certification ISO 14001", "Reporting automatisé"],
          impact: "Conformité CSRD: 95%",
        },
      ]

      let roadmapY = 60
      roadmapSteps.forEach((step, index) => {
        // Phase
        pdf.setFillColor(...secondaryColor)
        pdf.rect(20, roadmapY, pageWidth - 40, 15, "F")
        pdf.setTextColor(255, 255, 255)
        pdf.setFontSize(12)
        pdf.setFont("helvetica", "bold")
        pdf.text(step.phase, 25, roadmapY + 10)

        roadmapY += 20

        // Actions
        pdf.setTextColor(...textColor)
        pdf.setFontSize(10)
        pdf.setFont("helvetica", "normal")
        step.actions.forEach((action, actionIndex) => {
          pdf.text(`• ${action}`, 25, roadmapY)
          roadmapY += 8
        })

        // Impact
        pdf.setFillColor(...lightGray)
        pdf.rect(25, roadmapY, 100, 12, "F")
        pdf.setTextColor(...primaryColor)
        pdf.setFontSize(10)
        pdf.setFont("helvetica", "bold")
        pdf.text(`Impact: ${step.impact}`, 30, roadmapY + 8)

        roadmapY += 25
      })

      // Contact et CTA
      pdf.setFillColor(...primaryColor)
      pdf.rect(20, roadmapY + 10, pageWidth - 40, 40, "F")
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(14)
      pdf.setFont("helvetica", "bold")
      pdf.text("Prêt à Commencer ?", 25, roadmapY + 25)

      pdf.setFontSize(11)
      pdf.setFont("helvetica", "normal")
      pdf.text("Démarrez votre transformation écologique dès aujourd'hui", 25, roadmapY + 35)
      pdf.text("avec EcoBrain - 97€/mois, ROI garanti dès le 1er mois", 25, roadmapY + 42)

      // Footer sur toutes les pages
      const totalPages = pdf.internal.pages.length - 1
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i)
        pdf.setTextColor(156, 163, 175)
        pdf.setFontSize(8)
        pdf.text(`EcoBrain - Rapport d'Audit Écologique - Page ${i}/${totalPages}`, 20, pageHeight - 10)
        pdf.text(`Généré le ${new Date().toLocaleDateString("fr-FR")}`, pageWidth - 60, pageHeight - 10)
      }

      // Télécharger le PDF
      const fileName = `EcoBrain_Audit_${auditData.companyName.replace(/\s+/g, "_")}_${
        auditData.timestamp.toISOString().split("T")[0]
      }.pdf`

      pdf.save(fileName)

      toast({
        title: "Rapport généré avec succès !",
        description: `Le fichier ${fileName} a été téléchargé.`,
      })
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error)
      toast({
        title: "Erreur",
        description: "Impossible de générer le rapport PDF. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const shareReport = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Rapport EcoBrain - ${auditData.companyName}`,
          text: `Découvrez notre score écologique de ${auditData.score}/100 et nos recommandations pour économiser ${auditData.totalSavings}€/an`,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Partage annulé")
      }
    } else {
      // Fallback: copier le lien
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Lien copié !",
        description: "Le lien vers votre rapport a été copié dans le presse-papiers.",
      })
    }
  }

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-6 h-6 text-blue-600 mr-2" />
            Rapport PDF Professionnel
          </CardTitle>
          <CardDescription>
            Téléchargez votre audit complet avec recommandations détaillées et plan d'action
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Contenu du rapport :</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Score détaillé avec benchmarks</li>
                <li>• Recommandations prioritaires</li>
                <li>• Plan d'action sur 3 mois</li>
                <li>• Calculs d'économies précis</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Format professionnel :</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Design corporate avec logo</li>
                <li>• Graphiques et visualisations</li>
                <li>• Prêt pour présentation</li>
                <li>• Compatible impression</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={generatePDF} disabled={isGenerating} className="bg-blue-600 hover:bg-blue-700">
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Génération...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger PDF
                </>
              )}
            </Button>

            <Button variant="outline" onClick={() => setShowPreview(!showPreview)} className="bg-transparent">
              <Eye className="w-4 h-4 mr-2" />
              {showPreview ? "Masquer" : "Aperçu"}
            </Button>

            <Button variant="outline" onClick={shareReport} className="bg-transparent">
              <Share2 className="w-4 h-4 mr-2" />
              Partager
            </Button>
          </div>

          {showPreview && (
            <div className="mt-6 p-4 bg-white border rounded-lg">
              <h4 className="font-semibold mb-3">Aperçu du rapport :</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <Badge className="mb-2">Page 1 - Couverture</Badge>
                  <p className="text-gray-600">
                    Logo EcoBrain, informations entreprise, score principal avec graphique circulaire
                  </p>
                </div>
                <div>
                  <Badge className="mb-2">Page 2 - Analyse</Badge>
                  <p className="text-gray-600">Comparaison sectorielle, métriques clés, tableaux détaillés</p>
                </div>
                <div>
                  <Badge className="mb-2">Page 3 - Recommandations</Badge>
                  <p className="text-gray-600">Actions prioritaires avec économies, codes couleur par urgence</p>
                </div>
                <div>
                  <Badge className="mb-2">Page 4 - Plan d'action</Badge>
                  <p className="text-gray-600">Roadmap 3 mois, phases d'implémentation, contact EcoBrain</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
