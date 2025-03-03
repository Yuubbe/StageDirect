"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from 'lucide-react'

interface Etudiant {
  id: number
  email: string
  nom: string
  prenom: string
}

export function UserMenu() {
  const [etudiant, setEtudiant] = useState<Etudiant | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchEtudiant = async () => {
      try {
        const response = await fetch("/api/etudiants")
        if (response.ok) {
          const data = await response.json()
          setEtudiant(data)
        } else {
          console.error("Failed to fetch etudiant data")
        }
      } catch (error) {
        console.error("Error fetching etudiant data:", error)
      }
    }

    fetchEtudiant()
  }, [])

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", { method: "POST" })
      if (response.ok) {
        setEtudiant(null)
        router.push("/")
      } else {
        console.error("Logout failed")
      }
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  if (!etudiant) {
    return (
      <Button asChild variant="ghost">
        <Link href="/connexion">Connexion</Link>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={`https://avatars.dicebear.com/api/initials/${etudiant.prenom[0]}${etudiant.nom[0]}.svg`} alt={`${etudiant.prenom} ${etudiant.nom}`} />
            <AvatarFallback>{etudiant.prenom[0]}{etudiant.nom[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{etudiant.prenom} {etudiant.nom}</p>
            <p className="text-xs leading-none text-muted-foreground">{etudiant.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profil">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
