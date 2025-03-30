
import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Documentation - StageDirect",
  description: "Documentation utilisateur et technique de la plateforme StageDirect",
}

export default function DocumentationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-background">{children}</div>
}

