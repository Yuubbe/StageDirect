"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, Search } from "lucide-react"

interface User {
  id: number
  nom: string
  prenom: string
  email: string
  etablissement: string
  niveau: string
  createdAt: string
  role: string
}

interface UserTableProps {
  users: User[]
  onUpdateRole: (id: number, role: string) => void
}

export function UserTable({ users, onUpdateRole }: UserTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<keyof User>("nom")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (field: keyof User) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.etablissement.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              Trier par <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Champs</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleSort("nom")}>Nom</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort("prenom")}>Prénom</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort("email")}>Email</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort("etablissement")}>Établissement</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort("createdAt")}>Date de création</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Nom</TableHead>
                <TableHead className="w-[150px]">Prénom</TableHead>
                <TableHead className="min-w-[200px]">Email</TableHead>
                <TableHead className="hidden md:table-cell">Établissement</TableHead>
                <TableHead className="hidden md:table-cell">Niveau</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead className="hidden md:table-cell">Date de création</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.nom}</TableCell>
                  <TableCell>{user.prenom}</TableCell>
                  <TableCell className="truncate max-w-[200px]">{user.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{user.etablissement}</TableCell>
                  <TableCell className="hidden md:table-cell">{user.niveau}</TableCell>
                  <TableCell>
                    <RoleSelector currentRole={user.role} onRoleChange={(role) => onUpdateRole(user.id, role)} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{formatDate(user.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        {filteredUsers.length} utilisateur{filteredUsers.length !== 1 ? "s" : ""} trouvé
        {filteredUsers.length !== 1 ? "s" : ""}
      </div>
    </div>
  )
}

function RoleSelector({
  currentRole,
  onRoleChange,
}: {
  currentRole: string
  onRoleChange: (role: string) => void
}) {
  return (
    <Select defaultValue={currentRole} onValueChange={onRoleChange}>
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Sélectionner un rôle" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="USER">Utilisateur</SelectItem>
        <SelectItem value="PROFESSEUR">Professeur</SelectItem>
        <SelectItem value="ADMIN">Administrateur</SelectItem>
        <SelectItem value="SUPERADMIN">Super Administrateur</SelectItem>
      </SelectContent>
    </Select>
  )
}

