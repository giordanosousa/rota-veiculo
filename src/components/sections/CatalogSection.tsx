'use client'

import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { Vehicle } from '@/types/vehicle'
import { STORE_CONFIG } from '@/config/store'
import { useCart } from '@/context/CartContext'
import { VehicleCard } from '@/components/ui/VehicleCard'
import { VehicleDetailsModal } from '@/components/ui/VehicleDetailsModal'
import { InterestCartBar } from '@/components/ui/InterestCartBar'
import { CartDrawer } from '@/components/ui/CartDrawer'

interface CatalogSectionProps {
  initialVehicles: Vehicle[]
}

type FilterTab = 'all' | 'featured' | 'car' | 'motorcycle'

export function CatalogSection({ initialVehicles }: CatalogSectionProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<FilterTab>('all')
  const [activeVehicle, setActiveVehicle] = useState<Vehicle | null>(null)

  const { toggleItem, isSelected } = useCart()

  const filteredVehicles = useMemo(() => {
    return initialVehicles.filter((vehicle) => {
      if (activeTab === 'featured' && !vehicle.featured) return false
      if (activeTab === 'car' && vehicle.vehicleType !== 'car') return false
      if (activeTab === 'motorcycle' && vehicle.vehicleType !== 'motorcycle') return false

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase()
        const matchTitle = vehicle.title.toLowerCase().includes(q)
        const matchBrand = vehicle.brand.toLowerCase().includes(q)
        const matchModel = vehicle.model.toLowerCase().includes(q)
        return matchTitle || matchBrand || matchModel
      }

      return true
    })
  }, [initialVehicles, activeTab, searchQuery])

  return (
    <>
      {/* Barra de Busca e Filtros */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3.5">
          <div className="relative flex-1 max-w-xl">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar modelo, marca ou oferta..."
              className="w-full bg-white border border-zinc-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            {[
              { id: 'all', label: 'Todos' },
              { id: 'featured', label: '🔥 Destaques' },
              { id: 'car', label: 'Carros' },
              { id: 'motorcycle', label: 'Motos' },
            ].map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as FilterTab)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-zinc-200 hover:bg-zinc-50'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Grid do Catálogo */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            Catálogo Completo
          </h2>
          <span className="text-xs sm:text-sm text-slate-400 font-medium">
            {filteredVehicles.length} {filteredVehicles.length === 1 ? 'item' : 'itens'}
          </span>
        </div>

        {filteredVehicles.length === 0 ? (
          <div className="bg-white border border-zinc-200 rounded-2xl p-10 text-center">
            <p className="text-slate-600 font-medium">
              Nenhum veículo encontrado com os filtros atuais.
            </p>
            <button
              onClick={() => {
                setActiveTab('all')
                setSearchQuery('')
              }}
              className="mt-3 text-sm font-semibold text-emerald-600 hover:underline cursor-pointer"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className={STORE_CONFIG.catalogGrid.className}>
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle._id}
                vehicle={vehicle}
                isSelected={isSelected(vehicle._id)}
                onToggleSelect={toggleItem}
                onOpenDetails={(item) => setActiveVehicle(item)}
              />
            ))}
          </div>
        )}
      </section>

      <VehicleDetailsModal
        key={activeVehicle?._id ?? 'closed'}
        vehicle={activeVehicle}
        isOpen={activeVehicle !== null}
        onClose={() => setActiveVehicle(null)}
        isSelectedInCart={activeVehicle ? isSelected(activeVehicle._id) : false}
        onToggleCart={toggleItem}
      />

      <InterestCartBar />
      <CartDrawer />
    </>
  )
}