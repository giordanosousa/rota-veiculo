'use client'

import Image from 'next/image'
import { Images, Plus, Check } from 'lucide-react'
import { Vehicle } from '@/types/vehicle'
import { urlFor } from '@/sanity/image'

interface VehicleCardProps {
  vehicle: Vehicle
  isSelected: boolean
  onToggleSelect: (vehicle: Vehicle) => void
  onOpenDetails: (vehicle: Vehicle) => void
}

export function VehicleCard({
  vehicle,
  isSelected,
  onToggleSelect,
  onOpenDetails,
}: VehicleCardProps) {
  const totalPhotos = 1 + (vehicle.gallery?.length || 0)
  const displayPrice = vehicle.promotionalPrice || vehicle.price

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(displayPrice)

  return (
    <article
      onClick={() => onOpenDetails(vehicle)}
      className={`group bg-white rounded-2xl border transition overflow-hidden flex flex-col justify-between cursor-pointer ${
        isSelected
          ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
          : 'border-zinc-200/80 shadow-xs hover:shadow-md'
      }`}
    >
      <div>
        {/* Foto + Apenas o essencial */}
        <div className="relative h-32 sm:h-44 w-full bg-zinc-100 overflow-hidden">
          {vehicle.coverImage && (
            <Image
              src={urlFor(vehicle.coverImage).width(800).height(500).url()}
              alt={vehicle.title}
              width={800}
              height={500}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}

          {vehicle.featured && (
            <span className="absolute top-2 left-2 bg-rose-500 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs">
              Destaque
            </span>
          )}

          {totalPhotos > 1 && (
            <div className="absolute bottom-2 right-2 bg-slate-900/75 backdrop-blur-xs text-white text-[10px] font-medium px-1.5 py-0.5 rounded-md flex items-center gap-1">
              <Images className="w-3 h-3" />
              <span>{totalPhotos}</span>
            </div>
          )}
        </div>

        {/* Informações Essenciais */}
        <div className="p-2.5 sm:p-4">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 leading-snug min-h-9 sm:min-h-10">
            {vehicle.title}
          </h3>

          <p className="text-[11px] sm:text-xs text-slate-500 mt-1 truncate">
            {vehicle.yearModel} •{' '}
            {vehicle.mileage === 0
              ? '0 km'
              : `${vehicle.mileage.toLocaleString('pt-BR')} km`}
          </p>
        </div>
      </div>

      {/* Rodapé Limpo: Preço + Botão Compacto */}
      <div className="px-2.5 sm:px-4 pb-2.5 sm:pb-4 pt-2 border-t border-zinc-100 flex items-center justify-between gap-1.5">
        <div className="min-w-0">
          {vehicle.promotionalPrice && (
            <span className="block text-[10px] text-zinc-400 line-through truncate">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                maximumFractionDigits: 0,
              }).format(vehicle.price)}
            </span>
          )}
          <span className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight block truncate">
            {formattedPrice}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleSelect(vehicle)
          }}
          aria-label={isSelected ? 'Remover da lista' : 'Adicionar à lista'}
          title={isSelected ? 'Selecionado' : 'Adicionar à lista de interesse'}
          className={`w-8 h-8 sm:w-auto sm:h-auto sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 shrink-0 transition cursor-pointer ${
            isSelected
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-slate-900 text-white hover:bg-slate-800'
          }`}
        >
          {isSelected ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Na lista</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lista</span>
            </>
          )}
        </button>
      </div>
    </article>
  )
}