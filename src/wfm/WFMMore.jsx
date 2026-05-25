import { useState } from 'react'
import { Clock3, Shield, BarChart2, Users, ArrowLeft, Zap } from 'lucide-react'
import Shifts from './shifts/Shifts'
import Safety from './safety/Safety'
import WFMAnalytics from './analytics/WFMAnalytics'

const modules = [
  { key:'shifts', label:'Shifts & Roster', icon:Clock3, color:'#1a56db', bg:'#EFF4FF', sub:'Roster, swap, team schedule' },
  { key:'safety', label:'Safety Management', icon:Shield, color:'#dc2626', bg:'#fef2f2', sub:'Audits, incidents, checklist' },
  { key:'analytics', label:'WFM Analytics', icon:BarChart2, color:'#7c3aed', bg:'#f5f3ff', sub:'Productivity, utilization' },
  { key:'workforce', label:'Workforce Directory', icon:Users, color:'#16a34a', bg:'#f0fdf4', sub:'Team members, roles' },
]

export default function WFMMore({ onBack }) {
  const [active, setActive] = useState(null)

  if (active === 'shifts')    return <BackWrap onBack={()=>setActive(null)}><Shifts /></BackWrap>
  if (active === 'safety')    return <BackWrap onBack={()=>setActive(null)}><Safety /></BackWrap>
  if (active === 'analytics') return <BackWrap onBack={()=>setActive(null)}><WFMAnalytics /></BackWrap>
  if (active === 'workforce') return <BackWrap onBack={()=>setActive(null)}><WorkforceDir /></BackWrap>

  return (
    <div className="fade-in">
      <div className="bg-white px-4 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid #f3f4f6' }}>
        <h1 className="text-base font-semibold" style={{ color: '#111827' }}>More Modules</h1>
        <button onClick={onBack} className="text-xs px-3 py-1.5 rounded-lg font-medium" style={{ background: '#f5f3ff', color: '#7c3aed' }}>← Orbit</button>
      </div>

      <div className="px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          {modules.map(m => (
            <button key={m.key} onClick={() => setActive(m.key)}
              className="card p-4 text-left flex flex-col gap-2 active:scale-95 transition-transform">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: m.bg }}>
                <m.icon size={20} color={m.color} />
              </div>
              <div>
                <p className="text-sm font-semibold leading-tight" style={{ color: '#111827' }}>{m.label}</p>
                <p className="text-[10px] mt-0.5 leading-tight" style={{ color: '#9ca3af' }}>{m.sub}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Quick stats */}
        <div className="mt-4 card p-4">
          <p className="font-semibold text-sm mb-3" style={{ color: '#111827' }}>Today's Snapshot</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              ['Active Projects','4','#7c3aed'],
              ['Open Tasks','8','#1a56db'],
              ['Team on Site','12','#16a34a'],
              ['Safety Alerts','1','#dc2626'],
            ].map(([l,v,c])=>(
              <div key={l} className="p-3 rounded-xl" style={{ background: c+'10' }}>
                <p className="text-xl font-bold" style={{ color: c }}>{v}</p>
                <p className="text-xs mt-0.5" style={{ color: '#6b7280' }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function WorkforceDir() {
  const team = [
    { name:'Arjun Sharma', role:'Project Lead', dept:'Engineering', status:'present', loc:'Metro Tower Site' },
    { name:'Sarah Chen', role:'Site Manager', dept:'Operations', status:'present', loc:'Metro Tower Site' },
    { name:'Raj Kumar', role:'Safety Officer', dept:'Safety', status:'present', loc:'Solar Farm' },
    { name:'Priya Singh', role:'QA Inspector', dept:'Quality', status:'leave', loc:'On Leave' },
    { name:'Marcus Rivera', role:'Project Manager', dept:'Management', status:'present', loc:'Mumbai HQ' },
    { name:'Amit Verma', role:'Site Engineer', dept:'Engineering', status:'present', loc:'Metro Tower Site' },
  ]
  const statusColor = { present:'#16a34a', leave:'#d97706', absent:'#dc2626' }
  return (
    <div className="fade-in">
      <div className="bg-white px-4 py-3" style={{ borderBottom: '1px solid #f3f4f6' }}>
        <p className="text-base font-semibold" style={{ color: '#111827' }}>Workforce Directory</p>
      </div>
      <div className="px-4 py-4">
        <div className="card divide-y divide-gray-50">
          {team.map((t,i) => (
            <div key={i} className="flex items-center gap-3 p-3.5">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: '#f5f3ff', color: '#7c3aed' }}>
                {t.name.split(' ').map(w=>w[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: '#111827' }}>{t.name}</p>
                <p className="text-xs" style={{ color: '#6b7280' }}>{t.role} · {t.dept}</p>
                <p className="text-[10px] mt-0.5" style={{ color: '#9ca3af' }}>{t.loc}</p>
              </div>
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: statusColor[t.status] }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function BackWrap({ children, onBack }) {
  return (
    <div className="relative">
      <button onClick={onBack} className="absolute top-3 left-4 z-10 flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg" style={{ background: '#f3f4f6', color: '#374151' }}>
        <ArrowLeft size={13} /> Back
      </button>
      {children}
    </div>
  )
}
