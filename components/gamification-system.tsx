"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trophy, Star, Target, Award, TrendingUp, Users, Leaf } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  unlocked: boolean
  progress: number
  maxProgress: number
  points: number
  rarity: "common" | "rare" | "epic" | "legendary"
}

interface Challenge {
  id: string
  title: string
  description: string
  reward: number
  deadline: Date
  progress: number
  maxProgress: number
  type: "daily" | "weekly" | "monthly"
}

interface GamificationSystemProps {
  userScore: number
  totalSavings: number
  companyName: string
}

export function GamificationSystem({ userScore, totalSavings, companyName }: GamificationSystemProps) {
  const [userLevel, setUserLevel] = useState(1)
  const [userXP, setUserXP] = useState(0)
  const [totalPoints, setTotalPoints] = useState(0)
  const [showLevelUp, setShowLevelUp] = useState(false)

  // Calcul du niveau basé sur le score
  useEffect(() => {
    const level = Math.floor(userScore / 20) + 1
    const xp = (userScore % 20) * 5
    const points = userScore * 10 + Math.floor(totalSavings / 100)

    setUserLevel(level)
    setUserXP(xp)
    setTotalPoints(points)

    if (level > 1) {
      setShowLevelUp(true)
      setTimeout(() => setShowLevelUp(false), 3000)
    }
  }, [userScore, totalSavings])

  const achievements: Achievement[] = [
    {
      id: "first-audit",
      title: "Premier Pas Vert",
      description: "Complétez votre premier audit écologique",
      icon: <Leaf className="w-6 h-6" />,
      unlocked: true,
      progress: 1,
      maxProgress: 1,
      points: 100,
      rarity: "common",
    },
    {
      id: "score-master",
      title: "Maître Écologique",
      description: "Atteignez un score de 80+",
      icon: <Trophy className="w-6 h-6" />,
      unlocked: userScore >= 80,
      progress: Math.min(userScore, 80),
      maxProgress: 80,
      points: 500,
      rarity: "epic",
    },
    {
      id: "savings-hero",
      title: "Héros des Économies",
      description: "Identifiez plus de 3000€ d'économies",
      icon: <Star className="w-6 h-6" />,
      unlocked: totalSavings >= 3000,
      progress: Math.min(totalSavings, 3000),
      maxProgress: 3000,
      points: 300,
      rarity: "rare",
    },
    {
      id: "benchmark-beater",
      title: "Au-dessus de la Moyenne",
      description: "Dépassez la moyenne de votre secteur",
      icon: <TrendingUp className="w-6 h-6" />,
      unlocked: userScore > 50,
      progress: Math.max(0, userScore - 50),
      maxProgress: 30,
      points: 200,
      rarity: "rare",
    },
    {
      id: "level-5",
      title: "Expert Confirmé",
      description: "Atteignez le niveau 5",
      icon: <Award className="w-6 h-6" />,
      unlocked: userLevel >= 5,
      progress: userLevel,
      maxProgress: 5,
      points: 1000,
      rarity: "legendary",
    },
  ]

  const challenges: Challenge[] = [
    {
      id: "daily-tip",
      title: "Conseil Quotidien",
      description: "Consultez votre dashboard aujourd'hui",
      reward: 50,
      deadline: new Date(Date.now() + 24 * 60 * 60 * 1000),
      progress: 0,
      maxProgress: 1,
      type: "daily",
    },
    {
      id: "weekly-improvement",
      title: "Amélioration Hebdomadaire",
      description: "Implémentez 2 recommandations cette semaine",
      reward: 200,
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      progress: 0,
      maxProgress: 2,
      type: "weekly",
    },
    {
      id: "monthly-leader",
      title: "Leader du Mois",
      description: "Soyez dans le top 10% de votre secteur",
      reward: 500,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      progress: userScore > 70 ? 1 : 0,
      maxProgress: 1,
      type: "monthly",
    },
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "text-gray-600 bg-gray-100"
      case "rare":
        return "text-blue-600 bg-blue-100"
      case "epic":
        return "text-purple-600 bg-purple-100"
      case "legendary":
        return "text-yellow-600 bg-yellow-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "daily":
        return "bg-green-100 text-green-800"
      case "weekly":
        return "bg-blue-100 text-blue-800"
      case "monthly":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const nextLevelXP = userLevel * 100
  const currentLevelProgress = (userXP / nextLevelXP) * 100

  return (
    <div className="space-y-6">
      {/* Level Up Animation */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -50 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-2xl border-4 border-yellow-300">
              <CardContent className="p-8 text-center">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: 2 }} className="mb-4">
                  <Trophy className="w-16 h-16 mx-auto" />
                </motion.div>
                <h2 className="text-3xl font-bold mb-2">NIVEAU SUPÉRIEUR !</h2>
                <p className="text-xl">Niveau {userLevel} atteint</p>
                <p className="text-lg opacity-90">+{userLevel * 50} points bonus</p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Stats */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {userLevel}
              </div>
              <div>
                <h3 className="text-xl font-bold">{companyName}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Niveau {userLevel} • {totalPoints.toLocaleString()} points
                </p>
              </div>
            </div>
            <Badge className="bg-green-600 text-white">
              {userLevel >= 5 ? "Expert" : userLevel >= 3 ? "Avancé" : "Débutant"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Progression vers niveau {userLevel + 1}</span>
                <span>
                  {userXP}/{nextLevelXP} XP
                </span>
              </div>
              <Progress value={currentLevelProgress} className="h-3" />
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{userScore}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Score Écologique</div>
              </div>
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{achievements.filter((a) => a.unlocked).length}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Achievements</div>
              </div>
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{totalPoints.toLocaleString()}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Points Total</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 text-yellow-600 mr-2" />
              Achievements
            </CardTitle>
            <CardDescription>Débloquez des récompenses en progressant</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0.6 }}
                  animate={{ opacity: achievement.unlocked ? 1 : 0.6 }}
                  className={`p-4 rounded-lg border-2 ${
                    achievement.unlocked
                      ? "border-green-200 bg-green-50 dark:bg-green-900/20"
                      : "border-gray-200 bg-gray-50 dark:bg-gray-800"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${achievement.unlocked ? "text-green-600" : "text-gray-400"}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold">{achievement.title}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge className={getRarityColor(achievement.rarity)} variant="outline">
                            {achievement.rarity}
                          </Badge>
                          <Badge variant="outline">+{achievement.points}</Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{achievement.description}</p>
                      <div className="flex items-center space-x-2">
                        <Progress
                          value={(achievement.progress / achievement.maxProgress) * 100}
                          className="flex-1 h-2"
                        />
                        <span className="text-xs text-gray-500">
                          {achievement.progress}/{achievement.maxProgress}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Challenges */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 text-blue-600 mr-2" />
              Défis Actifs
            </CardTitle>
            <CardDescription>Relevez des défis pour gagner des points bonus</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {challenges.map((challenge) => (
                <motion.div
                  key={challenge.id}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-lg border bg-white dark:bg-gray-800 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">{challenge.title}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge className={getTypeColor(challenge.type)} variant="outline">
                        {challenge.type}
                      </Badge>
                      <Badge variant="outline">+{challenge.reward}</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{challenge.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progression</span>
                      <span>
                        {challenge.progress}/{challenge.maxProgress}
                      </span>
                    </div>
                    <Progress value={(challenge.progress / challenge.maxProgress) * 100} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Échéance: {challenge.deadline.toLocaleDateString("fr-FR")}</span>
                      {challenge.progress === challenge.maxProgress && (
                        <Badge className="bg-green-100 text-green-800">Terminé !</Badge>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leaderboard Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 text-purple-600 mr-2" />
            Classement Sectoriel
          </CardTitle>
          <CardDescription>Votre position parmi les entreprises de votre secteur</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { rank: 1, name: "EcoTech Solutions", score: 95, isUser: false },
              { rank: 2, name: "Green Innovations", score: 89, isUser: false },
              { rank: 3, name: companyName, score: userScore, isUser: true },
              { rank: 4, name: "Sustainable Corp", score: 78, isUser: false },
              { rank: 5, name: "CleanBiz Ltd", score: 72, isUser: false },
            ].map((entry) => (
              <motion.div
                key={entry.rank}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  entry.isUser
                    ? "bg-green-100 dark:bg-green-900/20 border-2 border-green-300"
                    : "bg-gray-50 dark:bg-gray-800"
                }`}
                whileHover={{ scale: entry.isUser ? 1.02 : 1 }}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      entry.rank === 1
                        ? "bg-yellow-500 text-white"
                        : entry.rank === 2
                          ? "bg-gray-400 text-white"
                          : entry.rank === 3
                            ? "bg-orange-500 text-white"
                            : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {entry.rank}
                  </div>
                  <div>
                    <div className={`font-medium ${entry.isUser ? "text-green-800 dark:text-green-200" : ""}`}>
                      {entry.name}
                      {entry.isUser && <Badge className="ml-2 bg-green-600 text-white">Vous</Badge>}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{entry.score}/100</div>
                  <div className="text-xs text-gray-500">Score</div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline" className="bg-transparent">
              Voir le classement complet
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
