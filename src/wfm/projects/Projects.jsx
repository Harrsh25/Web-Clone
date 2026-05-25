import { useState } from 'react'
import { Plus, Search, MapPin, Users, Calendar, ChevronRight } from 'lucide-react'
import Header from '../../components/Header'
import StatusBadge from '../../components/StatusBadge'
import ProgressBar from '../../components/ProgressBar'
import Avatar from '../../components/Avatar'

const projects = [
  { name: 'Metro Tower Complex', code:'PRJ-001', type: 'Construction', location: 'Mumbai', pm: 'Arjun Sharma', team: 8, progress: 68, status: 'inprogress', due: 'Aug 2026', phase: 'Structure' },
  { name: 'Solar Farm Installation', code:'PRJ-002', type: 'Electrical', location: 'Rajasthan', pm: 'Marcus Rivera', team: 12, progress: 42, status: 'inprogress', due: 'Oct 2026', phase: 'Foundation' },
  { name: 'Office Relocation', code:'PRJ-003', type: 'Interior', location: 'Delhi', pm: 'Priya Mehta', team: 5, progress: 90, status: 'inprogress', due: 'May 2026', phase: 'Final Setup' },
  { name: 'Highway Bridge Project', code:'PRJ-004', type: 'Infrastructure', location: 'Pune', pm: 'Raj Kumar', team: 20, progress: 25, status: 'inprogress', due: 'Dec 2027', phase: 'Design' },
  { name: 'Chennai Site Assessment', code:'PRJ-005', type: 'Survey', location: 'Chennai', pm: 'Anita Desai', team: 4, progress: 100, status: 'completed', due: 'Apr 2026', phase: 'Done' },
]

const typeColors = { Construction:'#1a56db', Electrical:'#d97706', Interior:'#7c3aed', Infrastructure:'#16a34a', Survey:'#0891b2' }

