"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowLeft, Share2, BookOpen, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { EnhancedNavigation } from "@/components/enhanced-navigation"
import { ScrollReveal } from "@/components/micro-interactions"
import Link from "next/link"
import { useParams } from "next/navigation"

const blogPost = {
  id: "1",
  title: "CSRD 2024 : Ce que Votre Entreprise Doit Savoir",
  excerpt: "La directive CSRD entre en vigueur. Découvrez les obligations et comment vous y préparer efficacement.",
  author: "Marie Dubois",
  date: "2024-01-15",
  readTime: "8 min",
  category: "Réglementation",
  tags: ["CSRD", "Conformité", "Réglementation", "Europe"],
  image: "/placeholder.svg?height=400&width=800",
  content: `
    <h2>Introduction à la CSRD</h2>
    <p>La Corporate Sustainability Reporting Directive (CSRD) représente un tournant majeur dans la réglementation européenne en matière de reporting de durabilité. Cette directive, qui remplace la NFRD (Non-Financial Reporting Directive), élargit considérablement le champ d'application et renforce les exigences de transparence.</p>
    
    <h2>Qui est concerné par la CSRD ?</h2>
    <p>La CSRD s'applique progressivement à différentes catégories d'entreprises :</p>
    <ul>
      <li><strong>2024</strong> : Grandes entreprises déjà soumises à la NFRD</li>
      <li><strong>2025</strong> : Toutes les grandes entreprises (500+ employés)</li>
      <li><strong>2026</strong> : PME cotées en bourse</li>
      <li><strong>2028</strong> : Filiales d'entreprises non-européennes</li>
    </ul>
    
    <h2>Les principales obligations</h2>
    <p>La CSRD impose des obligations strictes en matière de reporting :</p>
    
    <h3>1. Rapport de durabilité détaillé</h3>
    <p>Les entreprises doivent publier un rapport de durabilité comprenant :</p>
    <ul>
      <li>Modèle d'affaires et stratégie</li>
      <li>Objectifs de durabilité</li>
      <li>Rôle des organes d'administration</li>
      <li>Politiques de diligence raisonnable</li>
      <li>Principaux impacts, risques et opportunités</li>
      <li>Indicateurs clés de performance</li>
    </ul>
    
    <h3>2. Standards européens de reporting</h3>
    <p>Les rapports doivent suivre les European Sustainability Reporting Standards (ESRS), qui couvrent :</p>
    <ul>
      <li>Questions environnementales</li>
      <li>Questions sociales</li>
      <li>Questions de gouvernance</li>
    </ul>
    
    <h3>3. Audit et assurance</h3>
    <p>Les informations de durabilité doivent être auditées par un commissaire aux comptes ou un organisme indépendant.</p>
    
    <h2>Comment se préparer ?</h2>
    <p>La préparation à la CSRD nécessite une approche structurée :</p>
    
    <h3>1. Évaluation de l'applicabilité</h3>
    <p>Déterminez si votre entreprise est concernée et à quelle échéance.</p>
    
    <h3>2. Analyse de matérialité</h3>
    <p>Identifiez les enjeux ESG les plus pertinents pour votre activité.</p>
    
    <h3>3. Collecte de données</h3>
    <p>Mettez en place des processus de collecte et de suivi des données ESG.</p>
    
    <h3>4. Formation des équipes</h3>
    <p>Formez vos équipes aux nouvelles exigences et aux standards ESRS.</p>
    
    <h2>Les bénéfices de la conformité CSRD</h2>
    <p>Au-delà de l'obligation réglementaire, la CSRD offre des opportunités :</p>
    <ul>
      <li><strong>Amélioration de l'image de marque</strong> : Transparence et crédibilité renforcées</li>
      <li><strong>Accès au financement</strong> : Critères ESG de plus en plus importants</li>
      <li><strong>Gestion des risques</strong> : Meilleure anticipation des risques climatiques</li>
      <li><strong>Innovation</strong> : Identification de nouvelles opportunités business</li>
    </ul>
    
    <h2>Comment EcoBrain peut vous aider</h2>
    <p>Notre plateforme simplifie votre mise en conformité CSRD :</p>
    <ul>
      <li>Collecte automatisée des données ESG</li>
      <li>Tableaux de bord temps réel</li>
      <li>Génération automatique de rapports</li>
      <li>Accompagnement par nos experts</li>
    </ul>
    
    <h2>Conclusion</h2>
    <p>La CSRD représente un défi majeur mais aussi une opportunité pour les entreprises européennes. Une préparation anticipée et l'utilisation d'outils adaptés comme EcoBrain permettent de transformer cette obligation en avantage concurrentiel.</p>
    
    <p>N'attendez pas la dernière minute : commencez dès maintenant votre préparation à la CSRD avec notre audit gratuit.</p>
  `,
}

