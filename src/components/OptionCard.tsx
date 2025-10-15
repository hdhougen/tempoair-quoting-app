
import React from 'react'
import { AddOn, SystemOption } from '../types'

type Props = {
  system: SystemOption
  member: boolean
  onSelect: (system: SystemOption) => void
  onCompare: (system: SystemOption) => void
  emphasis?: boolean
  promoText?: string
  monthlyText?: string
  totalText?: string
}

export default function OptionCard({ system, member, onSelect, onCompare, emphasis, promoText, monthlyText, totalText }: Props){
  return (
    <div className={['card', emphasis?'emphasis':'', (system.tier==='Better'||system.tier==='Signature')?'highlight':''].join(' ')}>
      {system.badge && <div className={'badge ' + (system.badge.includes('Best')?'gold':'')}>{system.badge}</div>}
      <div className="name">{system.name}</div>
      <div className="stars">{"★".repeat(Math.round(system.starRating))} <span className="muted">({system.reviewsCount} reviews)</span></div>
      <div className="price">{monthlyText ?? '--'}</div>
      <div className="muted">{totalText ?? ''}</div>
      {promoText && <div className="promo">{promoText}</div>}
      <ul className="list">
        {system.features.slice(0,5).map(f=><li key={f}>{f}</li>)}
      </ul>
      <div className="muted">{system.soldCount} homeowners chose this last year</div>
      <div className="footer">
        <button className="btn" onClick={()=>onSelect(system)}>Select This System</button>
        <button className="btn secondary" onClick={()=>onCompare(system)}>Compare Details</button>
      </div>
    </div>
  )
}
