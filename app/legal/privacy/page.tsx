"use client"

import { ScrollReveal } from "@/components/micro-interactions"
import { EnhancedNavigation } from "@/components/enhanced-navigation"
import { Card, CardContent } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <EnhancedNavigation />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Politique de Confidentialité</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">Dernière mise à jour : 15 janvier 2024</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <Card className="shadow-xl">
              <CardContent className="p-8 prose prose-lg max-w-none dark:prose-invert">
                <h2>1. Introduction</h2>
                <p>
                  EcoBrain SAS (« nous », « notre », « nos ») s'engage à protéger et respecter votre vie privée. Cette
                  politique de confidentialité explique comment nous collectons, utilisons, stockons et protégeons vos
                  informations personnelles lorsque vous utilisez notre plateforme EcoBrain.
                </p>

                <h2>2. Informations que nous collectons</h2>

                <h3>2.1 Informations que vous nous fournissez</h3>
                <ul>
                  <li>Informations de compte (nom, email, mot de passe)</li>
                  <li>Informations d'entreprise (nom, secteur, taille)</li>
                  <li>Données d'audit écologique</li>
                  <li>Communications avec notre support</li>
                </ul>

                <h3>2.2 Informations collectées automatiquement</h3>
                <ul>
                  <li>Données de navigation (pages visitées, temps passé)</li>
                  <li>Informations techniques (adresse IP, navigateur, appareil)</li>
                  <li>Cookies et technologies similaires</li>
                </ul>

                <h2>3. Comment nous utilisons vos informations</h2>
                <p>Nous utilisons vos informations pour :</p>
                <ul>
                  <li>Fournir et améliorer nos services</li>
                  <li>Personnaliser votre expérience</li>
                  <li>Communiquer avec vous</li>
                  <li>Assurer la sécurité de notre plateforme</li>
                  <li>Respecter nos obligations légales</li>
                </ul>

                <h2>4. Partage de vos informations</h2>
                <p>
                  Nous ne vendons jamais vos données personnelles. Nous pouvons partager vos informations uniquement
                  dans les cas suivants :
                </p>
                <ul>
                  <li>Avec votre consentement explicite</li>
                  <li>Avec nos prestataires de services (sous contrat strict)</li>
                  <li>Pour respecter une obligation légale</li>
                  <li>Pour protéger nos droits ou ceux de tiers</li>
                </ul>

                <h2>5. Sécurité des données</h2>
                <p>
                  Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour
                  protéger vos données contre l'accès non autorisé, la modification, la divulgation ou la destruction.
                </p>

                <h2>6. Vos droits</h2>
                <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                <ul>
                  <li>Droit d'accès à vos données</li>
                  <li>Droit de rectification</li>
                  <li>Droit à l'effacement</li>
                  <li>Droit à la limitation du traitement</li>
                  <li>Droit à la portabilité</li>
                  <li>Droit d'opposition</li>
                </ul>

                <h2>7. Cookies</h2>
                <p>
                  Nous utilisons des cookies pour améliorer votre expérience. Vous pouvez gérer vos préférences de
                  cookies dans les paramètres de votre navigateur.
                </p>

                <h2>8. Conservation des données</h2>
                <p>
                  Nous conservons vos données personnelles aussi longtemps que nécessaire pour fournir nos services et
                  respecter nos obligations légales.
                </p>

                <h2>9. Transferts internationaux</h2>
                <p>
                  Vos données peuvent être transférées vers des pays situés en dehors de l'UE, uniquement avec des
                  garanties appropriées.
                </p>

                <h2>10. Modifications</h2>
                <p>
                  Nous pouvons modifier cette politique de confidentialité. Les modifications importantes vous seront
                  notifiées par email.
                </p>

                <h2>11. Contact</h2>
                <p>Pour toute question concernant cette politique de confidentialité, contactez-nous :</p>
                <ul>
                  <li>Email : privacy@ecobrain.fr</li>
                  <li>Adresse : 15 Rue de la Paix, 75002 Paris</li>
                  <li>DPO : dpo@ecobrain.fr</li>
                </ul>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </main>
    </div>
  )
}
