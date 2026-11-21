'use client'

import { ArrowRight } from 'lucide-react'
import { STORE_CAMPAIGNS, CampaignItem } from '@/config/store'

interface DigitalFlyerSectionProps {
  onSelectCampaign?: (filter: CampaignItem['filterAction']) => void
}

export function DigitalFlyerSection({ onSelectCampaign }: DigitalFlyerSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-200 border border-rose-400" />
          <h2 className="text-xs font-bold tracking-wider uppercase text-slate-500">
            ENCARTE DIGITAL ATIVO
          </h2>
        </div>
        <span className="text-xs text-slate-400 font-medium">
          {STORE_CAMPAIGNS.length} campanha(s)
        </span>
      </div>

      <div className="flex md:grid md:grid-cols-2 gap-3.5 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-1">
        {STORE_CAMPAIGNS.map((campaign) => {
          const isDark = campaign.theme === 'dark'
          return (
            <div
              key={campaign.id}
              onClick={() => onSelectCampaign?.(campaign.filterAction)}
              className={`min-w-[85%] sm:min-w-[60%] md:min-w-0 snap-start rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition hover:opacity-95 ${
                isDark
                  ? 'bg-linear-to-br from-slate-900 via-slate-900 to-slate-800 text-white'
                  : 'bg-linear-to-br from-emerald-950 via-emerald-900 to-teal-900 text-white'
              }`}
            >
              <div>
                <span className="inline-block text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-white/10 text-zinc-200">
                  {campaign.tag}
                </span>
                <h3 className="text-lg sm:text-xl font-bold mt-3 leading-snug">
                  {campaign.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 mt-1">
                  {campaign.description}
                </p>
              </div>

              <div className="mt-5 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-400">
                <span>Explorar ofertas</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}