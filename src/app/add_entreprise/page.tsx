"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

const entrepriseSchema = z.object({
  nom_entreprise: z.string().min(1, "Le nom est requis").max(50),
  rue_entreprise: z.string().max(60).optional(),
  cp_entreprise: z.string().max(10).optional(),
  ville_entreprise: z.string().min(1, "La ville est requise").max(30),
  pays_entreprise: z.string().max(30).default("France"),
  service_entreprise: z.string().max(30).optional(),
  tel_entreprise: z.string().max(20).optional(),
  fax_entreprise: z.string().max(20).optional(),
  email_entreprise: z.string().email("Email invalide").optional(),
  taille_entreprise: z.string().max(7).optional(),
  fk_id_activite: z.number().int(),
  fk_id_contact: z.number().int().optional(),
  valider: z.boolean().default(false),
});

type EntrepriseFormData = z.infer<typeof entrepriseSchema>;

export default function FormEntreprise() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EntrepriseFormData>({
    resolver: zodResolver(entrepriseSchema),
  });

  const [message, setMessage] = useState("");

  const onSubmit = async (data: EntrepriseFormData) => {
    const response = await fetch("/api/entreprise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      setMessage("Entreprise ajoutée avec succès !");
    } else {
      setMessage("Erreur lors de l'ajout de l'entreprise.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 border rounded">
      <input {...register("nom_entreprise")} placeholder="Nom de l'entreprise" className="border p-2 w-full" />
      {errors.nom_entreprise && <p className="text-red-500">{errors.nom_entreprise.message}</p>}
      
      <input {...register("ville_entreprise")} placeholder="Ville" className="border p-2 w-full" />
      {errors.ville_entreprise && <p className="text-red-500">{errors.ville_entreprise.message}</p>}
      
      <input {...register("pays_entreprise")} placeholder="Pays" className="border p-2 w-full" />
      
      <input {...register("email_entreprise")} placeholder="Email" className="border p-2 w-full" />
      {errors.email_entreprise && <p className="text-red-500">{errors.email_entreprise.message}</p>}
      
      <input type="number" {...register("fk_id_activite")} placeholder="ID Activité" className="border p-2 w-full" />
      {errors.fk_id_activite && <p className="text-red-500">{errors.fk_id_activite.message}</p>}
      
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Ajouter</button>
      {message && <p className="text-green-500">{message}</p>}
    </form>
  );
}
