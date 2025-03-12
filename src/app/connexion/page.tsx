"use client"

import React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Cookie from "js-cookie" // Import de js-cookie pour gérer les cookies

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")
    setIsSuccess(false)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (res.ok) {
        setIsSuccess(true)
        setMessage("Connexion réussie !")
        setUserEmail(data.email)

        // Stocker l'email de l'utilisateur dans le cookie
        Cookie.set("userEmail", data.email, { expires: 7 }) // Le cookie expire après 7 jours

        setTimeout(() => {
          router.push("/");
        }, 2000)
      } else {
        setIsSuccess(false)
        setMessage(data.message || "Identifiants incorrects.")
        setUserEmail(null)
      }
    } catch (error) {
      console.error(error)
      setIsSuccess(false)
      setMessage("Une erreur est survenue lors de la connexion.")
      setUserEmail(null)
    } finally {
      setIsLoading(false)
    }
  }

  // Vérifier la présence du cookie au chargement de la page
  React.useEffect(() => {
    const storedEmail = Cookie.get("userEmail")
    if (storedEmail) {
      setUserEmail(storedEmail)
    }
  }, [])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Connexion</CardTitle>
          <CardDescription className="text-center">Entrez vos identifiants pour accéder à votre compte</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="exemple@domaine.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mot de passe</Label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Mot de passe oublié?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="w-full"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Chargement...
                </>
              ) : (
                "Se connecter"
              )}
            </Button>
          </form>
        </CardContent>

        {message && (
          <CardFooter>
            <Alert variant={isSuccess ? "default" : "destructive"} className="w-full">
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          </CardFooter>
        )}

        {userEmail && (
          <CardFooter className="flex justify-center border-t pt-4">
            <p className="text-sm text-muted-foreground">
              Vous êtes connecté en tant que: <span className="font-medium text-foreground">{userEmail}</span>
            </p>
          </CardFooter>
        )}

        <CardFooter className="flex justify-center border-t pt-4">
          <p className="text-sm text-muted-foreground">
            Vous n&apos;avez pas de compte?{" "}
            <a href="/inscription" className="text-primary hover:underline">
              Créer un compte
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
