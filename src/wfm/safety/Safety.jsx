import { useState } from 'react'
import { Shield, AlertTriangle, CheckCircle, Camera, FileText, ChevronRight, Plus } from 'lucide-react'
import Header from '../../components/Header'
import StatusBadge from '../../components/StatusBadge'
import ProgressBar from '../../components/ProgressBar'

const incidents = [
  { title: 'Near-miss: Scaffolding instability', site: 'Metro Tower Block A', date: 'May 22', severity: 'medium', status: 'inprogress' },
  { title: 'Minor injury: Hand cut on rebar', site: 'Metro Tower Block B', date: 'May 18', severity: 'low', status: 'completed' },
  { title: 'Electrical safety violation', site: 'Solar Farm Site', date: 'May 10', severity: 'high', status: 'completed' },
]

const audits = [
  { title: 'Weekly Safety Inspection', site: 'Metro Tower', due: 'May 27', status: 'pending', items: 24, done: 0 },
  { title: 'Fire Safety Drill', site: 'Mumbai HQ', due: 'May 30', status: 'pending', items: 12, done: 0 },
  { title: 'PPE Compliance Check', site: 'Solar Farm', due: 'May 24', status: 'completed', items: 18, done: 18 },
]

const checklist = [
  { item: 'Personal Protective Equipment worn', done: true },
  { item: 'Safety harness inspected', done: true },
  { item: 'Tool condition verified', done: true },
  { item: 'Work area cordoned off', done: false },
  { item: 'Safety briefing conducted', done: false },
  { item: 'Emergency exits clear', done: true },
  { item: 'First aid kit available', done: false },
]

export default function Safety() {
  const [tab, setTab] = useState('dashboard')

  const done = checklist.filter(c=>c.done).length

  return (
    <div className="fade-in">
      <Header title="Safety Management" />

      {/* Tabs */}
      <div className="flex border-b border-gray-100 bg-white px-4">
        {['dashboard','incidents','audits','checklist'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="flex-1 py-3 text-xs font-medium capitalize"
            style={{ color: tab===t?'#dc2626':'#9ca3af', borderBottom: tab===t?'2px solid #dc2626':'2px solid transparent' }}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'dashboard' && (
        <div className="px-4 py-4 flex flex-col gap-4">
          {/* Safety Score */}
          <div className="rounded-2xl p-4" style={{ background: 'linear-gradient(135deg,#16a34a,#15803d)' }}>
            <p className="text-green-200 text-xs">Safety Score</p>
            <p className="text-white text-4xl font-bold mt-1">87<span className="text-xl">/100</span></p>
            <p className="text-green-200 text-xs mt-1">Above industry average of 72</p>
            <div className="mt-3 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }}>
              <div className="h-full rounded-full" style={{ width: '87%', background: '#4ade80' }} />
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label:'Days Without Incident', value:'18', icon:Shield, color:'#16a34a' },
              { label:'Open Incidents', value:'1', icon:AlertTriangle, color:'#d97706' },
              { label:'Audits This Month', value:'3', icon:CheckCircle, color:'#1a56db' },
              { label:'Non-Compliant Items', value:'4', icon:AlertTriangle, color:'#dc2626' },
            ].map(k => (
              <div key={k.label} className="card p-4">
                <div className="flex items-center gap-2 mb-1">
                  <k.icon size={16} color={k.color} />
                  <span className="text-xs" style={{ color: '#9ca3af' }}>{k.label}</span>
                </div>
                <p className="text-2xl font-bold" style={{ color: k.color }}>{k.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'incidents' && (
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <p className="font-semibold text-sm" style={{ color: '#111827' }}>Incident Reports</p>
            <button className="flex items-center gap-1 text-xs font-semibold" style={{ color: '#dc2626' }}>
              <Plus size={13} /> Report
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {incidents.map((inc,i) => (
              <div key={i} className="card p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 pr-2">
                    <p className="text-sm font-semibold" style={{ color: '#111827' }}>{inc.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#6b7280' }}>{inc.site} · {inc.date}</p>
                  </div>
                  <StatusBadge status={inc.severity} size="xs" />
                </div>
                <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid #f3f4f6' }}>
                  <StatusBadge status={inc.status} size="xs" />
                  <button className="text-xs font-medium" style={{ color: '#1a56db' }}>View Report →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'audits' && (
        <div className="px-4 py-4 flex flex-col gap-3">
          {audits.map((a,i) => (
            <div key={i} className="card p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#111827' }}>{a.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#6b7280' }}>{a.site} · Due {a.due}</p>
                </div>
                <StatusBadge status={a.status} size="xs" />
              </div>
              <ProgressBar value={a.done} max={a.items} showLabel />
              {a.status === 'pending' && (
                <button className="mt-3 w-full py-2 rounded-xl text-xs font-semibold" style={{ background: '#EFF4FF', color: '#1a56db' }}>
                  Start Audit
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === 'checklist' && (
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <p className="font-semibold text-sm" style={{ color: '#111827' }}>Daily Safety Checklist</p>
            <span className="text-xs font-medium" style={{ color: '#6b7280' }}>{done}/{checklist.length}</span>
          </div>
          <ProgressBar value={done} max={checklist.length} color="#16a34a" height={8} />
          <div className="card mt-4 divide-y divide-gray-50">
            {checklist.map((c,i) => (
              <div key={i} className="flex items-center gap-3 p-3.5">
                <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0" style={{ background: c.done?'#16a34a':'#f3f4f6', border: c.done?'none':'2px solid #d1d5db' }}>
                  {c.done && <span style={{ color:'#fff', fontSize:11 }}>✓</span>}
                </div>
                <span className="text-sm" style={{ color: c.done?'#9ca3af':'#374151', textDecoration: c.done?'line-through':'none' }}>{c.item}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-3.5 rounded-xl text-sm font-bold" style={{ background: '#16a34a', color: '#fff' }}>
            Submit Checklist
          </button>
        </div>
      )}
    </div>
  )
}
