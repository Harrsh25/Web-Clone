import { BarChart2, TrendingUp, Users, Zap, Clock } from 'lucide-react'
import Header from '../../components/Header'
import ProgressBar from '../../components/ProgressBar'

const projectMetrics = [
  { name: 'Metro Tower', progress: 68, onTrack: true, budget: 82 },
  { name: 'Solar Farm', progress: 42, onTrack: true, budget: 55 },
  { name: 'Office Relocation', progress: 90, onTrack: false, budget: 105 },
  { name: 'Highway Bridge', progress: 25, onTrack: true, budget: 30 },
]

export default function WFMAnalytics() {
  return (
    <div className="fade-in">
      <Header title="Workforce Analytics" />

      {/* KPIs */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          {[
            { label:'Task Completion Rate', value:'74%', sub:'↑ 8% vs last week', color:'#7c3aed', icon:Zap },
            { label:'Avg Hours/Day', value:'7.8h', sub:'Target: 8h', color:'#1a56db', icon:Clock },
            { label:'Team Utilization', value:'88%', sub:'4 members fully allocated', color:'#16a34a', icon:Users },
            { label:'Overdue Tasks', value:'3', sub:'↓ 2 resolved today', color:'#dc2626', icon:TrendingUp },
          ].map(k => (
            <div key={k.label} className="card p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: k.color+'15' }}>
                  <k.icon size={16} color={k.color} />
                </div>
                <span className="font-bold text-xl" style={{ color: k.color }}>{k.value}</span>
              </div>
              <p className="text-xs font-semibold" style={{ color: '#374151' }}>{k.label}</p>
              <p className="text-[10px] mt-0.5" style={{ color: '#9ca3af' }}>{k.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Daily productivity */}
      <div className="px-4 mb-4">
        <div className="card p-4">
          <p className="font-semibold text-sm mb-4" style={{ color: '#111827' }}>Daily Productivity (Tasks/Day)</p>
          <div className="flex items-end gap-1.5 h-24">
            {[{d:'Mon',v:12},{d:'Tue',v:9},{d:'Wed',v:15},{d:'Thu',v:11},{d:'Fri',v:14},{d:'Sat',v:4},{d:'Sun',v:0}].map(({d,v})=>(
              <div key={d} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9px]" style={{ color: '#9ca3af' }}>{v>0?v:''}</span>
                <div className="w-full rounded-t-md" style={{ height: v>0?`${(v/15)*100}%`:'4px', background: v>10?'#7c3aed':v>0?'#c4b5fd':'#f3f4f6', minHeight: 4 }} />
                <span className="text-[9px]" style={{ color: '#9ca3af' }}>{d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project progress */}
      <div className="px-4 mb-4">
        <div className="card p-4">
          <p className="font-semibold text-sm mb-3" style={{ color: '#111827' }}>Project Progress vs Budget</p>
          <div className="flex flex-col gap-4">
            {projectMetrics.map(p => (
              <div key={p.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium" style={{ color: '#374151' }}>{p.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: p.onTrack?'#f0fdf4':'#fef2f2', color: p.onTrack?'#16a34a':'#dc2626' }}>
                      {p.onTrack?'On Track':'Over Budget'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <p className="text-[9px] mb-0.5" style={{ color: '#9ca3af' }}>Progress</p>
                    <ProgressBar value={p.progress} color="#7c3aed" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[9px] mb-0.5" style={{ color: '#9ca3af' }}>Budget Used</p>
                    <ProgressBar value={Math.min(100,p.budget)} color={p.budget>100?'#dc2626':'#16a34a'} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resource allocation */}
      <div className="px-4 mb-4">
        <div className="card p-4">
          <p className="font-semibold text-sm mb-3" style={{ color: '#111827' }}>Team Allocation</p>
          <div className="flex flex-col gap-2">
            {[
              ['Arjun Sharma','Metro Tower','100%','#dc2626'],
              ['Sarah Chen','Metro Tower + Solar Farm','110%','#dc2626'],
              ['Raj Kumar','Solar Farm','85%','#16a34a'],
              ['Priya Singh','Multiple Projects','70%','#16a34a'],
              ['Marcus Rivera','Highway Bridge','90%','#d97706'],
            ].map(([n,p,util,c]) => (
              <div key={n} className="flex items-center gap-3 py-2" style={{ borderBottom: '1px solid #f3f4f6' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: c+'15', color: c }}>
                  {n.split(' ').map(w=>w[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate" style={{ color: '#374151' }}>{n}</p>
                  <p className="text-[10px] truncate" style={{ color: '#9ca3af' }}>{p}</p>
                </div>
                <span className="text-xs font-bold flex-shrink-0" style={{ color: c }}>{util}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
