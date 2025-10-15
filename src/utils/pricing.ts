
import { AddOn, Promo, Quote, SystemOption } from '../types'

export function applicablePromos(all: Promo[], system: SystemOption, member: boolean): Promo[] {
  const now = new Date().toISOString()
  return all.filter(p => p.expires >= now && p.appliesToTiers.includes(system.tier) && (!p.memberOnly || member))
}

export function bestPromoSet(promos: Promo[], price: number): {promos: Promo[], discount: number} {
  // Simple rule: choose the single promo with highest discount impact + allow one member promo to stack
  const fixed = promos.filter(p=>p.discountType==='Fixed')
  const percent = promos.filter(p=>p.discountType==='Percent')

  let bestPercent: Promo | undefined = undefined
  let bestPercentValue = 0
  for (const p of percent) {
    const val = price * (p.discountValue/100)
    if (val > bestPercentValue) { bestPercentValue = val; bestPercent = p }
  }

  let bestFixed: Promo | undefined = undefined
  let bestFixedValue = 0
  for (const p of fixed) {
    if (p.discountValue > bestFixedValue) { bestFixedValue = p.discountValue; bestFixed = p }
  }

  // Prefer the combination of one fixed + one percent if available
  const chosen: Promo[] = []
  let discount = 0
  if (bestFixed) { chosen.push(bestFixed); discount += bestFixed.discountValue }
  if (bestPercent) { chosen.push(bestPercent); discount += price * (bestPercent.discountValue/100) }

  return { promos: chosen, discount }
}

export function buildQuote(system: SystemOption, addOns: AddOn[], promos: Promo[], member: boolean): Quote {
  const basePrice = system.price + addOns.reduce((s,a)=>s+a.price, 0)
  const eligible = applicablePromos(promos, system, member)
  const { promos: chosen, discount } = bestPromoSet(eligible, basePrice)
  const finalPrice = Math.max(0, basePrice - discount)
  const months = system.financingMonths || 12
  const monthly = Math.ceil(finalPrice / months)

  return {
    system, addOns, member, appliedPromos: chosen,
    basePrice, discountAmount: Math.round(discount),
    finalPrice: Math.round(finalPrice), monthlyPayment: monthly
  }
}
