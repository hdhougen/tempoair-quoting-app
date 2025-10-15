
import { SystemOption, AddOn, Promo } from './types'

export const systems: SystemOption[] = [
  // Standard tiers
  { id:'SYS-GAS-GOOD-3T', name:'14.3 SEER2 Single-Stage + 80% AFUE', tier:'Good', tierRank:1, tierGroup:'Standard',
    heatSource:'Gas', tonnage:3, seer2:14.3, compressor:'Single-Stage', soundDb:74, price:9200, financingMonths:18,
    loyaltyRewards:0, soldCount:312, reviewsCount:123, starRating:4.2, features:['10-Year Parts Warranty','Basic Thermostat','No Labor Coverage'],
    eligibleAddOnIds:['ADD-IAQ','ADD-DUCT','ADD-LABOR10'] },
  { id:'SYS-GAS-BETTER-3T', name:'16 SEER2 Two-Stage + 80% AFUE', tier:'Better', tierRank:2, tierGroup:'Standard',
    heatSource:'Gas', tonnage:3, seer2:16, compressor:'Two-Stage', soundDb:70, price:11800, financingMonths:25,
    loyaltyRewards:500, soldCount:572, reviewsCount:238, starRating:4.7, badge:'Most Popular', features:['10-Year Parts + 2-Year Labor','Smart Thermostat','Quiet Operation'],
    eligibleAddOnIds:['ADD-IAQ','ADD-DUCT','ADD-LABOR10','ADD-ZONE'] },
  { id:'SYS-GAS-BEST-3T', name:'18 SEER2 Inverter + 80% AFUE', tier:'Best', tierRank:3, tierGroup:'Standard',
    heatSource:'Gas', tonnage:3, seer2:18, compressor:'Variable-Speed (Inverter)', soundDb:56, price:14300, financingMonths:36,
    loyaltyRewards:1950, soldCount:427, reviewsCount:198, starRating:4.9, badge:'Best Seller', features:['10-Year Parts + 10-Year Labor','Smart Thermostat','Ultra-Quiet','Air Quality Ready'],
    eligibleAddOnIds:['ADD-IAQ','ADD-DUCT','ADD-ZONE'] },

  // Premium tiers (bundled)
  { id:'SYS-GAS-BEST-3T-ELITE', name:'18 SEER2 Inverter + 80% AFUE — Elite Comfort Bundle', tier:'Elite', tierRank:4, tierGroup:'Premium',
    heatSource:'Gas', tonnage:3, seer2:18, compressor:'Variable-Speed (Inverter)', soundDb:56, price:14300+1500, financingMonths:36,
    loyaltyRewards:1950, soldCount:280, reviewsCount:140, starRating:4.9, features:['Includes IAQ Package','Smart Thermostat','Ultra-Quiet','10-Year Parts + 10-Year Labor'],
    eligibleAddOnIds:['ADD-DUCT','ADD-ZONE','ADD-LABOR10'] },
  { id:'SYS-GAS-BEST-3T-SIGN', name:'18 SEER2 Inverter — Signature IAQ & Zoning', tier:'Signature', tierRank:5, tierGroup:'Premium',
    heatSource:'Gas', tonnage:3, seer2:18, compressor:'Variable-Speed (Inverter)', soundDb:56, price:14300+3500, financingMonths:36,
    loyaltyRewards:1950, soldCount:260, reviewsCount:135, starRating:5, badge:'Most Popular', features:['Includes IAQ + Zoning + Labor Coverage','Smart Thermostat','Ultra-Quiet'],
    eligibleAddOnIds:['ADD-DUCT'] },
  { id:'SYS-GAS-BEST-3T-ULT', name:'18 SEER2 Inverter — Ultimate Experience', tier:'Ultimate', tierRank:6, tierGroup:'Premium',
    heatSource:'Gas', tonnage:3, seer2:18, compressor:'Variable-Speed (Inverter)', soundDb:56, price:14300+5500, financingMonths:36,
    loyaltyRewards:1950, soldCount:200, reviewsCount:120, starRating:5, badge:'Best Seller', features:['Fully Bundled','Extended 10-Year Coverage','Ultra-Quiet'],
    eligibleAddOnIds:[] },
]

export const addOns: AddOn[] = [
  { id:'ADD-IAQ', name:'IAQ Package (AirScrubber or Active Gold)', price:895, description:'In-duct purifier + upgraded filter', popular:true, category:'IAQ' },
  { id:'ADD-DUCT', name:'Whole-Home Duct Cleaning', price:750, description:'Source removal + sanitizer for supply & return ducts', popular:true, category:'Duct' },
  { id:'ADD-ZONE', name:'Two-Zone Upgrade', price:1850, description:'Dampers + extra thermostat', popular:false, category:'Controls' },
  { id:'ADD-LABOR10', name:'10-Year Labor Coverage', price:1295, description:'Covers labor on warrantied parts for 10 years', popular:true, category:'Warranty' },
]

const today = new Date()
const addDays = (n:number)=> new Date(today.getTime()+n*24*60*60*1000).toISOString()

export const promos: Promo[] = [
  { id:'PROMO-FALL500', name:'Fall Savings', discountType:'Fixed', discountValue:500, expires:addDays(30), appliesToTiers:['Better','Best','Elite','Signature','Ultimate'], memberOnly:false, maxPerQuote:1 },
  { id:'PROMO-MEMBER200', name:'Member Loyalty Bonus', discountType:'Fixed', discountValue:200, expires:addDays(90), appliesToTiers:['Good','Better','Best','Elite','Signature','Ultimate'], memberOnly:true, maxPerQuote:1 },
  { id:'PROMO-PERCENT3', name:'Energy Saver', discountType:'Percent', discountValue:3, expires:addDays(45), appliesToTiers:['Best','Elite','Signature','Ultimate'], memberOnly:false, maxPerQuote:1 },
]
