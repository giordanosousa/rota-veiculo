import { Vehicle } from '@/types/vehicle'

export const STORE_CONFIG = {
  name: 'Rota Veículos',
  initials: 'RV',
  subtitle: 'Seminovos periciados • Entrega em todo Brasil',
  whatsappNumber: '5585999999999',
  address: 'Av. Principal, 1500 • Centro',
  businessHours: 'Seg a Sex: 8h às 18h • Sáb: 8h às 13h',
  benefitsHighlight: '4% OFF no Pix',
  benefitsText: 'Financiamento até 60x • Aceitamos seu usado na troca',
  pixDiscountRate: 0.04,
  catalogGrid: {
    mobileCols: 2,
    desktopCols: 4,
    className: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5',
  },
} as const

export interface CampaignItem {
  id: string
  tag: string
  title: string
  description: string
  theme: 'dark' | 'emerald'
  filterAction: 'all' | 'featured' | 'car' | 'motorcycle'
}

export const STORE_CAMPAIGNS: CampaignItem[] = [
  {
    id: '1',
    tag: 'CAMPANHA SAZONAL',
    title: 'Feirão Taxa Zero + IPVA 2026 Grátis',
    description: 'Condições especiais para fechamento até sábado',
    theme: 'dark',
    filterAction: 'featured',
  },
  {
    id: '2',
    tag: 'OPORTUNIDADE',
    title: 'Linha Moto & Troca com Troco',
    description: 'Supervalorização na avaliação do seu seminovo',
    theme: 'emerald',
    filterAction: 'motorcycle',
  },
]

export interface CustomerLeadData {
  name: string
  contact: string
  notes?: string
}

export function buildVehicleProposalUrl(vehicle: Vehicle): string {
  const price = vehicle.promotionalPrice || vehicle.price
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price)

  const message = `Olá! Vi o anúncio no catálogo digital da *${STORE_CONFIG.name}* e gostaria de fazer uma proposta:\n\n*${vehicle.title}*\n• Ano: ${vehicle.yearFabrication}/${vehicle.yearModel}\n• KM: ${vehicle.mileage.toLocaleString('pt-BR')} km\n• Valor anunciado: ${formattedPrice}\n\nPodemos conversar sobre condições de pagamento ou troca?`

  return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export function buildDirectSupportUrl(): string {
  const message = `Olá! Vim pelo catálogo digital da *${STORE_CONFIG.name}* e gostaria de falar com um atendente.`
  return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export function buildCartConsultUrl(
  vehicles: Vehicle[],
  customer?: CustomerLeadData
): string {
  const listText = vehicles
    .map((v, idx) => {
      const price = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(v.promotionalPrice || v.price)
      return `${idx + 1}. *${v.title}* (${v.yearFabrication}/${v.yearModel}) - ${price}`
    })
    .join('\n')

  const totalValue = vehicles.reduce(
    (acc, item) => acc + (item.promotionalPrice || item.price),
    0
  )
  const formattedTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(totalValue)

  const customerBlock = customer?.name
    ? `\n\n*Dados para atendimento:*\n• Nome: ${customer.name}\n• Contato: ${customer.contact}${
        customer.notes?.trim() ? `\n• Dúvida/Observação: ${customer.notes.trim()}` : ''
      }`
    : ''

  const message = `Olá! Gostaria de continuar o atendimento sobre os seguintes itens do catálogo da *${STORE_CONFIG.name}*:\n\n${listText}\n\n*Total estimado:* ${formattedTotal}${customerBlock}`

  return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`
}