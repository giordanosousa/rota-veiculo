import type { SanityImageSource } from '@/sanity/image'

export interface Vehicle {
  _id: string
  vehicleType: 'car' | 'motorcycle'
  title: string
  slug: string
  brand: string
  model: string
  yearFabrication: number
  yearModel: number
  mileage: number
  fuel: string
  color: string
  transmission?: string
  doors?: number
  engineCc?: number
  features?: string[]
  description?: string
  coverImage: SanityImageSource
  gallery?: SanityImageSource[]
  price: number
  promotionalPrice?: number
  status: 'available' | 'reserved' | 'sold'
  featured: boolean
  acceptsTrade: boolean
}