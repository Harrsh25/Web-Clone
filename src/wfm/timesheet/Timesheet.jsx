import { useState } from 'react'
import { Plus, ChevronLeft, ChevronRight, Clock, Send, X } from 'lucide-react'
import Header from '../../components/Header'
import StatusBadge from '../../components/StatusBadge'

const weekDays = [
  { day:'Mon', date:'May 19', entries:[{ project:'Metro Tower', task:'Foundation Review', hours:8.5 }], total:8.5 },
  { day:'Tue', date:'May 20', entries:[{ project:'Metro Tower', task:'Quality Inspection', hours:7 },{ project:'Solar Farm', task:'Site Survey', hours:1.5 }], total:8.5 },
  { day:'Wed', date:'May 21', entries:[{ project:'Solar Farm', task:'Safety Audit', hours:9 }], total:9 },
  { day:'Thu', date:'May 22', entries:[{ project:'Metro Tower', task:'Progress Report', hours:6 }], total:6 },
  { day:'Fri', date:'May 23', entries:[{ project:'Metro Tower', task:'Vendor Meeting', hours:8 }], total:8 },
  { day:'Sat', date:'May 24', entries:[], total:0 },
  { day:'Sun', date:'May 25', entries:[], total:0 },
]

const history = [
  { week:'Week 17 (May 19-25)', hours:40, status:'pending' },
  { week:'Week 16 (May 12-18)', hours:38.5, status:'approved' },
  { week:'Week 15 (May 5-11)', hours:42, status:'approved' },
  { week:'Week 14 (Apr 28–May 4)', hours:37, status:'approved' },
]

export default function Timesheet() {
  const [tab, setTab] = useState('weekly')
  const [showLog, setShowLog] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const totalHrs = weekDays.reduce((s,d)=>s+d.total,0)

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2500)
  }

  return (
    <div className="fade-in">
      <Header title="Timesheet" rightIcon={
        <button onClick={() => setShowLog(true)} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold" style={{ background: '#7c3aed', color: '#fff' }}>
          <Plus size={13} /> Log Time
        </button>
      } />

      {/* Summary */}
      <div className="px-4 py-4">
        <div className="rounded-2xl p-4" style={{ background: 'linear-gradient(135deg,#7c3aed,#5b21b6)' }}>
          <p className="text-purple-200 text-xs">Week 17 · May 19–25, 2026</p>
          <div className="flex items-end gap-2 mt-1">
            <p className="text-white text-4xl font-bold">{totalHrs}</p>
            <p className="text-purple-200 text-sm mb-1">/ 40h expected</p>
          </div>
          <div className="mt-3 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }}>
            <div className="h-full rounded-full" style={{ width: `${Math.min(100,(totalHrs/40)*100)}%`, background: totalHrs>=40?'#4ade80':'#fbbf24' }} />
          </div>
          <p className="text-purple-200 text-xs mt-1">{totalHrs>=40?'Target met ✓':`${40-totalHrs}h remaining`}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 bg-white px-4">
        {['weekly','history'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="flex-1 py-3 text-sm font-medium capitalize"
            style={{ color: tab===t?'#7c3aed':'#9ca3af', borderBottom: tab===t?'2px solid #7c3aed':'2px solid transparent' }}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'weekly' && (
        <div className="px-4 py-4">
          {/* Week nav */}
          <div className="flex items-center justify-between mb-4">
            <button className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#f3f4f6' }}>
              <ChevronLeft size={16} />
            </button>
            <p className="text-sm font-semibold" style={{ color: '#111827' }}>May 19–25, 2026</p>
            <button className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#f3f4f6' }}>
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Day bars */}
          <div className="card p-4 mb-4">
            <div className="flex items-end gap-1.5 h-20">
              {weekDays.map(d => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                  {d.total > 0 && <span className="text-[9px]" style={{ color: '#9ca3af' }}>{d.total}h</span>}
                  <div className="w-full rounded-t-lg" style={{
                    height: d.total>0?`${(d.total/10)*100}%`:'4px',
                    background: d.total>=8?'#7c3aed':d.total>0?'#c4b5fd':'#f3f4f6',
                    minHeight: 4
                  }} />
                  <span className="text-[9px] font-medium" style={{ color: d.total>0?'#374151':'#d1d5db' }}>{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Day entries */}
          <div className="flex flex-col gap-3">
            {weekDays.filter(d=>d.total>0).map(d => (
              <div key={d.day} className="card p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold" style={{ color: '#111827' }}>{d.day}, {d.date}</p>
                  <span className="font-bold text-sm" style={{ color: '#7c3aed' }}>{d.total}h</span>
                </div>
                {d.entries.map((e,i) => (
                  <div key={i} className="flex items-center justify-between py-2" style={{ borderTop: i>0?'1px solid #f3f4f6':'none' }}>
                    <div>
                      <p className="text-xs font-medium" style={{ color: '#374151' }}>{e.task}</p>
                      <p className="text-[10px]" style={{ color: '#9ca3af' }}>{e.project}</p>
                    </div>
                    <span className="text-xs font-semibold" style={{ color: '#374151' }}>{e.hours}h</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Submit */}
          {submitted ? (
            <div className="mt-4 p-4 rounded-xl text-center" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
              <p className="text-sm font-semibold" style={{ color: '#16a34a' }}>✓ Timesheet submitted for approval!</p>
            </div>
          ) : (
            <button onClick={handleSubmit} className="w-full mt-4 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2" style={{ background: '#7c3aed', color: '#fff' }}>
              <Send size={16} /> Submit for Approval
            </button>
          )}
        </div>
      )}

      {tab === 'history' && (
        <div className="px-4 py-4 flex flex-col gap-3">
          {history.map((h,i) => (
            <div key={i} className="card p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold" style={{ color: '#111827' }}>{h.week}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Clock size={12} color="#9ca3af" />
                  <span className="text-xs" style={{ color: '#6b7280' }}>{h.hours}h logged</span>
                </div>
              </div>
              <StatusBadge status={h.status} />
            </div>
          ))}
        </div>
      )}

      {/* Log Time Modal */}
      {showLog && (
        <div className="fixed inset-0 z-50 flex items-end" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="w-full rounded-t-3xl bg-white px-5 pt-5 pb-8 slide-up" style={{ maxWidth:430, margin:'0 auto' }}>
            <div className="flex items-center justify-between mb-5">
              <p className="font-bold text-base" style={{ color: '#111827' }}>Log Time</p>
              <button onClick={() => setShowLog(false)}><X size={20} color="#6b7280" /></button>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#374151' }}>Project</label>
                <select className="w-full border rounded-xl px-3 py-2.5 text-sm" style={{ borderColor: '#e5e7eb' }}>
                  <option>Metro Tower Complex</option><option>Solar Farm Installation</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#374151' }}>Task</label>
                <input className="w-full border rounded-xl px-3 py-2.5 text-sm" placeholder="What did you work on?" style={{ borderColor: '#e5e7eb' }} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#374151' }}>Date</label>
                  <input type="date" className="w-full border rounded-xl px-3 py-2.5 text-sm" style={{ borderColor: '#e5e7eb' }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#374151' }}>Hours</label>
                  <input type="number" step="0.5" placeholder="0.0" className="w-full border rounded-xl px-3 py-2.5 text-sm" style={{ borderColor: '#e5e7eb' }} />
                </div>
              </div>
              <button onClick={() => setShowLog(false)} className="w-full py-3.5 rounded-xl text-sm font-bold" style={{ background: '#7c3aed', color: '#fff' }}>
                Save Entry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
