"use client"

import { ScrollReveal } from "@/components/micro-interactions"
import { EnhancedNavigation } from "@/components/enhanced-navigation"
import { Card, CardContent } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <EnhancedNavigation />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Conditions Générales d'Utilisation
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">Dernière mise à jour : 15 janvier 2024</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <Card className="shadow-xl">
              <CardContent className="p-8 prose prose-lg max-w-none dark:prose-invert">
                <h2>1. Objet</h2>
                <p>
                  Les présentes conditions générales d'utilisation (« CGU ») régissent l'utilisation de la plateforme
                  EcoBrain fournie par EcoBrain SAS, société par actions simplifiée au capital de 100 000 euros,
                  immatriculée au RCS de Paris sous le numéro 123 456 789.
                </p>

                <h2>2. Acceptation des conditions</h2>
                <p>
                  L'utilisation de la plateforme EcoBrain implique l'acceptation pleine et entière des présentes CGU. Si
                  vous n'acceptez pas ces conditions, vous ne devez pas utiliser nos services.
                </p>

                <h2>3. Description des services</h2>
                <p>EcoBrain propose une plateforme SaaS permettant :</p>
                <ul>
                  <li>L'audit écologique automatisé des entreprises</li>
                  <li>Le suivi des performances environnementales</li>
                  <li>La génération de rapports de conformité CSRD</li>
                  <li>Des recommandations personnalisées d'amélioration</li>
                </ul>

                <h2>4. Inscription et compte utilisateur</h2>
                <h3>4.1 Conditions d'inscription</h3>
                <p>
                  L'inscription est réservée aux entreprises et professionnels. Vous devez fournir des informations
                  exactes et complètes lors de votre inscription.
                </p>

                <h3>4.2 Responsabilité du compte</h3>
                <p>
                  Vous êtes responsable de la confidentialité de vos identifiants et de toutes les activités effectuées
                  sous votre compte.
                </p>

                <h2>5. Utilisation des services</h2>
                <h3>5.1 Utilisation autorisée</h3>
                <p>Vous vous engagez à utiliser nos services uniquement pour :</p>
                <ul>
                  <li>Des activités légales et légitimes</li>
                  <li>Votre usage professionnel interne</li>
                  <li>Le respect de toutes les lois applicables</li>
                </ul>

                <h3>5.2 Utilisation interdite</h3>
                <p>Il est strictement interdit de :</p>
                <ul>
                  <li>Utiliser nos services à des fins illégales</li>
                  <li>Tenter d'accéder aux données d'autres utilisateurs</li>
                  <li>Perturber le fonctionnement de la plateforme</li>
                  <li>Reproduire ou distribuer nos contenus sans autorisation</li>
                </ul>

                <h2>6. Tarifs et paiement</h2>
                <h3>6.1 Tarification</h3>
                <p>
                  Les tarifs de nos services sont indiqués sur notre site web et peuvent être modifiés à tout moment
                  avec un préavis de 30 jours.
                </p>

                <h3>6.2 Modalités de paiement</h3>
                <p>
                  Les paiements sont effectués par carte bancaire ou virement. La facturation est mensuelle ou annuelle
                  selon l'abonnement choisi.
                </p>

                <h2>7. Propriété intellectuelle</h2>
                <p>
                  Tous les éléments de la plateforme EcoBrain (logiciels, bases de données, contenus, marques, logos)
                  sont protégés par les droits de propriété intellectuelle et appartiennent à EcoBrain SAS ou à ses
                  partenaires.
                </p>

                <h2>8. Protection des données</h2>
                <p>
                  Le traitement de vos données personnelles est régi par notre politique de confidentialité, conforme au
                  RGPD. Vos données d'entreprise restent votre propriété exclusive.
                </p>

                <h2>9. Disponibilité et maintenance</h2>
                <p>
                  Nous nous efforçons d'assurer une disponibilité maximale de nos services. Des interruptions peuvent
                  survenir pour maintenance ou cas de force majeure.
                </p>

                <h2>10. Responsabilité</h2>
                <h3>10.1 Limitation de responsabilité</h3>
                <p>
                  Notre responsabilité est limitée au montant des sommes versées au cours des 12 derniers mois. Nous ne
                  saurions être tenus responsables des dommages indirects.
                </p>

                <h3>10.2 Garanties</h3>
                <p>
                  Nos services sont fournis "en l'état". Nous ne garantissons pas qu'ils répondront à tous vos besoins
                  spécifiques.
                </p>

                <h2>11. Résiliation</h2>
                <h3>11.1 Résiliation par l'utilisateur</h3>
                <p>
                  Vous pouvez résilier votre abonnement à tout moment depuis votre espace client avec un préavis d'un
                  mois.
                </p>

                <h3>11.2 Résiliation par EcoBrain</h3>
                <p>
                  Nous pouvons suspendre ou résilier votre compte en cas de violation des présentes CGU, avec un préavis
                  de 15 jours sauf cas grave.
                </p>

                <h2>12. Modifications des CGU</h2>
                <p>
                  Nous nous réservons le droit de modifier les présentes CGU à tout moment. Les modifications
                  importantes vous seront notifiées par email 30 jours avant leur entrée en vigueur.
                </p>

                <h2>13. Droit applicable et juridiction</h2>
                <p>
                  Les présentes CGU sont régies par le droit français. Tout litige sera soumis à la juridiction
                  exclusive des tribunaux de Paris.
                </p>

                <h2>14. Contact</h2>
                <p>Pour toute question relative aux présentes CGU :</p>
                <ul>
                  <li>Email : legal@ecobrain.fr</li>
                  <li>Adresse : EcoBrain SAS, 15 Rue de la Paix, 75002 Paris</li>
                  <li>Téléphone : +33 1 23 45 67 89</li>
                </ul>

                <h2>15. Dispositions diverses</h2>
                <p>
                  Si une disposition des présentes CGU est déclarée nulle ou inapplicable, les autres dispositions
                  conservent leur pleine validité. L'absence d'exercice d'un droit ne constitue pas une renonciation à
                  ce droit.
                </p>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </main>
    </div>
  )
}