export default function Projects() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  const filtered = projects.filter(p =>
    (filter==='all' || p.status===filter) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  if (selected) {
    const p = projects.find(pr => pr.code === selected)
    return <ProjectDetail project={p} onBack={() => setSelected(null)} />
  }

  return (
    <div className="fade-in">
      <Header title="Projects" showSearch rightIcon={
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold" style={{ background: '#7c3aed', color: '#fff' }}>
          <Plus size={13} /> New
        </button>
      } />

      {/* Search */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ background: '#f3f4f6' }}>
          <Search size={15} color="#9ca3af" />
          <input className="flex-1 text-sm bg-transparent" placeholder="Search projects..." value={search} onChange={e=>setSearch(e.target.value)} style={{ color: '#111827' }} />
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 mb-3">
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Active', value: projects.filter(p=>p.status==='inprogress').length, color: '#7c3aed' },
            { label: 'Completed', value: projects.filter(p=>p.status==='completed').length, color: '#16a34a' },
            { label: 'Total Team', value: projects.reduce((s,p)=>s+p.team,0), color: '#1a56db' },
          ].map(s => (
            <div key={s.label} className="card p-3 text-center">
              <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[10px] mt-0.5" style={{ color: '#374151' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 px-4 mb-4">
        {['all','inprogress','completed','onhold'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap"
            style={{ background: filter===f?'#7c3aed':'#f3f4f6', color: filter===f?'#fff':'#374151' }}>
            {f==='all'?'All':f==='inprogress'?'Active':f.charAt(0).toUpperCase()+f.slice(1)}
          </button>
        ))}
      </div>

      {/* Project Cards */}
      <div className="px-4 flex flex-col gap-3">
        {filtered.map((p, i) => (
          <button key={i} onClick={() => setSelected(p.code)} className="card p-4 text-left w-full">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0 pr-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: (typeColors[p.type]||'#6b7280')+'15', color: typeColors[p.type]||'#6b7280' }}>{p.type}</span>
                  <span className="text-[10px]" style={{ color: '#9ca3af' }}>{p.code}</span>
                </div>
                <p className="text-sm font-semibold" style={{ color: '#111827' }}>{p.name}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin size={11} color="#9ca3af" />
                  <span className="text-xs" style={{ color: '#9ca3af' }}>{p.location}</span>
                </div>
              </div>
              <StatusBadge status={p.status} size="xs" />
            </div>
            <ProgressBar value={p.progress} color={typeColors[p.type]||'#7c3aed'} />
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Users size={11} color="#9ca3af" />
                  <span className="text-xs" style={{ color: '#9ca3af' }}>{p.team}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={11} color="#9ca3af" />
                  <span className="text-xs" style={{ color: '#9ca3af' }}>{p.due}</span>
                </div>
              </div>
              <span className="text-xs font-medium" style={{ color: '#7c3aed' }}>{p.progress}%</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function ProjectDetail({ project: p, onBack }) {
  const [tab, setTab] = useState('overview')
  if (!p) return null
  return (
    <div className="fade-in">
      <div className="bg-white px-4 py-3 flex items-center gap-3" style={{ borderBottom: '1px solid #f3f4f6' }}>
        <button onClick={onBack} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#f3f4f6' }}>
          <span style={{ fontSize: 18 }}>←</span>
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate" style={{ color: '#111827' }}>{p.name}</p>
          <p className="text-xs" style={{ color: '#9ca3af' }}>{p.code}</p>
        </div>
        <StatusBadge status={p.status} />
      </div>

      <div className="flex border-b border-gray-100 bg-white px-4">
        {['overview','tasks','team'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="flex-1 py-3 text-sm font-medium capitalize"
            style={{ color: tab===t?'#7c3aed':'#9ca3af', borderBottom: tab===t?'2px solid #7c3aed':'2px solid transparent' }}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="px-4 py-4 flex flex-col gap-4">
          <div className="card p-4">
            <p className="font-semibold text-sm mb-3" style={{ color: '#111827' }}>Project Progress</p>
            <ProgressBar value={p.progress} color="#7c3aed" height={10} showLabel />
          </div>
          <div className="card p-4">
            <p className="font-semibold text-sm mb-3" style={{ color: '#111827' }}>Details</p>
            {[
              ['Type', p.type], ['Location', p.location], ['Phase', p.phase],
              ['Project Manager', p.pm], ['Due Date', p.due], ['Team Size', p.team+' members']
            ].map(([k,v]) => (
              <div key={k} className="flex justify-between py-2" style={{ borderBottom: '1px solid #f9fafb' }}>
                <span className="text-xs" style={{ color: '#9ca3af' }}>{k}</span>
                <span className="text-xs font-medium" style={{ color: '#374151' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'tasks' && (
        <div className="px-4 py-4">
          <div className="card divide-y divide-gray-50">
            {['Foundation Layout','Structural Review','Safety Audit','Quality Check','Weekly Report'].map((t,i) => (
              <div key={i} className="flex items-center gap-3 p-3.5">
                <div className="w-5 h-5 rounded border-2 flex-shrink-0" style={{ borderColor: i<2?'#7c3aed':'#d1d5db', background: i<2?'#7c3aed':'transparent', display:'flex',alignItems:'center',justifyContent:'center' }}>
                  {i<2 && <span style={{ color:'#fff', fontSize:10 }}>✓</span>}
                </div>
                <span className="text-sm flex-1" style={{ color: i<2?'#9ca3af':'#111827', textDecoration: i<2?'line-through':'none' }}>{t}</span>
                <StatusBadge status={i<2?'completed':i===2?'inprogress':'notstarted'} size="xs" />
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'team' && (
        <div className="px-4 py-4">
          <div className="card divide-y divide-gray-50">
            {[['Arjun Sharma','Project Lead'],['Sarah Chen','Site Manager'],['Raj Kumar','Safety Officer'],['Priya Singh','QA Inspector'],['Amit Verma','Engineer']].map(([n,r],i) => (
              <div key={i} className="flex items-center gap-3 p-3.5">
                <Avatar name={n} size={38} />
                <div>
                  <p className="text-sm font-medium" style={{ color: '#111827' }}>{n}</p>
                  <p className="text-xs" style={{ color: '#9ca3af' }}>{r}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
