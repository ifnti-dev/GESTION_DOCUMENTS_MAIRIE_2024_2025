"use client"

import DocumentsArchivesPage from "@/components/documents/archives"
import { getCurrentUser } from "@/services/userService"
import  {Role}  from "@/types/LoginResponse" // adapte le chemin selon ton projet
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function ArchivedDocumentsPageWrapper() {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)

   useEffect(() => {
    // console.log("useEffect lancé") 
    async function checkRole() {
      try {
        const user = await getCurrentUser()
        // console.log("Role utilisateur :", user.role) // Ajoute ce log
        if (user.role !== Role.ADMIN) {
          router.replace("/403")
        } else {
          setAuthorized(true)
        }
      } catch {
        router.replace("/403")
      } finally {
        setLoading(false)
      }
    }
    checkRole()
  }, [router])

  if (!authorized) return null

  if (!authorized) return null

  return (
    <div>
      <DocumentsArchivesPage />
    </div>
  )
}