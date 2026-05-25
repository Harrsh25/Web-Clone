import { useState } from 'react'
import { Plus, ChevronRight, Calendar, X } from 'lucide-react'
import Header from '../../components/Header'
import StatusBadge from '../../components/StatusBadge'

const leaveTypes = [
  { type: 'Casual Leave', used: 3, total: 12, color: '#1a56db', bg: '#EFF4FF' },
  { type: 'Earned Leave', used: 6, total: 18, color: '#7c3aed', bg: '#f5f3ff' },
  { type: 'Sick Leave', used: 2, total: 6, color: '#dc2626', bg: '#fef2f2' },
  { type: 'Maternity Leave', used: 0, total: 90, color: '#db2777', bg: '#fdf2f8' },
]

const leaveHistory = [
  { type: 'Casual Leave', from: 'May 5', to: 'May 6', days: 2, reason: 'Personal work', status: 'approved', by: 'Sarah Chen' },
  { type: 'Earned Leave', from: 'May 10', to: 'May 14', days: 5, reason: 'Family vacation', status: 'approved', by: 'Priya Mehta' },
  { type: 'Sick Leave', from: 'Apr 28', to: 'Apr 29', days: 2, reason: 'Illness', status: 'approved', by: 'Sarah Chen' },
  { type: 'Casual Leave', from: 'Apr 15', to: 'Apr 15', days: 1, reason: 'Festival', status: 'rejected', by: 'Sarah Chen' },
  { type: 'Earned Leave', from: 'Jun 2', to: 'Jun 6', days: 5, reason: 'Planned vacation', status: 'pending', by: 'Sarah Chen' },
]

