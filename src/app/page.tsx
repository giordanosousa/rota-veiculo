import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { DigitalFlyerSection } from '@/components/sections/DigitalFlyerSection'
import { CatalogSection } from '@/components/sections/CatalogSection'
import { CartProvider } from '@/context/CartContext'
import { getAvailableVehicles } from '@/sanity/queries'

export default async function HomePage() {
  const vehicles = await getAvailableVehicles()

  return (
    <CartProvider>
      <div className="min-h-screen bg-zinc-50/70 text-slate-900 font-sans antialiased">
        <Header />
        <main>
          <DigitalFlyerSection />
          <CatalogSection initialVehicles={vehicles} />
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}