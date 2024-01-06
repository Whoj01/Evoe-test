'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function notFound() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-start w-full h-full gap-1 max-w-[300px]">
      <h1 className="text-3xl font-roboto font-bold text-title">Ops, esta página não foi encontrada</h1>
      <p className="font-nunitoSans text-black-900 text-lg">Parece que você se perdeu... Tente voltar para a página anterior ou acessar a home.</p>

      <div className="flex items-center justify-start gap-5">
        <Button className="flex items-center justify-center gap-3 font-incosolata font-regular text-xl text-white border border-black-900 bg-black-900 hover:bg-white hover:text-black-900 transition-all" onClick={() => router.back()}>
          Voltar
        </Button>

        <Button className="flex items-center justify-center gap-3 font-incosolata font-regular text-xl text-white border border-red-900 bg-red-900 hover:bg-white hover:text-black-900 transition-all" onClick={() => router.push('/')}>
          Ir para a home
        </Button>
      </div>
    </div>
  )
}