"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, User, ArrowRight, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EnhancedNavigation } from "@/components/enhanced-navigation"
import { ScrollReveal } from "@/components/micro-interactions"
import Link from "next/link"

const blogPosts = [
  {
    id: "1",
    title: "CSRD 2024 : Ce que Votre Entreprise Doit Savoir",
    excerpt: "La directive CSRD entre en vigueur. Découvrez les obligations et comment vous y préparer efficacement.",
    content: "La Corporate Sustainability Reporting Directive (CSRD) représente un tournant majeur...",
    author: "Marie Dubois",
    date: "2024-01-15",
    readTime: "8 min",
    category: "Réglementation",
    tags: ["CSRD", "Conformité", "Réglementation"],
    image: "/placeholder.svg?height=300&width=500",
    featured: true,
  },
  {
    id: "2",
    title: "5 Façons de Réduire l'Empreinte Carbone de Votre Site Web",
    excerpt: "Optimisez votre site web pour l'environnement tout en améliorant vos performances et vos coûts.",
    content: "L'impact environnemental du numérique représente aujourd'hui 4% des émissions mondiales...",
    author: "Thomas Martin",
    date: "2024-01-10",
    readTime: "6 min",
    category: "Tech",
    tags: ["Green IT", "Optimisation", "Performance"],
    image: "/placeholder.svg?height=300&width=500",
    featured: false,
  },
  {
    id: "3",
    title: "Supply Chain Durable : Guide Pratique pour les PME",
    excerpt: "Comment transformer votre chaîne d'approvisionnement en avantage concurrentiel durable.",
    content: "La supply chain représente souvent 60% de l'empreinte carbone d'une entreprise...",
    author: "Sophie Laurent",
    date: "2024-01-05",
    readTime: "10 min",
    category: "Supply Chain",
    tags: ["Supply Chain", "Durabilité", "PME"],
    image: "/placeholder.svg?height=300&width=500",
    featured: false,
  },
  {
    id: "4",
    title: "ROI de la Transition Écologique : Calculs et Exemples Concrets",
    excerpt: "Démonstration chiffrée : pourquoi investir dans l'écologie est rentable dès la première année.",
    content: "Contrairement aux idées reçues, la transition écologique génère un ROI positif...",
    author: "Alexandre Chen",
    date: "2023-12-28",
    readTime: "12 min",
    category: "Finance",
    tags: ["ROI", "Finance", "Transition"],
    image: "/placeholder.svg?height=300&width=500",
    featured: false,
  },
  {
    id: "5",
    title: "IA et Environnement : Comment l'Intelligence Artificielle Aide les Entreprises",
    excerpt: "L'IA au service de l'environnement : cas d'usage concrets et bénéfices mesurables.",
    content: "L'intelligence artificielle révolutionne la gestion environnementale des entreprises...",
    author: "Thomas Martin",
    date: "2023-12-20",
    readTime: "7 min",
    category: "IA",
    tags: ["IA", "Innovation", "Environnement"],
    image: "/placeholder.svg?height=300&width=500",
    featured: false,
  },
  {
    id: "6",
    title: "Économies d'Énergie : 10 Actions Immédiates pour Votre Bureau",
    excerpt: "Des actions simples et efficaces pour réduire votre facture énergétique de 30% minimum.",
    content: "L'énergie représente un poste de coût important pour toutes les entreprises...",
    author: "Sophie Laurent",
    date: "2023-12-15",
    readTime: "5 min",
    category: "Énergie",
    tags: ["Énergie", "Économies", "Bureau"],
    image: "/placeholder.svg?height=300&width=500",
    featured: false,
  },
]

const categories = ["Tous", "Réglementation", "Tech", "Supply Chain", "Finance", "IA", "Énergie"]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tous")
  const [filteredPosts, setFilteredPosts] = useState(blogPosts)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    filterPosts(term, selectedCategory)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    filterPosts(searchTerm, category)
  }

  const filterPosts = (search: string, category: string) => {
    let filtered = blogPosts

    if (search) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())),
      )
    }

    if (category !== "Tous") {
      filtered = filtered.filter((post) => post.category === category)
    }

    setFilteredPosts(filtered)
  }

  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <EnhancedNavigation />

      <main className="container mx-auto px-4 py-16">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">Blog EcoBrain</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Actualités, conseils et insights sur la conformité écologique et la transition durable des entreprises.
            </p>
          </div>
        </ScrollReveal>

        {/* Search and Filters */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </ScrollReveal>

        {/* Featured Post */}
        {featuredPost && selectedCategory === "Tous" && !searchTerm && (
          <ScrollReveal>
            <Card className="mb-16 overflow-hidden shadow-xl">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-auto">
                  <img
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-green-600 text-white">Article Vedette</Badge>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <Badge variant="outline">{featuredPost.category}</Badge>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(featuredPost.date).toLocaleDateString("fr-FR")}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{featuredPost.author}</span>
                    </div>
                    <Button asChild>
                      <Link href={`/blog/${featuredPost.id}`}>
                        Lire l'article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        )}

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post, index) => (
            <ScrollReveal key={post.id} delay={index * 0.1}>
              <motion.div whileHover={{ scale: 1.02, y: -5 }}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-3 left-3 bg-white/90 text-gray-900">{post.category}</Badge>
                  </div>
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center space-x-4 text-xs text-gray-600 dark:text-gray-400 mb-3">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(post.date).toLocaleDateString("fr-FR")}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.readTime}
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center">
                        <User className="w-3 h-3 mr-1 text-gray-400" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">{post.author}</span>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/blog/${post.id}`}>
                          Lire plus
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <ScrollReveal>
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Aucun article trouvé</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Essayez de modifier vos critères de recherche ou explorez d'autres catégories.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("Tous")
                  setFilteredPosts(blogPosts)
                }}
              >
                Voir tous les articles
              </Button>
            </div>
          </ScrollReveal>
        )}

        {/* Newsletter CTA */}
        <ScrollReveal>
          <Card className="mt-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <CardContent className="p-12 text-center">
              <h3 className="text-3xl font-bold mb-4">Restez Informé</h3>
              <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                Recevez nos derniers articles et conseils directement dans votre boîte mail.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Input placeholder="Votre email" className="bg-white text-gray-900" />
                <Button className="bg-white text-green-600 hover:bg-gray-100">S'abonner</Button>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </main>
    </div>
  )
}
