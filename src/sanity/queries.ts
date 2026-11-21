import { client } from './client'
import { Vehicle } from '@/types/vehicle'

export async function getAvailableVehicles(): Promise<Vehicle[]> {
  const query = `*[_type == "vehicle" && status != "sold"] | order(featured desc, _createdAt desc) {
    _id,
    vehicleType,
    title,
    "slug": slug.current,
    brand,
    model,
    yearFabrication,
    yearModel,
    mileage,
    fuel,
    color,
    transmission,
    doors,
    engineCc,
    features,
    description,
    coverImage,
    gallery,
    price,
    promotionalPrice,
    status,
    featured,
    acceptsTrade
  }`

  return client.fetch(query, {}, { next: { revalidate: 30 }})
}
