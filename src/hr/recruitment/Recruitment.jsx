import { useState } from 'react'
import { Plus, Users, Search, Filter, Briefcase, ChevronRight } from 'lucide-react'
import Header from '../../components/Header'
import StatusBadge from '../../components/StatusBadge'
import Avatar from '../../components/Avatar'

const openings = [
  { title: 'Senior Site Engineer', dept: 'Engineering', type: 'Full-time', openings: 2, applicants: 34, status: 'active', posted: 'May 1' },
  { title: 'Safety Officer', dept: 'Safety Dept', type: 'Full-time', openings: 1, applicants: 18, status: 'active', posted: 'Apr 28' },
  { title: 'Project Manager', dept: 'Operations', type: 'Full-time', openings: 1, applicants: 47, status: 'active', posted: 'Apr 15' },
  { title: 'Quality Inspector', dept: 'Quality', type: 'Contract', openings: 3, applicants: 12, status: 'active', posted: 'May 10' },
  { title: 'HR Coordinator', dept: 'HR', type: 'Full-time', openings: 1, applicants: 28, status: 'completed', posted: 'Mar 5' },
]

const candidates = [
  { name: 'Arjun Sharma', role: 'Senior Site Engineer', stage: 'HR Screening', status: 'active', applied: 'May 3' },
  { name: 'Priya Mehta', role: 'Safety Officer', stage: 'Technical Interview', status: 'active', applied: 'Apr 30' },
  { name: 'Rahul Kumar', role: 'Project Manager', stage: 'Offer Extended', status: 'pending', applied: 'Apr 20' },
  { name: 'Anita Singh', role: 'Quality Inspector', stage: 'Rejected', status: 'rejected', applied: 'May 12' },
  { name: 'Vikram Patel', role: 'Senior Site Engineer', stage: 'Director Interview', status: 'active', applied: 'May 6' },
]

const stages = ['Applied', 'HR Screening', 'Technical Interview', 'Director Interview', 'Offer Extended', 'Offer Accepted']

export default function Recruitment() {
  const [tab, setTab] = useState('openings')

  return (
    <div className="fade-in">
      <Header title="Recruitment" rightIcon={
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold" style={{ background: '#1a56db', color: '#fff' }}>
          <Plus size={13} /> New Job
        </button>
      } />

      {/* Stats */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Open Positions', value: openings.filter(o=>o.status==='active').reduce((s,o)=>s+o.openings,0), color: '#1a56db' },
            { label: 'Total Applicants', value: openings.reduce((s,o)=>s+o.applicants,0), color: '#7c3aed' },
            { label: 'In Pipeline', value: candidates.filter(c=>c.status==='active').length, color: '#16a34a' },
          ].map(s => (
            <div key={s.label} className="card p-3 text-center">
              <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[10px] font-medium mt-0.5" style={{ color: '#374151' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 bg-white px-4">
        {['openings','candidates','pipeline'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="flex-1 py-3 text-sm font-medium capitalize"
            style={{ color: tab===t?'#1a56db':'#9ca3af', borderBottom: tab===t?'2px solid #1a56db':'2px solid transparent' }}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'openings' && (
        <div className="px-4 py-4 flex flex-col gap-3">
          {openings.map((o, i) => (
            <div key={i} className="card p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#111827' }}>{o.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#6b7280' }}>{o.dept} · {o.type} · Posted {o.posted}</p>
                </div>
                <StatusBadge status={o.status} size="xs" />
              </div>
              <div className="flex items-center gap-4 pt-2" style={{ borderTop: '1px solid #f3f4f6' }}>
                <div className="flex items-center gap-1.5">
                  <Briefcase size={13} color="#9ca3af" />
                  <span className="text-xs" style={{ color: '#6b7280' }}>{o.openings} opening{o.openings>1?'s':''}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={13} color="#9ca3af" />
                  <span className="text-xs" style={{ color: '#6b7280' }}>{o.applicants} applied</span>
                </div>
                <button className="ml-auto text-xs font-medium" style={{ color: '#1a56db' }}>View →</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'candidates' && (
        <div className="px-4 py-4 flex flex-col gap-3">
          {candidates.map((c, i) => (
            <div key={i} className="card p-4 flex items-center gap-3">
              <Avatar name={c.name} size={42} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold" style={{ color: '#111827' }}>{c.name}</p>
                <p className="text-xs mt-0.5" style={{ color: '#6b7280' }}>{c.role}</p>
                <span className="text-[10px] px-2 py-0.5 rounded-full mt-1 inline-block" style={{ background: '#EFF4FF', color: '#1a56db' }}>{c.stage}</span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <StatusBadge status={c.status} size="xs" />
                <span className="text-[10px]" style={{ color: '#9ca3af' }}>{c.applied}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'pipeline' && (
        <div className="px-4 py-4">
          <p className="text-xs font-semibold mb-3" style={{ color: '#374151' }}>Hiring Pipeline Stages</p>
          <div className="flex flex-col gap-2">
            {stages.map((s, i) => {
              const count = candidates.filter(c => c.stage === s).length
              return (
                <div key={s} className="card p-3 flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: '#EFF4FF', color: '#1a56db' }}>{i+1}</div>
                  <p className="flex-1 text-sm font-medium" style={{ color: '#111827' }}>{s}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: count>0?'#EFF4FF':'#f3f4f6', color: count>0?'#1a56db':'#9ca3af' }}>
                    {count} candidate{count!==1?'s':''}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