export default function Leave() {
  const [tab, setTab] = useState('balance')
  const [showApply, setShowApply] = useState(false)
  const [form, setForm] = useState({ type: '', from: '', to: '', reason: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => { setSubmitted(false); setShowApply(false); setForm({ type:'',from:'',to:'',reason:'' }) }, 2000)
  }

  return (
    <div className="fade-in">
      <Header title="Leave Management" rightIcon={
        <button onClick={() => setShowApply(true)} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold" style={{ background: '#1a56db', color: '#fff' }}>
          <Plus size={14} /> Apply
        </button>
      } />

      {/* Tabs */}
      <div className="flex border-b border-gray-100 bg-white px-4">
        {['balance','history','policy'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="flex-1 py-3 text-sm font-medium capitalize"
            style={{ color: tab===t ? '#1a56db' : '#9ca3af', borderBottom: tab===t ? '2px solid #1a56db' : '2px solid transparent' }}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'balance' && (
        <div className="px-4 py-4 flex flex-col gap-3">
          {/* Summary Banner */}
          <div className="rounded-2xl p-4" style={{ background: 'linear-gradient(135deg,#1a56db,#1e40af)' }}>
            <p className="text-blue-200 text-xs">Total Leave Balance</p>
            <p className="text-white text-3xl font-bold mt-1">12 <span className="text-base font-normal text-blue-200">days remaining</span></p>
            <p className="text-blue-200 text-xs mt-1">Out of 36 total days this year</p>
          </div>

          {leaveTypes.map(lt => (
            <div key={lt.type} className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: lt.bg }}>
                    <Calendar size={15} color={lt.color} />
                  </div>
                  <p className="text-sm font-semibold" style={{ color: '#111827' }}>{lt.type}</p>
                </div>
                <span className="text-xs font-medium" style={{ color: lt.color }}>{lt.total - lt.used} left</span>
              </div>
              <div className="h-2 rounded-full mb-2" style={{ background: '#e5e7eb' }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${(lt.used/lt.total)*100}%`, background: lt.color }} />
              </div>
              <div className="flex justify-between">
                <span className="text-xs" style={{ color: '#9ca3af' }}>Used: {lt.used}</span>
                <span className="text-xs" style={{ color: '#9ca3af' }}>Total: {lt.total}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'history' && (
        <div className="px-4 py-4 flex flex-col gap-3">
          {leaveHistory.map((l, i) => (
            <div key={i} className="card p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#111827' }}>{l.type}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#6b7280' }}>{l.from} – {l.to} · {l.days} day{l.days>1?'s':''}</p>
                </div>
                <StatusBadge status={l.status} />
              </div>
              <p className="text-xs mb-2" style={{ color: '#6b7280' }}>Reason: {l.reason}</p>
              {l.status !== 'pending' && (
                <p className="text-xs" style={{ color: '#9ca3af' }}>
                  {l.status === 'approved' ? '✓ Approved' : '✗ Rejected'} by {l.by}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === 'policy' && (
        <div className="px-4 py-4 flex flex-col gap-3">
          {[
            { title: 'Casual Leave', desc: '12 days per year. Can be taken in hours for short durations.', color: '#1a56db' },
            { title: 'Earned Leave', desc: '18 days per year. Accrues at 1.5 days per month.', color: '#7c3aed' },
            { title: 'Sick Leave', desc: '6 days per year. Medical certificate required for 3+ days.', color: '#dc2626' },
            { title: 'Maternity Leave', desc: '90 days for female employees. Can be split pre/post delivery.', color: '#db2777' },
            { title: 'Paternity Leave', desc: '5 days for male employees within 3 months of child birth.', color: '#0891b2' },
            { title: 'Leave Without Pay', desc: 'Available after exhausting paid leave balance.', color: '#6b7280' },
          ].map(p => (
            <div key={p.title} className="card p-4 flex items-start gap-3">
              <div className="w-2 h-full rounded-full mt-1 flex-shrink-0" style={{ background: p.color, minHeight: 20 }} />
              <div>
                <p className="text-sm font-semibold mb-1" style={{ color: '#111827' }}>{p.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: '#6b7280' }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Apply Leave Modal */}
      {showApply && (
        <div className="fixed inset-0 z-50 flex items-end" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="w-full rounded-t-3xl bg-white px-5 pt-5 pb-8 slide-up" style={{ maxWidth: 430, margin: '0 auto' }}>
            {submitted ? (
              <div className="py-10 flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: '#f0fdf4' }}>
                  <span className="text-3xl">✓</span>
                </div>
                <p className="text-lg font-bold" style={{ color: '#111827' }}>Leave Applied!</p>
                <p className="text-sm text-center" style={{ color: '#6b7280' }}>Your leave application has been submitted successfully.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-5">
                  <p className="font-bold text-base" style={{ color: '#111827' }}>Apply Leave</p>
                  <button onClick={() => setShowApply(false)}><X size={20} color="#6b7280" /></button>
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: '#374151' }}>Leave Type *</label>
                    <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}
                      className="w-full border rounded-xl px-3 py-2.5 text-sm" style={{ borderColor: '#e5e7eb', color: '#111827' }}>
                      <option value="">Select leave type</option>
                      {leaveTypes.map(l => <option key={l.type}>{l.type}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: '#374151' }}>From Date *</label>
                      <input type="date" value={form.from} onChange={e => setForm({...form, from: e.target.value})}
                        className="w-full border rounded-xl px-3 py-2.5 text-sm" style={{ borderColor: '#e5e7eb' }} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: '#374151' }}>To Date *</label>
                      <input type="date" value={form.to} onChange={e => setForm({...form, to: e.target.value})}
                        className="w-full border rounded-xl px-3 py-2.5 text-sm" style={{ borderColor: '#e5e7eb' }} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: '#374151' }}>Reason *</label>
                    <textarea rows={3} placeholder="Describe your reason (min 20 characters)..."
                      value={form.reason} onChange={e => setForm({...form, reason: e.target.value})}
                      className="w-full border rounded-xl px-3 py-2.5 text-sm resize-none" style={{ borderColor: '#e5e7eb' }} />
                  </div>
                  <button onClick={handleSubmit}
                    className="w-full py-3.5 rounded-xl text-sm font-bold" style={{ background: '#1a56db', color: '#fff' }}>
                    Submit Application
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
