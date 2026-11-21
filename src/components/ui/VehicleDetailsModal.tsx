'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Gauge,
  Fuel,
  Palette,
  Cog,
  DoorOpen,
  Zap,
  CheckCircle2,
  Repeat,
  MessageCircle,
  Plus,
  Check,
} from 'lucide-react'
import { Vehicle } from '@/types/vehicle'
import { urlFor } from '@/sanity/image'
import { STORE_CONFIG, buildVehicleProposalUrl } from '@/config/store'

interface VehicleDetailsModalProps {
  vehicle: Vehicle | null
  isOpen: boolean
  onClose: () => void
  isSelectedInCart: boolean
  onToggleCart: (vehicle: Vehicle) => void
}

const FUEL_LABELS: Record<string, string> = {
  flex: 'Flex',
  gasoline: 'Gasolina',
  diesel: 'Diesel',
  electric: 'Elétrico',
  hybrid: 'Híbrido',
}

const TRANSMISSION_LABELS: Record<string, string> = {
  automatic: 'Automático',
  manual: 'Manual',
  cvt: 'CVT',
  automated: 'Automatizado',
}

export function VehicleDetailsModal({
  vehicle,
  isOpen,
  onClose,
  isSelectedInCart,
  onToggleCart,
}: VehicleDetailsModalProps) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen || !vehicle) return null

  const allPhotos = [
    ...(vehicle.coverImage ? [vehicle.coverImage] : []),
    ...(vehicle.gallery || []),
  ]

  const displayPrice = vehicle.promotionalPrice || vehicle.price
  const pixPrice = displayPrice * (1 - STORE_CONFIG.pixDiscountRate)

  const formatBRL = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)

  const handlePrevPhoto = () => {
    setActivePhotoIndex((prev) => (prev === 0 ? allPhotos.length - 1 : prev - 1))
  }

  const handleNextPhoto = () => {
    setActivePhotoIndex((prev) => (prev === allPhotos.length - 1 ? 0 : prev + 1))
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/60 backdrop-blur-xs p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full sm:max-w-3xl max-h-[92vh] sm:max-h-[88vh] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
      >
        <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
              {vehicle.brand}
            </span>
            {vehicle.acceptsTrade && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700">
                <Repeat className="w-3 h-3" />
                Aceita Troca
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar detalhes"
            className="w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 text-slate-700 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          <div>
            <div className="relative h-64 sm:h-80 w-full rounded-2xl bg-zinc-100 overflow-hidden">
              {allPhotos[activePhotoIndex] && (
                <Image
                  src={urlFor(allPhotos[activePhotoIndex]).width(1200).height(750).url()}
                  alt={`${vehicle.title} - Foto ${activePhotoIndex + 1}`}
                  width={1200}
                  height={750}
                  className="w-full h-full object-cover"
                />
              )}

              {allPhotos.length > 1 && (
                <>
                  <button
                    onClick={handlePrevPhoto}
                    aria-label="Foto anterior"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-900 shadow-md flex items-center justify-center transition cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextPhoto}
                    aria-label="Próxima foto"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-900 shadow-md flex items-center justify-center transition cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <span className="absolute bottom-3 right-3 bg-slate-900/80 text-white text-xs font-medium px-3 py-1 rounded-full">
                    {activePhotoIndex + 1} / {allPhotos.length}
                  </span>
                </>
              )}
            </div>

            {allPhotos.length > 1 && (
              <div className="flex items-center gap-2.5 mt-3 overflow-x-auto no-scrollbar pb-1">
                {allPhotos.map((photo, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhotoIndex(idx)}
                    className={`w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition cursor-pointer ${
                      activePhotoIndex === idx
                        ? 'border-slate-900 opacity-100'
                        : 'border-transparent opacity-60 hover:opacity-90'
                    }`}
                  >
                    <Image
                      src={urlFor(photo).width(240).height(160).url()}
                      alt={`Miniatura ${idx + 1}`}
                      width={240}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-5 border-b border-zinc-100">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {vehicle.title}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Modelo {vehicle.model} • {vehicle.color}
              </p>
            </div>

            <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-3.5 sm:text-right shrink-0">
              {vehicle.promotionalPrice && (
                <span className="block text-xs text-zinc-400 line-through">
                  De {formatBRL(vehicle.price)}
                </span>
              )}
              <span className="text-2xl font-extrabold text-slate-900 block">
                {formatBRL(displayPrice)}
              </span>
              <span className="inline-block mt-1 text-xs font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                {formatBRL(pixPrice)} à vista no Pix ({STORE_CONFIG.benefitsHighlight})
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Ficha Técnica
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-zinc-50 rounded-xl p-3 flex items-center gap-3">
                <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
                <div>
                  <span className="block text-[11px] text-slate-400">Ano</span>
                  <strong className="text-xs sm:text-sm text-slate-900">
                    {vehicle.yearFabrication}/{vehicle.yearModel}
                  </strong>
                </div>
              </div>

              <div className="bg-zinc-50 rounded-xl p-3 flex items-center gap-3">
                <Gauge className="w-4 h-4 text-slate-500 shrink-0" />
                <div>
                  <span className="block text-[11px] text-slate-400">Quilometragem</span>
                  <strong className="text-xs sm:text-sm text-slate-900">
                    {vehicle.mileage.toLocaleString('pt-BR')} km
                  </strong>
                </div>
              </div>

              <div className="bg-zinc-50 rounded-xl p-3 flex items-center gap-3">
                <Fuel className="w-4 h-4 text-slate-500 shrink-0" />
                <div>
                  <span className="block text-[11px] text-slate-400">Combustível</span>
                  <strong className="text-xs sm:text-sm text-slate-900">
                    {FUEL_LABELS[vehicle.fuel] || vehicle.fuel}
                  </strong>
                </div>
              </div>

              <div className="bg-zinc-50 rounded-xl p-3 flex items-center gap-3">
                <Palette className="w-4 h-4 text-slate-500 shrink-0" />
                <div>
                  <span className="block text-[11px] text-slate-400">Cor</span>
                  <strong className="text-xs sm:text-sm text-slate-900">{vehicle.color}</strong>
                </div>
              </div>

              {vehicle.vehicleType === 'car' ? (
                <>
                  <div className="bg-zinc-50 rounded-xl p-3 flex items-center gap-3">
                    <Cog className="w-4 h-4 text-slate-500 shrink-0" />
                    <div>
                      <span className="block text-[11px] text-slate-400">Câmbio</span>
                      <strong className="text-xs sm:text-sm text-slate-900">
                        {TRANSMISSION_LABELS[vehicle.transmission || ''] ||
                          vehicle.transmission ||
                          'N/A'}
                      </strong>
                    </div>
                  </div>

                  {vehicle.doors && (
                    <div className="bg-zinc-50 rounded-xl p-3 flex items-center gap-3">
                      <DoorOpen className="w-4 h-4 text-slate-500 shrink-0" />
                      <div>
                        <span className="block text-[11px] text-slate-400">Portas</span>
                        <strong className="text-xs sm:text-sm text-slate-900">
                          {vehicle.doors} portas
                        </strong>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                vehicle.engineCc && (
                  <div className="bg-zinc-50 rounded-xl p-3 flex items-center gap-3">
                    <Zap className="w-4 h-4 text-slate-500 shrink-0" />
                    <div>
                      <span className="block text-[11px] text-slate-400">Cilindradas</span>
                      <strong className="text-xs sm:text-sm text-slate-900">
                        {vehicle.engineCc} cc
                      </strong>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {vehicle.features && vehicle.features.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Opcionais e Destaques
              </h3>
              <div className="flex flex-wrap gap-2">
                {vehicle.features.map((feature, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 bg-zinc-100 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-lg"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}

          {vehicle.description && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Observações do Vendedor
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
                {vehicle.description}
              </p>
            </div>
          )}
        </div>

        <div className="p-4 sm:px-6 border-t border-zinc-100 bg-white flex items-center gap-3 shrink-0">
          <button
            onClick={() => onToggleCart(vehicle)}
            className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold border transition flex items-center justify-center gap-1.5 cursor-pointer shrink-0 ${
              isSelectedInCart
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border-zinc-200 bg-white hover:bg-zinc-50 text-slate-700'
            }`}
          >
            {isSelectedInCart ? (
              <>
                <Check className="w-4 h-4" />
                <span>Na lista</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Salvar na lista</span>
              </>
            )}
          </button>

          <button
            onClick={() => window.open(buildVehicleProposalUrl(vehicle), '_blank')}
            className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm py-3 px-5 rounded-xl shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Enviar Proposta no WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  )
}