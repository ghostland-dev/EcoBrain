"use client"

import { LoadingSpinner } from "@/components/loading-spinner"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <LoadingSpinner size="xl" variant="eco" text="Chargement d'EcoBrain..." />
    </div>
  )
}
