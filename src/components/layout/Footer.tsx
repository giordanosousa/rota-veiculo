import Image from 'next/image'
import { MapPin, Clock, ShieldCheck } from 'lucide-react'
import { STORE_CONFIG } from '@/config/store'
import logoImg from '@/assets/logo.png'

export function Footer() {
  return (
    <footer className="bg-white border-t border-zinc-200/80 mt-12 pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5">
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
              <span className="font-bold text-slate-900">{STORE_CONFIG.name}</span>
            </div>
            <p className="text-xs text-slate-500 mt-2 max-w-md">
              {STORE_CONFIG.subtitle}. Todos os veículos passam por vistoria cautelar e procedência garantida.
            </p>
          </div>

          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{STORE_CONFIG.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{STORE_CONFIG.businessHours}</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-700 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Atendimento oficial via WhatsApp</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-zinc-100 text-center sm:text-left text-[11px] text-slate-400">
          © {new Date().getFullYear()} {STORE_CONFIG.name}. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}