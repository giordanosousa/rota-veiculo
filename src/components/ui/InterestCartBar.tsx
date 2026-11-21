'use client'

import { MessageCircle } from 'lucide-react'
import { buildDirectSupportUrl } from '@/config/store'

export function InterestCartBar() {
  return (
    <a
      href={buildDirectSupportUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com atendente pelo WhatsApp"
      title="Falar com atendente pelo WhatsApp"
      className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-600/30 flex items-center justify-center transition-transform duration-200 hover:scale-105 active:scale-95"
    >
      <MessageCircle className="w-7 h-7 fill-current" />
    </a>
  )
}