'use client'

import { useState, useEffect, FormEvent } from 'react'
import Image from 'next/image'
import { X, Trash2, ShoppingBag, MessageCircle, User, Phone, MessageSquare } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { urlFor } from '@/sanity/image'
import { buildCartConsultUrl } from '@/config/store'

export function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, removeItem } = useCart()
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isDrawerOpen])

  if (!isDrawerOpen) return null

  const totalValue = items.reduce(
    (acc, item) => acc + (item.promotionalPrice || item.price),
    0
  )

  const formatBRL = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (items.length === 0) return

    const url = buildCartConsultUrl(items, {
      name: name.trim(),
      contact: contact.trim(),
      notes: notes.trim(),
    })

    window.open(url, '_blank')
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs"
      onClick={closeDrawer}
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden"
      >
        {/* Cabeçalho do Drawer */}
        <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-tight">
                Carrinho de Interesse
              </h2>
              <p className="text-xs text-slate-500">
                {items.length} {items.length === 1 ? 'item selecionado' : 'itens selecionados'}
              </p>
            </div>
          </div>

          <button
            onClick={closeDrawer}
            aria-label="Fechar carrinho"
            className="w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 text-slate-700 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo Rolável: Lista de Produtos + Formulário */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="w-12 h-12 rounded-2xl bg-zinc-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-800">
                Seu carrinho de interesse está vazio
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Adicione veículos no catálogo para enviar uma consulta ou tirar dúvidas com nossa equipe.
              </p>
            </div>
          ) : (
            <>
              {/* Itens Adicionados */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Itens Selecionados
                </h3>

                {items.map((item) => {
                  const price = item.promotionalPrice || item.price
                  return (
                    <div
                      key={item._id}
                      className="flex items-center gap-3 p-2.5 rounded-2xl border border-zinc-200/80 bg-zinc-50/60"
                    >
                      <div className="w-16 h-14 rounded-xl bg-zinc-200 overflow-hidden shrink-0">
                        {item.coverImage && (
                          <Image
                            src={urlFor(item.coverImage).width(200).height(160).url()}
                            alt={item.title}
                            width={200}
                            height={160}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {item.yearFabrication}/{item.yearModel} •{' '}
                          {item.mileage.toLocaleString('pt-BR')} km
                        </p>
                        <p className="text-xs font-extrabold text-emerald-700 mt-1">
                          {formatBRL(price)}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item._id)}
                        aria-label={`Remover ${item.title}`}
                        className="w-8 h-8 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition shrink-0 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )
                })}
              </div>

              {/* Formulário de Identificação e Dúvida */}
              <form id="cart-whatsapp-form" onSubmit={handleSubmit} className="space-y-3.5 pt-2 border-t border-zinc-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Seus Dados para Atendimento
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Seu Nome *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: João Silva"
                      className="w-full bg-white border border-zinc-200 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Seu Contato (WhatsApp ou Telefone) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="Ex: (85) 99999-9999"
                      className="w-full bg-white border border-zinc-200 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Dúvida ou Observação (Opcional)
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Ex: Gostaria de simular financiamento ou avaliar meu veículo na troca..."
                      className="w-full bg-white border border-zinc-200 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 resize-none"
                    />
                  </div>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Rodapé Fixo do Drawer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-zinc-100 bg-zinc-50/80 space-y-3 shrink-0">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 font-medium">Total estimado:</span>
              <span className="text-lg font-extrabold text-slate-900">
                {formatBRL(totalValue)}
              </span>
            </div>

            <button
              type="submit"
              form="cart-whatsapp-form"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current shrink-0" />
              <span>Continuar atendimento pelo WhatsApp com atendente</span>
            </button>
          </div>
        )}
      </aside>
    </div>
  )
}