const relatedPosts = [
  {
    id: "2",
    title: "5 Façons de Réduire l'Empreinte Carbone de Votre Site Web",
    category: "Tech",
    readTime: "6 min",
  },
  {
    id: "3",
    title: "Supply Chain Durable : Guide Pratique pour les PME",
    category: "Supply Chain",
    readTime: "10 min",
  },
  {
    id: "4",
    title: "ROI de la Transition Écologique : Calculs et Exemples Concrets",
    category: "Finance",
    readTime: "12 min",
  },
]

export default function BlogPostPage() {
  const params = useParams()
  const [readingProgress, setReadingProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const article = document.getElementById("article-content")
      if (article) {
        const articleTop = article.offsetTop
        const articleHeight = article.offsetHeight
        const windowHeight = window.innerHeight
        const scrollTop = window.scrollY

        const progress = Math.min(Math.max((scrollTop - articleTop + windowHeight) / articleHeight, 0), 1)
        setReadingProgress(progress * 100)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blogPost.title,
          text: blogPost.excerpt,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Partage annulé")
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <EnhancedNavigation />

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <motion.div
          className="h-full bg-green-600"
          style={{ width: `${readingProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <main className="container mx-auto px-4 py-16">
        {/* Back Button */}
        <ScrollReveal>
          <Button variant="ghost" className="mb-8" asChild>
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au blog
            </Link>
          </Button>
        </ScrollReveal>

        <div className="grid lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Article Header */}
            <ScrollReveal>
              <div className="mb-8">
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <Badge variant="outline">{blogPost.category}</Badge>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(blogPost.date).toLocaleDateString("fr-FR")}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {blogPost.readTime}
                  </div>
                </div>

                <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  {blogPost.title}
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">{blogPost.excerpt}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {blogPost.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">{blogPost.author}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">CEO & Co-fondatrice</div>
                    </div>
                  </div>

                  <Button variant="outline" onClick={handleShare} className="bg-transparent">
                    <Share2 className="w-4 h-4 mr-2" />
                    Partager
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            {/* Featured Image */}
            <ScrollReveal>
              <div className="mb-12">
                <img
                  src={blogPost.image || "/placeholder.svg"}
                  alt={blogPost.title}
                  className="w-full h-64 lg:h-96 object-cover rounded-2xl shadow-xl"
                />
              </div>
            </ScrollReveal>

            {/* Article Content */}
            <ScrollReveal>
              <div
                id="article-content"
                className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-white prose-ul:text-gray-700 dark:prose-ul:text-gray-300"
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
              />
            </ScrollReveal>

            {/* Tags */}
            <ScrollReveal>
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2 mb-4">
                  <Tag className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Tags :</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {blogPost.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="bg-transparent">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* CTA */}
            <ScrollReveal>
              <Card className="mt-12 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                <CardContent className="p-8 text-center">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 text-green-200" />
                  <h3 className="text-2xl font-bold mb-4">Prêt à Passer à l'Action ?</h3>
                  <p className="text-green-100 mb-6">
                    Commencez votre audit gratuit et découvrez comment EcoBrain peut vous aider avec la CSRD.
                  </p>
                  <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100" asChild>
                    <Link href="/audit">Démarrer l'Audit Gratuit</Link>
                  </Button>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Table of Contents */}
              <ScrollReveal>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Sommaire</h3>
                    <nav className="space-y-2 text-sm">
                      <a
                        href="#introduction"
                        className="block text-gray-600 dark:text-gray-400 hover:text-green-600 transition-colors"
                      >
                        Introduction à la CSRD
                      </a>
                      <a
                        href="#qui-est-concerne"
                        className="block text-gray-600 dark:text-gray-400 hover:text-green-600 transition-colors"
                      >
                        Qui est concerné ?
                      </a>
                      <a
                        href="#obligations"
                        className="block text-gray-600 dark:text-gray-400 hover:text-green-600 transition-colors"
                      >
                        Les principales obligations
                      </a>
                      <a
                        href="#preparation"
                        className="block text-gray-600 dark:text-gray-400 hover:text-green-600 transition-colors"
                      >
                        Comment se préparer ?
                      </a>
                      <a
                        href="#benefices"
                        className="block text-gray-600 dark:text-gray-400 hover:text-green-600 transition-colors"
                      >
                        Les bénéfices
                      </a>
                      <a
                        href="#ecobrain"
                        className="block text-gray-600 dark:text-gray-400 hover:text-green-600 transition-colors"
                      >
                        Comment EcoBrain aide
                      </a>
                    </nav>
                  </CardContent>
                </Card>
              </ScrollReveal>

              {/* Related Posts */}
              <ScrollReveal>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Articles Similaires</h3>
                    <div className="space-y-4">
                      {relatedPosts.map((post) => (
                        <Link key={post.id} href={`/blog/${post.id}`}>
                          <div className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                            <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-2 line-clamp-2">
                              {post.title}
                            </h4>
                            <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                              <Badge variant="outline" className="text-xs">
                                {post.category}
                              </Badge>
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>

              {/* Newsletter */}
              <ScrollReveal>
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Newsletter</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Recevez nos derniers articles directement par email.
                    </p>
                    <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                      S'abonner
                    </Button>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
