'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Vehicle } from '@/types/vehicle'

interface CartContextType {
  items: Vehicle[]
  isDrawerOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
  toggleItem: (vehicle: Vehicle) => void
  removeItem: (vehicleId: string) => void
  isSelected: (vehicleId: string) => boolean
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Vehicle[]>([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const toggleItem = (vehicle: Vehicle) => {
    setItems((prev) => {
      const exists = prev.some((item) => item._id === vehicle._id)
      return exists
        ? prev.filter((item) => item._id !== vehicle._id)
        : [...prev, vehicle]
    })
  }

  const removeItem = (vehicleId: string) => {
    setItems((prev) => prev.filter((item) => item._id !== vehicleId))
  }

  const isSelected = (vehicleId: string) =>
    items.some((item) => item._id === vehicleId)

  const clearCart = () => setItems([])

  return (
    <CartContext.Provider
      value={{
        items,
        isDrawerOpen,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
        toggleItem,
        removeItem,
        isSelected,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider')
  }
  return context
}