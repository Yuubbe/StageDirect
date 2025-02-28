"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, GraduationCap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ConnexionPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [message, setMessage] = useState("");

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
  
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
    });
  
    const data = await res.json();
  
    if (res.ok) {
      setMessage("✅ Connexion réussie !");
      localStorage.setItem("token", data.token); // Stocker le token
      window.location.href = "/"; // Rediriger vers l'accueil
    } else {
      setMessage(`❌ ${data.error}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="w-full max-w-sm mx-auto lg:w-96">
          <div className="text-center">
            <Link href="/" className="inline-block mb-6">
              <GraduationCap className="h-12 w-12 text-primary mx-auto" />
            </Link>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Connectez-vous à votre compte</h2>
          </div>

          <div className="mt-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Label htmlFor="email">Adresse e-mail</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">Mot de passe</Label>
                <div className="mt-1 relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    aria-label="Afficher ou masquer le mot de passe"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full">Se connecter</Button>
              {message && <p className="text-center mt-2 text-red-500">{message}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
