import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { SignJWT } from "jose"

const sql = neon(process.env.NEON_NEON_DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email et mot de passe requis" }, { status: 400 })
    }

    // Rechercher l'utilisateur
    const users = await sql`
      SELECT u.*, c.name as company_name, s.plan_type, s.status as subscription_status
      FROM users u
      LEFT JOIN companies c ON u.id = c.user_id
      LEFT JOIN subscriptions s ON u.id = s.user_id
      WHERE u.email = ${email}
    `

    if (users.length === 0) {
      return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 })
    }

    const user = users[0]
    if (!user) {
      return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 })
    }

    // Vérifier le mot de passe (en production, utiliser bcrypt)
    const hashedPassword = Buffer.from(password).toString("base64")
    if (user.password_hash !== hashedPassword) {
      return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 })
    }

    // Créer le JWT
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")
    const token = await new SignJWT({
      userId: user.id,
      email: user.email,
      plan: user.plan_type,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret)

    // Mettre à jour la dernière connexion
    await sql`
      UPDATE users SET last_login_at = NOW() WHERE id = ${user.id}
    `

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        company: user.company_name,
        plan: user.plan_type,
        subscriptionStatus: user.subscription_status,
      },
    })

    // Définir le cookie JWT
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 jours
    })

    return response
  } catch (error) {
    console.error("Erreur lors de la connexion:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}
