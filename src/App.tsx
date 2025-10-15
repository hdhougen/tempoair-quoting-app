
import React, { useMemo, useRef, useState } from 'react'
import { systems, addOns, promos } from './data'
import { AddOn, SystemOption } from './types'
import OptionCard from './components/OptionCard'
import { buildQuote } from './utils/pricing'
import { exportElementToPDF } from './utils/pdf'

export default function App(){
  const [tonnage, setTonnage] = useState(3.0)
  const [heatSource, setHeatSource] = useState<'Gas'|'Heat Pump'>('Gas')
  const [orientation, setOrientation] = useState<'Upflow'|'Downflow'|'Horizontal'>('Upflow') // placeholder for future filtering
  const [member, setMember] = useState(true)
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([])
  const [showOptions, setShowOptions] = useState(false)
  const [selectedSystem, setSelectedSystem] = useState<SystemOption | null>(null)
  const [quoteReady, setQuoteReady] = useState(false)

  const resultRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(()=>{
    return systems
      .filter(s => s.tonnage === tonnage && s.heatSource === heatSource)
      .sort((a,b)=> a.tierRank - b.tierRank)
  }, [tonnage, heatSource])

  const addOnList = useMemo(()=> addOns, [])

  const selectedAddOns: AddOn[] = useMemo(()=> addOnList.filter(a => selectedAddOnIds.includes(a.id)), [selectedAddOnIds, addOnList])

  const quotes = useMemo(()=>{
    return filtered.map(sys => {
      const isPremium = ['Elite','Signature','Ultimate'].includes(sys.tier)
      const addOnsToApply = isPremium ? addOnList.filter(a => sys.features.join(' ').toLowerCase().includes(a.name.split(' ')[0].toLowerCase())===false && a.id==='') : selectedAddOns
      // For simplicity, premium tiers don't auto-add costs beyond bundled price in this MVP
      const q = buildQuote(sys, isPremium ? [] : selectedAddOns, promos, member)
      return q
    })
  }, [filtered, selectedAddOns, member])

  function monthlyText(idx:number){
    const q = quotes[idx]
    return `$${q.monthlyPayment}/mo`
  }
  function totalText(idx:number){
    const q = quotes[idx]
    return `$${q.finalPrice} total | 0% for ${q.system.financingMonths} mo`
  }
  function promoText(idx:number){
    const q = quotes[idx]
    if (!q.appliedPromos.length) return ''
    return `Promo applied: ${q.appliedPromos.map(p=>p.name).join(' + ')} | You save $${q.discountAmount}`
  }

  function onGenerate(){
    setShowOptions(true)
    setSelectedSystem(null)
    setQuoteReady(false)
    window.scrollTo({ top: 400, behavior:'smooth' })
  }

  async function exportPDF(){
    if (!resultRef.current) return
    await exportElementToPDF(resultRef.current, 'TempoAir-Quote.pdf')
  }

  return (
    <div className="container">
      <div className="topbar">
        <div className="title">Tempo Air — Quoting App</div>
        <div className="toolbar">
          <button className="btn secondary" onClick={()=>{setShowOptions(false); setSelectedSystem(null); setQuoteReady(false)}}>New Quote</button>
          {quoteReady && <button className="btn" onClick={exportPDF}>Export Proposal (PDF)</button>}
        </div>
      </div>

      <div className="panel">
        <div className="toolbar">
          <label>Tonnage&nbsp;
            <select value={tonnage} onChange={e=>setTonnage(parseFloat(e.target.value))}>
              {[2,2.5,3,3.5,4,5].map(t=><option key={t} value={t}>{t}T</option>)}
            </select>
          </label>
          <label>Orientation&nbsp;
            <select value={orientation} onChange={e=>setOrientation(e.target.value as any)}>
              {['Upflow','Downflow','Horizontal'].map(o=><option key={o} value={o}>{o}</option>)}
            </select>
          </label>
          <label>Heat Source&nbsp;
            <select value={heatSource} onChange={e=>setHeatSource(e.target.value as any)}>
              {['Gas','Heat Pump'].map(h=><option key={h} value={h}>{h}</option>)}
            </select>
          </label>
          <label><input type="checkbox" checked={member} onChange={e=>setMember(e.target.checked)} /> Member</label>
          <label>Add-Ons:&nbsp;
            <select multiple size={1} onChange={e=>{
              const opts = Array.from(e.target.selectedOptions).map(o=>o.value)
              setSelectedAddOnIds(opts)
            }}>
              {addOnList.map(a=><option key={a.id} value={a.id}>{a.name} (+${a.price})</option>)}
            </select>
          </label>
          <button className="btn" onClick={onGenerate}>Generate 6 Options</button>
        </div>
      </div>

      {showOptions && (
        <div className="section" ref={resultRef}>
          <div className="row-title">STANDARD TIER</div>
          <div className="grid-2rows">
            {filtered.slice(0,3).map((sys, i)=>{
              const idx = i
              return (
                <OptionCard
                  key={sys.id}
                  system={sys}
                  member={member}
                  emphasis={sys.tier==='Better'}
                  promoText={promoText(idx)}
                  monthlyText={monthlyText(idx)}
                  totalText={totalText(idx)}
                  onSelect={(s)=>{ setSelectedSystem(s); setQuoteReady(true) }}
                  onCompare={(s)=> alert(`Compare: ${s.name}\nSEER2 ${s.seer2} • ${s.compressor} • ${s.soundDb} dB`)}
                />
              )
            })}
          </div>

          <div className="divider"></div>

          <div className="row-title">PREMIUM TIER — Most homeowners upgrade here</div>
          <div className="grid-2rows">
            {filtered.slice(3,6).map((sys, i)=>{
              const idx = i+3
              return (
                <OptionCard
                  key={sys.id}
                  system={sys}
                  member={member}
                  emphasis={sys.tier==='Signature'}
                  promoText={promoText(idx)}
                  monthlyText={monthlyText(idx)}
                  totalText={totalText(idx)}
                  onSelect={(s)=>{ setSelectedSystem(s); setQuoteReady(true) }}
                  onCompare={(s)=> alert(`Compare: ${s.name}\nSEER2 ${s.seer2} • ${s.compressor} • ${s.soundDb} dB`)}
                />
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
