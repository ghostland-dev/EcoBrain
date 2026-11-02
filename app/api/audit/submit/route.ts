import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.NEON_NEON_DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      companyName,
      email,
      sector,
      employees,
      hosting,
      localSuppliers,
      renewablePercentage,
      packaging,
      vehicleFleet,
    } = body

    // Calcul du score basé sur les réponses
    let score = 50 // Score de base

    if (hosting === "green") score += 15
    if (hosting === "traditional") score -= 10

    if (localSuppliers === "very-high") score += 25
    if (localSuppliers === "high") score += 20
    if (localSuppliers === "low") score -= 15

    if (renewablePercentage === "very-high") score += 30
    if (renewablePercentage === "high") score += 25
    if (renewablePercentage === "low") score -= 20

    if (packaging === "eco") score += 15
    if (packaging === "traditional") score -= 10

    if (vehicleFleet === "electric") score += 20
    if (vehicleFleet === "mixed") score += 10
    if (vehicleFleet?.includes("thermal")) score -= 15

    const finalScore = Math.max(0, Math.min(100, score))

    // Sauvegarder l'audit
    const audit = await sql`
      INSERT INTO audits (
        company_name, email, sector, employees, 
        hosting_type, local_suppliers, renewable_percentage,
        packaging_type, vehicle_fleet, calculated_score,
        audit_data, created_at
      ) VALUES (
        ${companyName}, ${email}, ${sector}, ${employees},
        ${hosting}, ${localSuppliers}, ${renewablePercentage},
        ${packaging}, ${vehicleFleet}, ${finalScore},
        ${JSON.stringify(body)}, NOW()
      ) RETURNING id
    `
    const auditId = audit[0]?.id
    if (!auditId) {
      throw new Error("Audit insert returned no id")
    }

    // Générer des recommandations
    const recommendations = []

    if (hosting === "traditional") {
      recommendations.push({
        type: "critical",
        title: "Hébergement Web Non-Écologique",
        description: "Votre hébergeur actuel génère 2.3 tonnes CO2/an",
        action: "Migrer vers GreenGeeks (-80% CO2, même prix)",
        savings: "€890/an",
        priority: 1,
      })
    }

    if (localSuppliers === "low") {
      recommendations.push({
        type: "high",
        title: "Supply Chain Internationale",
        description: "60% de votre empreinte carbone vient du transport",
        action: "Identifier des fournisseurs locaux",
        savings: "€2,340/an",
        priority: 2,
      })
    }

    if (renewablePercentage === "low") {
      recommendations.push({
        type: "medium",
        title: "Énergie Non-Renouvelable",
        description: "Votre consommation énergétique n'est pas optimisée",
        action: "Passer à 70% d'énergie renouvelable",
        savings: "€1,560/an",
        priority: 3,
      })
    }

    // Sauvegarder les recommandations
    for (const rec of recommendations) {
      await sql`
        INSERT INTO recommendations (
          audit_id, type, title, description, action, 
          estimated_savings, priority, created_at
        ) VALUES (
          ${auditId}, ${rec.type}, ${rec.title}, ${rec.description},
          ${rec.action}, ${rec.savings}, ${rec.priority}, NOW()
        )
      `
    }

    return NextResponse.json({
      success: true,
      auditId: auditId,
      score: finalScore,
      recommendations,
      benchmarkScore: getSectorBenchmark(sector),
      totalSavings: recommendations.reduce(
        (sum, rec) => sum + Number.parseInt(rec.savings.replace(/[€,]/g, "").replace("/an", "")),
        0,
      ),
    })
  } catch (error) {
    console.error("Erreur lors de la soumission de l'audit:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}

function getSectorBenchmark(sector: string): number {
  const benchmarks: Record<string, number> = {
    ecommerce: 45,
    saas: 62,
    manufacturing: 38,
    services: 58,
    retail: 42,
    food: 35,
    logistics: 28,
    other: 50,
  }
  return benchmarks[sector] || 50
}
