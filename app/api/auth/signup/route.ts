import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.NEON_NEON_DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, password, company, employees, plan } = body

    // Validation basique
    if (!firstName || !lastName || !email || !password || !company) {
      return NextResponse.json({ error: "Tous les champs obligatoires doivent être remplis" }, { status: 400 })
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `

    if (existingUser.length > 0) {
      return NextResponse.json({ error: "Un compte avec cet email existe déjà" }, { status: 409 })
    }

    // Hash du mot de passe (en production, utiliser bcrypt)
    const hashedPassword = Buffer.from(password).toString("base64")

    // Créer l'utilisateur
    const user = await sql`
      INSERT INTO users (
        first_name, last_name, email, password_hash, 
        company_name, company_size, plan_type, 
        created_at, updated_at
      ) VALUES (
        ${firstName}, ${lastName}, ${email}, ${hashedPassword},
        ${company}, ${employees || "unknown"}, ${plan || "starter"},
        NOW(), NOW()
      ) RETURNING id, email, first_name, last_name
    `

    // Créer le profil d'entreprise
    await sql`
      INSERT INTO companies (
        user_id, name, size, created_at, updated_at
      ) VALUES (
        ${user[0].id}, ${company}, ${employees || "unknown"}, NOW(), NOW()
      )
    `

    // Créer l'abonnement
    await sql`
      INSERT INTO subscriptions (
        user_id, plan_type, status, trial_ends_at, created_at, updated_at
      ) VALUES (
        ${user[0].id}, ${plan || "starter"}, 'trial', 
        NOW() + INTERVAL '14 days', NOW(), NOW()
      )
    `

    return NextResponse.json({
      success: true,
      user: {
        id: user[0].id,
        email: user[0].email,
        firstName: user[0].first_name,
        lastName: user[0].last_name,
      },
      message: "Compte créé avec succès",
    })
  } catch (error) {
    console.error("Erreur lors de la création du compte:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}
