"use client"

import { motion } from "framer-motion"
import { Leaf, Zap, TrendingUp } from "lucide-react"

interface EnhancedLoadingProps {
  message?: string
  progress?: number
  type?: "default" | "audit" | "calculation"
}

export function EnhancedLoading({ message = "Chargement...", progress, type = "default" }: EnhancedLoadingProps) {
  const getLoadingContent = () => {
    switch (type) {
      case "audit":
        return {
          icon: <Leaf className="w-8 h-8 text-green-600" />,
          title: "Analyse en cours...",
          steps: [
            "Scan de votre infrastructure IT",
            "Analyse de la supply chain",
            "Calcul de l'empreinte carbone",
            "Identification des opportunités",
            "Génération des recommandations",
          ],
        }
      case "calculation":
        return {
          icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
          title: "Calcul des économies...",
          steps: [
            "Analyse des données sectorielles",
            "Calcul du potentiel d'économies",
            "Comparaison avec les benchmarks",
            "Estimation du ROI",
          ],
        }
      default:
        return {
          icon: <Zap className="w-8 h-8 text-purple-600" />,
          title: message,
          steps: [],
        }
    }
  }

  const content = getLoadingContent()

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      {/* Animated Icon */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          scale: { duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        }}
        className="mb-6"
      >
        {content.icon}
      </motion.div>

      {/* Title */}
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-semibold text-gray-900 dark:text-white mb-4"
      >
        {content.title}
      </motion.h3>

      {/* Progress Bar */}
      {progress !== undefined && (
        <div className="w-full max-w-md mb-6">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Progression</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-green-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      )}

      {/* Loading Steps */}
      {content.steps.length > 0 && (
        <div className="space-y-2 max-w-md">
          {content.steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-center space-x-3"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: index * 0.3,
                }}
                className="w-2 h-2 bg-green-600 rounded-full"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">{step}</span>
            </motion.div>
          ))}
        </div>
      )}

      {/* Animated Dots */}
      <div className="flex space-x-1 mt-6">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            animate={{
              y: [0, -10, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              delay: index * 0.2,
            }}
            className="w-2 h-2 bg-green-600 rounded-full"
          />
        ))}
      </div>
    </div>
  )
}
