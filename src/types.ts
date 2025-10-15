
export type Tier = 'Good'|'Better'|'Best'|'Elite'|'Signature'|'Ultimate'
export type TierGroup = 'Standard'|'Premium'

export interface SystemOption {
  id: string
  name: string
  tier: Tier
  tierRank: number
  tierGroup: TierGroup
  heatSource: 'Gas'|'Heat Pump'
  tonnage: number
  seer2: number
  hspf2?: number
  compressor: string
  soundDb: number
  price: number
  financingMonths: number
  loyaltyRewards: number
  soldCount: number
  reviewsCount: number
  starRating: number
  badge?: 'Most Popular'|'Best Seller'
  features: string[]
  eligibleAddOnIds: string[]
}

export interface AddOn {
  id: string
  name: string
  price: number
  description: string
  popular: boolean
  category: string
}

export type DiscountType = 'Fixed'|'Percent'

export interface Promo {
  id: string
  name: string
  discountType: DiscountType
  discountValue: number
  expires: string // ISO date
  appliesToTiers: Tier[]
  memberOnly: boolean
  maxPerQuote: number
}

export interface Quote {
  system: SystemOption
  addOns: AddOn[]
  member: boolean
  appliedPromos: Promo[]
  basePrice: number
  discountAmount: number
  finalPrice: number
  monthlyPayment: number
}
