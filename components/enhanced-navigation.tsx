"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, Leaf, Zap, BarChart3, Users, Award, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ThemeToggle } from "./theme-toggle"
import Link from "next/link"

interface NavItem {
  label: string
  href: string
  icon?: React.ReactNode
  description?: string
  children?: NavItem[]
}

const navigationItems: NavItem[] = [
  {
    label: "Solutions",
    href: "#",
    children: [
      {
        label: "Audit Écologique",
        href: "/audit",
        icon: <Leaf className="w-4 h-4" />,
        description: "Analyse complète de votre empreinte carbone",
      },
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: <BarChart3 className="w-4 h-4" />,
        description: "Suivi en temps réel de vos performances",
      },
      {
        label: "Optimisation IA",
        href: "#",
        icon: <Zap className="w-4 h-4" />,
        description: "Recommandations personnalisées par IA",
      },
    ],
  },
  {
    label: "Entreprise",
    href: "#",
    children: [
      {
        label: "À propos",
        href: "#",
        icon: <Users className="w-4 h-4" />,
        description: "Notre mission et notre équipe",
      },
      {
        label: "Success Stories",
        href: "#",
        icon: <Award className="w-4 h-4" />,
        description: "Témoignages de nos clients",
      },
      {
        label: "Contact",
        href: "#",
        icon: <Phone className="w-4 h-4" />,
        description: "Parlons de votre projet",
      },
    ],
  },
  {
    label: "Tarifs",
    href: "#pricing",
  },
  {
    label: "Blog",
    href: "#",
  },
]

export function EnhancedNavigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2 cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">EcoBrain</span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <div key={item.label} className="relative">
                  {item.children ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setActiveDropdown(item.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200">
                        <span>{item.label}</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>

                      <AnimatePresence>
                        {activeDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-80"
                          >
                            <Card className="shadow-xl border-2 border-green-100 dark:border-green-800">
                              <CardContent className="p-4">
                                <div className="space-y-2">
                                  {item.children.map((child) => (
                                    <Link key={child.label} href={child.href}>
                                      <motion.div
                                        whileHover={{ x: 5 }}
                                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors duration-200 cursor-pointer"
                                      >
                                        {child.icon && (
                                          <div className="text-green-600 dark:text-green-400 mt-0.5">{child.icon}</div>
                                        )}
                                        <div>
                                          <div className="font-medium text-gray-900 dark:text-white">{child.label}</div>
                                          {child.description && (
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                              {child.description}
                                            </div>
                                          )}
                                        </div>
                                      </motion.div>
                                    </Link>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />

              {/* CTA Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-green-600 hover:bg-green-700 text-white hidden sm:inline-flex" asChild>
                  <Link href="/audit">Audit Gratuit</Link>
                </Button>
              </motion.div>

              {/* Mobile menu button */}
              <Button variant="ghost" size="sm" onClick={toggleMobileMenu} className="lg:hidden">
                <motion.div animate={{ rotate: isMobileMenuOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.div>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="space-y-4">
                  {navigationItems.map((item) => (
                    <div key={item.label}>
                      {item.children ? (
                        <div>
                          <button
                            onClick={() => handleDropdownToggle(item.label)}
                            className="flex items-center justify-between w-full text-left text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                          >
                            <span>{item.label}</span>
                            <motion.div
                              animate={{ rotate: activeDropdown === item.label ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="w-4 h-4" />
                            </motion.div>
                          </button>

                          <AnimatePresence>
                            {activeDropdown === item.label && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="mt-2 ml-4 space-y-2"
                              >
                                {item.children.map((child) => (
                                  <Link key={child.label} href={child.href}>
                                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors duration-200">
                                      {child.icon && (
                                        <div className="text-green-600 dark:text-green-400">{child.icon}</div>
                                      )}
                                      <div>
                                        <div className="font-medium text-gray-900 dark:text-white">{child.label}</div>
                                        {child.description && (
                                          <div className="text-sm text-gray-600 dark:text-gray-400">
                                            {child.description}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className="block text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white" asChild>
                      <Link href="/audit">Audit Gratuit</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer to prevent content from being hidden behind fixed header */}
      <div className="h-16" />
    </>
  )
}
