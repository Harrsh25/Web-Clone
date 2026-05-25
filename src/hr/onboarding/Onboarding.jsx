import { CheckCircle, Circle, Clock, FileText, User, Briefcase, ChevronRight } from 'lucide-react'
import Header from '../../components/Header'
import ProgressBar from '../../components/ProgressBar'
import StatusBadge from '../../components/StatusBadge'

const joiners = [
  { name: 'Riya Desai', role: 'Safety Inspector', joining: 'Jun 2, 2026', progress: 20, status: 'active', dept: 'Safety' },
  { name: 'Karan Mehta', role: 'Site Engineer', joining: 'Jun 9, 2026', progress: 0, status: 'notstarted', dept: 'Engineering' },
]

const checklist = [
  { task: 'Welcome email & credentials sent', done: true },
  { task: 'IT equipment allocated', done: true },
  { task: 'Access card issued', done: true },
  { task: 'HR documentation completed', done: false },
  { task: 'Benefits enrollment', done: false },
  { task: 'Induction training scheduled', done: false },
  { task: 'Manager introduction', done: false },
]

export default function Onboarding() {
  const done = checklist.filter(c => c.done).length
  return (
    <div className="fade-in">
      <Header title="Onboarding" />

      {/* Stats */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Joining Soon', value: joiners.length, color: '#1a56db' },
            { label: 'Tasks Done', value: done, color: '#16a34a' },
            { label: 'Pending', value: checklist.length - done, color: '#d97706' },
          ].map(s => (
            <div key={s.label} className="card p-3 text-center">
              <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[10px] font-medium mt-0.5" style={{ color: '#374151' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* New Joiners */}
      <div className="px-4 mb-4">
        <p className="font-semibold text-sm mb-3" style={{ color: '#111827' }}>Upcoming Joiners</p>
        <div className="flex flex-col gap-3">
          {joiners.map((j, i) => (
            <div key={i} className="card p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold" style={{ background: '#EFF4FF', color: '#1a56db' }}>
                    {j.name.split(' ').map(w=>w[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#111827' }}>{j.name}</p>
                    <p className="text-xs" style={{ color: '#6b7280' }}>{j.role} · {j.dept}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>Joining: {j.joining}</p>
                  </div>
                </div>
                <StatusBadge status={j.status} size="xs" />
              </div>
              <ProgressBar value={j.progress} showLabel />
            </div>
          ))}
        </div>
      </div>

      {/* Checklist */}
      <div className="px-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold text-sm" style={{ color: '#111827' }}>Onboarding Checklist</p>
          <span className="text-xs font-medium" style={{ color: '#6b7280' }}>{done}/{checklist.length}</span>
        </div>
        <div className="card divide-y divide-gray-50">
          {checklist.map((c, i) => (
            <div key={i} className="flex items-center gap-3 p-3.5">
              {c.done
                ? <CheckCircle size={18} color="#16a34a" />
                : <Circle size={18} color="#d1d5db" />
              }
              <span className="text-sm" style={{ color: c.done ? '#6b7280' : '#111827', textDecoration: c.done ? 'line-through' : 'none' }}>
                {c.task}
              </span>
              {!c.done && <ChevronRight size={15} color="#d1d5db" className="ml-auto" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
