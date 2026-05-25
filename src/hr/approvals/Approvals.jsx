import { useState } from 'react'
import { CheckCircle, XCircle, Clock, Filter, ChevronRight } from 'lucide-react'
import Header from '../../components/Header'
import StatusBadge from '../../components/StatusBadge'
import Avatar from '../../components/Avatar'

const approvals = [
  { id:1, type:'Leave Request', from:'Amit Sharma', sub:'Casual Leave · May 28-30 · 3 days', time:'2h ago', status:'pending', dept:'Engineering' },
  { id:2, type:'Expense Claim', from:'Priya Singh', sub:'Travel – Bangalore trip · ₹4,200', time:'5h ago', status:'pending', dept:'Finance' },
  { id:3, type:'Attendance Regularisation', from:'Raj Kumar', sub:'Apr 22 · WFH not marked', time:'1d ago', status:'pending', dept:'Engineering' },
  { id:4, type:'Leave Request', from:'Anita Desai', sub:'Sick Leave · May 8-9 · 2 days', time:'3d ago', status:'approved', dept:'HR' },
  { id:5, type:'Overtime Request', from:'Marcus Rivera', sub:'Apr 30 · 3 extra hours', time:'4d ago', status:'rejected', dept:'Operations' },
  { id:6, type:'Expense Claim', from:'Rahul Verma', sub:'Client dinner · ₹2,800', time:'5d ago', status:'approved', dept:'Sales' },
]

export default function Approvals() {
  const [filter, setFilter] = useState('all')
  const [actioned, setActioned] = useState({})

  const filtered = approvals.filter(a => filter === 'all' || a.status === filter)
  const pending = approvals.filter(a => a.status === 'pending').length

  const act = (id, action) => setActioned(prev => ({ ...prev, [id]: action }))

  return (
    <div className="fade-in">
      <Header title="Approvals" showSearch />

      {/* Stats */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Pending', value: pending, color: '#d97706', bg: '#fffbeb' },
            { label: 'Approved', value: approvals.filter(a=>a.status==='approved').length, color: '#16a34a', bg: '#f0fdf4' },
            { label: 'Rejected', value: approvals.filter(a=>a.status==='rejected').length, color: '#dc2626', bg: '#fef2f2' },
          ].map(s => (
            <div key={s.label} className="card p-3 text-center" style={{ border: `1px solid ${s.color}20` }}>
              <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs font-medium mt-0.5" style={{ color: '#374151' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 px-4 mb-4 overflow-x-auto pb-1">
        {['all','pending','approved','rejected'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0"
            style={{ background: filter===f ? '#1a56db' : '#f3f4f6', color: filter===f ? '#fff' : '#374151' }}>
            {f.charAt(0).toUpperCase()+f.slice(1)}
          </button>
        ))}
      </div>

      {/* Approval cards */}
      <div className="px-4 flex flex-col gap-3 pb-4">
        {filtered.map(a => {
          const done = actioned[a.id]
          const currentStatus = done || a.status
          return (
            <div key={a.id} className="card p-4">
              <div className="flex items-start gap-3">
                <Avatar name={a.from} size={40} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-medium" style={{ color: '#6b7280' }}>{a.type}</p>
                      <p className="text-sm font-semibold" style={{ color: '#111827' }}>{a.from}</p>
                      <p className="text-xs mt-0.5" style={{ color: '#6b7280' }}>{a.sub}</p>
                    </div>
                    <StatusBadge status={currentStatus} size="xs" />
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px]" style={{ color: '#9ca3af' }}>{a.dept}</span>
                    <span className="text-[10px]" style={{ color: '#d1d5db' }}>·</span>
                    <span className="text-[10px]" style={{ color: '#9ca3af' }}>{a.time}</span>
                  </div>
                </div>
              </div>

              {currentStatus === 'pending' && !done && (
                <div className="flex gap-2 mt-3 pt-3" style={{ borderTop: '1px solid #f3f4f6' }}>
                  <button onClick={() => act(a.id, 'rejected')}
                    className="flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
                    style={{ background: '#fef2f2', color: '#dc2626' }}>
                    <XCircle size={14} /> Reject
                  </button>
                  <button onClick={() => act(a.id, 'approved')}
                    className="flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
                    style={{ background: '#1a56db', color: '#fff' }}>
                    <CheckCircle size={14} /> Approve
                  </button>
                </div>
              )}
            </div>
          )
        })}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-4xl mb-2">✓</p>
            <p className="text-sm font-medium" style={{ color: '#374151' }}>All caught up!</p>
            <p className="text-xs mt-1" style={{ color: '#9ca3af' }}>No {filter} approvals</p>
          </div>
        )}
      </div>
    </div>
  )
}
