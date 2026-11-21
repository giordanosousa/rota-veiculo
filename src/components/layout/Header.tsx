'use client'

import Image from 'next/image'
import { BadgeCheck, ShoppingBag } from 'lucide-react'
import { STORE_CONFIG } from '@/config/store'
import { useCart } from '@/context/CartContext'
import logoImg from '@/assets/logo.png' // mantenha o caminho exato da sua logo

export function Header() {
  const { items, openDrawer } = useCart()
  const count = items.length

  return (
    <header className="bg-white border-b border-zinc-100 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden shrink-0 shadow-sm bg-white border border-zinc-100 flex items-center justify-center">
              <Image
                src={logoImg}
                alt={`Logo ${STORE_CONFIG.name}`}
                width={56}
                height={56}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                  {STORE_CONFIG.name}
                </h1>
                <BadgeCheck className="w-5 h-5 text-sky-500 fill-sky-500 stroke-white shrink-0" />
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {STORE_CONFIG.subtitle}
              </p>
            </div>
          </div>

          {/* Botão do Carrinho de Interesse */}
          <button
            onClick={openDrawer}
            aria-label="Abrir carrinho de interesse"
            className="relative w-11 h-11 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 flex items-center justify-center text-slate-800 transition shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-emerald-600 text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
                {count}
              </span>
            )}
          </button>
        </div>

        {/* Faixa de Benefícios */}
        <div className="mt-3.5 bg-zinc-50 border border-zinc-200/80 rounded-xl px-3 py-2 flex items-center gap-3 overflow-x-auto no-scrollbar text-xs whitespace-nowrap">
          <span className="inline-flex items-center gap-1.5 bg-emerald-100/80 text-emerald-700 font-semibold px-2.5 py-1 rounded-md shrink-0">
            <span className="w-2 h-2 rotate-45 bg-emerald-500 inline-block" />
            {STORE_CONFIG.benefitsHighlight}
          </span>
          <span className="text-zinc-300">•</span>
          <span className="text-slate-600 font-medium">
            {STORE_CONFIG.benefitsText}
          </span>
        </div>
      </div>
    </header>
  )
}