"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, X, AlertTriangle, CheckCircle, Info, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"

interface Notification {
  id: string
  type: "success" | "warning" | "info" | "achievement"
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
  actionText?: string
}

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { toast } = useToast()

  // Simuler des notifications en temps réel
  useEffect(() => {
    const initialNotifications: Notification[] = [
      {
        id: "1",
        type: "achievement",
        title: "🎉 Audit terminé !",
        message: "Votre score écologique de 73/100 est au-dessus de la moyenne sectorielle",
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        read: false,
      },
      {
        id: "2",
        type: "warning",
        title: "⚠️ Action requise",
        message: "Votre hébergeur génère 2.3 tonnes CO2/an. Migration recommandée vers GreenGeeks",
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        read: false,
        actionUrl: "#",
        actionText: "Voir les options",
      },
      {
        id: "3",
        type: "info",
        title: "💡 Nouvelle recommandation",
        message: "Fournisseur local identifié pour vos emballages : -30% CO2, -15% coût",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        read: true,
      },
      {
        id: "4",
        type: "success",
        title: "✅ Économies détectées",
        message: "Optimisation possible de vos campagnes email : €450/mois d'économies",
        timestamp: new Date(Date.now() - 60 * 60 * 1000),
        read: true,
      },
      {
        id: "5",
        type: "info",
        title: "📅 Rappel CSRD",
        message: "Échéance déclaration CSRD dans 45 jours. Votre conformité actuelle : 87%",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: false,
      },
    ]

    setNotifications(initialNotifications)

    // Simuler de nouvelles notifications
    const interval = setInterval(() => {
      const newNotifications = [
        {
          id: Date.now().toString(),
          type: "info" as const,
          title: "🔄 Scan automatique",
          message: "Nouveau scan programmé effectué. 2 nouvelles optimisations détectées",
          timestamp: new Date(),
          read: false,
        },
        {
          id: (Date.now() + 1).toString(),
          type: "achievement" as const,
          title: "🏆 Objectif atteint",
          message: "Félicitations ! Vous avez réduit votre empreinte carbone de 15% ce mois",
          timestamp: new Date(),
          read: false,
        },
        {
          id: (Date.now() + 2).toString(),
          type: "warning" as const,
          title: "⚡ Consommation élevée",
          message: "Pic de consommation énergétique détecté. Vérifiez vos équipements",
          timestamp: new Date(),
          read: false,
        },
      ]

      const randomNotification = newNotifications[Math.floor(Math.random() * newNotifications.length)]

      setNotifications((prev) => [randomNotification, ...prev.slice(0, 9)]) // Garder max 10 notifications

      // Toast pour nouvelle notification
      toast({
        title: randomNotification.title,
        description: randomNotification.message,
      })
    }, 30000) // Nouvelle notification toutes les 30 secondes

    return () => clearInterval(interval)
  }, [toast])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-orange-500" />
      case "achievement":
        return <Award className="w-5 h-5 text-purple-500" />
      default:
        return <Info className="w-5 h-5 text-blue-500" />
    }
  }

  const getNotificationBg = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200"
      case "warning":
        return "bg-orange-50 border-orange-200"
      case "achievement":
        return "bg-purple-50 border-purple-200"
      default:
        return "bg-blue-50 border-blue-200"
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "À l'instant"
    if (minutes < 60) return `Il y a ${minutes}min`
    if (hours < 24) return `Il y a ${hours}h`
    return `Il y a ${days}j`
  }

  return (
    <div className="relative">
      {/* Bouton de notification */}
      <Button variant="outline" size="sm" onClick={() => setIsOpen(!isOpen)} className="relative bg-transparent">
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
          >
            {unreadCount}
          </motion.div>
        )}
      </Button>

      {/* Panel de notifications */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, x: 300, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.9 }}
              transition={{ type: "spring", damping: 20 }}
              className="absolute right-0 top-12 w-96 bg-white rounded-lg shadow-xl border z-50"
            >
              <Card className="border-0 shadow-none">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Notifications</CardTitle>
                      <CardDescription>{unreadCount > 0 ? `${unreadCount} non lues` : "Toutes lues"}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      {unreadCount > 0 && (
                        <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                          Tout lire
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  <ScrollArea className="h-96">
                    <div className="space-y-1 p-4">
                      {notifications.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p>Aucune notification</p>
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${getNotificationBg(
                              notification.type,
                            )} ${!notification.read ? "ring-2 ring-blue-200" : ""}`}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0 mt-0.5">{getNotificationIcon(notification.type)}</div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-medium text-gray-900 truncate">{notification.title}</p>
                                  <div className="flex items-center space-x-2">
                                    {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        deleteNotification(notification.id)
                                      }}
                                      className="h-6 w-6 p-0 hover:bg-red-100"
                                    >
                                      <X className="w-3 h-3" />
                                    </Button>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                <div className="flex items-center justify-between mt-2">
                                  <span className="text-xs text-gray-400">{formatTime(notification.timestamp)}</span>
                                  {notification.actionUrl && (
                                    <Button variant="ghost" size="sm" className="h-6 text-xs">
                                      {notification.actionText}
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
