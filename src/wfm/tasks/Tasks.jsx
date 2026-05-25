import { useState } from 'react'
import { Plus, Filter, Search, CheckSquare, Square, Flag, X } from 'lucide-react'
import Header from '../../components/Header'
import StatusBadge from '../../components/StatusBadge'

const allTasks = [
  { id:1, title:'Foundation Layout Review', project:'Metro Tower', due:'May 27', priority:'high', status:'inprogress', subtasks: 3, done: 1 },
  { id:2, title:'Safety Checklist Submission', project:'Solar Farm', due:'May 28', priority:'medium', status:'notstarted', subtasks: 5, done: 0 },
  { id:3, title:'Weekly Progress Report', project:'Metro Tower', due:'May 30', priority:'low', status:'notstarted', subtasks: 2, done: 0 },
  { id:4, title:'Material Quality Inspection', project:'Metro Tower', due:'May 26', priority:'high', status:'completed', subtasks: 4, done: 4 },
  { id:5, title:'Site Boundary Survey', project:'Solar Farm', due:'May 31', priority:'medium', status:'inprogress', subtasks: 6, done: 2 },
  { id:6, title:'Vendor Invoice Review', project:'Office Relocation', due:'May 28', priority:'low', status:'notstarted', subtasks: 0, done: 0 },
  { id:7, title:'Daily Safety Briefing', project:'Metro Tower', due:'Daily', priority:'high', status:'completed', subtasks: 0, done: 0 },
]

const priorityColor = { high:'#dc2626', medium:'#d97706', low:'#16a34a' }

export default function Tasks() {
  const [filter, setFilter] = useState('all')
  const [checked, setChecked] = useState({})
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = allTasks.filter(t =>
    (filter==='all' || t.status===filter || t.priority===filter) &&
    t.title.toLowerCase().includes(search.toLowerCase())
  )

  const toggle = (id) => setChecked(prev => ({ ...prev, [id]: !prev[id] }))

  return (
    <div className="fade-in">
      <Header title="Tasks" rightIcon={
        <button onClick={() => setShowForm(true)} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold" style={{ background: '#7c3aed', color: '#fff' }}>
          <Plus size={13} /> Add Task
        </button>
      } />

      {/* Stats */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-4 gap-2">
          {[
            { label:'Total',value:allTasks.length,color:'#7c3aed' },
            { label:'In Progress',value:allTasks.filter(t=>t.status==='inprogress').length,color:'#1a56db' },
            { label:'Completed',value:allTasks.filter(t=>t.status==='completed').length,color:'#16a34a' },
            { label:'Overdue',value:1,color:'#dc2626' },
          ].map(s => (
            <div key={s.label} className="card p-2 text-center">
              <p className="text-lg font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[9px] leading-tight mt-0.5" style={{ color: '#6b7280' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="px-4 mb-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: '#f3f4f6' }}>
          <Search size={15} color="#9ca3af" />
          <input className="flex-1 text-sm bg-transparent" placeholder="Search tasks..." value={search} onChange={e=>setSearch(e.target.value)} />
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 px-4 mb-4 overflow-x-auto pb-1">
        {['all','inprogress','notstarted','completed','high','medium','low'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0"
            style={{ background: filter===f?'#7c3aed':'#f3f4f6', color: filter===f?'#fff':'#374151' }}>
            {f==='all'?'All':f==='inprogress'?'In Progress':f==='notstarted'?'Not Started':f.charAt(0).toUpperCase()+f.slice(1)}
          </button>
        ))}
      </div>

      {/* Task list */}
      <div className="px-4 flex flex-col gap-2">
        {filtered.map(t => {
          const isDone = checked[t.id] || t.status==='completed'
          return (
            <div key={t.id} className="card p-4" style={{ opacity: isDone ? 0.7 : 1 }}>
              <div className="flex items-start gap-3">
                <button onClick={() => toggle(t.id)} className="mt-0.5 flex-shrink-0">
                  {isDone
                    ? <CheckSquare size={20} color="#7c3aed" />
                    : <Square size={20} color="#d1d5db" />
                  }
                </button>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium" style={{ color: '#111827', textDecoration: isDone?'line-through':'none' }}>{t.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>{t.project} · Due {t.due}</p>
                  {t.subtasks > 0 && (
                    <p className="text-xs mt-1" style={{ color: '#6b7280' }}>
                      Subtasks: {isDone?t.subtasks:t.done}/{t.subtasks}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <Flag size={14} color={priorityColor[t.priority]} />
                  <StatusBadge status={isDone?'completed':t.status} size="xs" />
                </div>
              </div>
            </div>
          )
        })}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <CheckSquare size={40} color="#d1d5db" className="mx-auto mb-3" />
            <p className="text-sm" style={{ color: '#9ca3af' }}>No tasks found</p>
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-end" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="w-full rounded-t-3xl bg-white px-5 pt-5 pb-8 slide-up" style={{ maxWidth:430, margin:'0 auto' }}>
            <div className="flex items-center justify-between mb-5">
              <p className="font-bold text-base" style={{ color: '#111827' }}>Add New Task</p>
              <button onClick={() => setShowForm(false)}><X size={20} color="#6b7280" /></button>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#374151' }}>Task Name *</label>
                <input className="w-full border rounded-xl px-3 py-2.5 text-sm" placeholder="Enter task name..." style={{ borderColor: '#e5e7eb' }} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#374151' }}>Project</label>
                <select className="w-full border rounded-xl px-3 py-2.5 text-sm" style={{ borderColor: '#e5e7eb' }}>
                  <option>Select project...</option>
                  <option>Metro Tower Complex</option>
                  <option>Solar Farm Installation</option>
                  <option>Office Relocation</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#374151' }}>Priority</label>
                  <select className="w-full border rounded-xl px-3 py-2.5 text-sm" style={{ borderColor: '#e5e7eb' }}>
                    <option>High</option><option>Medium</option><option>Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#374151' }}>Due Date</label>
                  <input type="date" className="w-full border rounded-xl px-3 py-2.5 text-sm" style={{ borderColor: '#e5e7eb' }} />
                </div>
              </div>
              <button onClick={() => setShowForm(false)} className="w-full py-3.5 rounded-xl text-sm font-bold" style={{ background: '#7c3aed', color: '#fff' }}>
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
