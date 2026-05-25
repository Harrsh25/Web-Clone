import { useState } from 'react'
import { ChevronLeft, ChevronRight, Clock, LogIn, LogOut, MapPin, Filter } from 'lucide-react'
import Header from '../../components/Header'
import StatusBadge from '../../components/StatusBadge'

const days = ['Su','Mo','Tu','We','Th','Fr','Sa']
const MONTH_DATA = Array.from({ length: 31 }, (_, i) => {
  const d = i + 1
  const r = Math.random()
  if (d === 25) return { d, status: 'today' }
  if (d > 25)   return { d, status: 'future' }
  if ([6,7,13,14,20,21].includes(d)) return { d, status: 'weekend' }
  if ([4,12,18].includes(d)) return { d, status: 'absent' }
  if ([3,9].includes(d))     return { d, status: 'late' }
  if ([8].includes(d))       return { d, status: 'leave' }
  return { d, status: 'present' }
})

const colorMap = {
  present: '#16a34a', absent: '#dc2626', late: '#d97706',
  leave: '#7c3aed', weekend: '#d1d5db', today: '#1a56db', future: '#e5e7eb'
}

const history = [
  { date: 'Mon, May 19', checkin: '09:02 AM', checkout: '06:14 PM', hours: '9h 12m', status: 'present', loc: 'Office' },
  { date: 'Fri, May 16', checkin: '09:30 AM', checkout: '06:00 PM', hours: '8h 30m', status: 'present', loc: 'Office' },
  { date: 'Thu, May 15', checkin: '10:15 AM', checkout: '06:30 PM', hours: '8h 15m', status: 'late', loc: 'WFH' },
  { date: 'Wed, May 14', checkin: '--', checkout: '--', hours: '--', status: 'leave', loc: '--' },
  { date: 'Tue, May 13', checkin: '--', checkout: '--', hours: '--', status: 'absent', loc: '--' },
  { date: 'Mon, May 12', checkin: '08:55 AM', checkout: '05:58 PM', hours: '9h 03m', status: 'present', loc: 'Office' },
]

export default function Attendance() {
  const [tab, setTab] = useState('overview')
  const [selected, setSelected] = useState(25)

  const tabs = ['overview', 'calendar', 'history']

  return (
    <div className="fade-in">
      <Header title="Attendance" />

      {/* Summary */}
      <div className="px-4 py-4">
        <div className="rounded-2xl p-4" style={{ background: 'linear-gradient(135deg,#1a56db,#1e40af)' }}>
          <p className="text-blue-200 text-xs mb-3">May 2026 Summary</p>
          <div className="grid grid-cols-4 gap-2">
            {[['18','Present','#4ade80'],['3','Absent','#f87171'],['2','Late','#fbbf24'],['1','On Leave','#c4b5fd']].map(([v,l,c])=>(
              <div key={l} className="text-center">
                <p className="text-white text-xl font-bold">{v}</p>
                <p className="text-[10px] mt-0.5" style={{ color: c }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 bg-white px-4">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="flex-1 py-3 text-sm font-medium capitalize transition-all"
            style={{ color: tab===t ? '#1a56db' : '#9ca3af', borderBottom: tab===t ? '2px solid #1a56db' : '2px solid transparent' }}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="px-4 py-4 flex flex-col gap-4">
          {/* Today's punch card */}
          <div className="card p-4">
            <div className="flex items-center justify-between mb-4">
              <p className="font-semibold text-sm" style={{ color: '#111827' }}>Today's Attendance</p>
              <StatusBadge status="present" label="Present" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[{ icon: LogIn, label: 'Punch In', time: '09:02 AM', color: '#16a34a' },
                { icon: LogOut, label: 'Punch Out', time: '—', color: '#6b7280' }].map(p => (
                <div key={p.label} className="rounded-xl p-3 flex items-center gap-2" style={{ background: '#f9fafb' }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: p.color + '15' }}>
                    <p.icon size={16} color={p.color} />
                  </div>
                  <div>
                    <p className="text-[10px]" style={{ color: '#9ca3af' }}>{p.label}</p>
                    <p className="text-sm font-semibold" style={{ color: '#111827' }}>{p.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-3 pt-3" style={{ borderTop: '1px solid #f3f4f6' }}>
              <MapPin size={13} color="#6b7280" />
              <span className="text-xs" style={{ color: '#6b7280' }}>Mumbai HQ – Main Office</span>
              <span className="ml-auto text-xs font-medium" style={{ color: '#1a56db' }}>⏱ 6h 14m worked</span>
            </div>
          </div>

          {/* Attendance rate */}
          <div className="card p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-sm" style={{ color: '#111827' }}>Attendance Rate</p>
              <span className="font-bold text-base" style={{ color: '#16a34a' }}>85.7%</span>
            </div>
            <div className="h-2 rounded-full" style={{ background: '#e5e7eb' }}>
              <div className="h-full rounded-full" style={{ width: '85.7%', background: '#16a34a' }} />
            </div>
            <p className="text-xs mt-2" style={{ color: '#9ca3af' }}>18 of 21 working days attended</p>
          </div>

          {/* Regularisation */}
          <div className="card p-4">
            <p className="font-semibold text-sm mb-3" style={{ color: '#111827' }}>Regularisation Request</p>
            <button className="w-full py-3 rounded-xl text-sm font-semibold" style={{ background: '#EFF4FF', color: '#1a56db' }}>
              + Apply Attendance Regularisation
            </button>
          </div>
        </div>
      )}

      {tab === 'calendar' && (
        <div className="px-4 py-4">
          <div className="card p-4">
            {/* Month nav */}
            <div className="flex items-center justify-between mb-4">
              <button className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#f3f4f6' }}>
                <ChevronLeft size={16} color="#374151" />
              </button>
              <p className="font-semibold" style={{ color: '#111827' }}>May 2026</p>
              <button className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#f3f4f6' }}>
                <ChevronRight size={16} color="#374151" />
              </button>
            </div>

            {/* Day labels */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {days.map(d => <p key={d} className="text-center text-[10px] font-medium" style={{ color: '#9ca3af' }}>{d}</p>)}
            </div>

            {/* Offset for May 1 = Friday (5) */}
            <div className="grid grid-cols-7 gap-1">
              {Array(4).fill(null).map((_, i) => <div key={'e'+i} />)}
              {MONTH_DATA.map(({ d, status }) => (
                <button key={d} onClick={() => setSelected(d)}
                  className="aspect-square flex items-center justify-center rounded-full text-xs font-medium transition-all"
                  style={{
                    background: selected===d ? '#1a56db' : status==='weekend'||status==='future' ? 'transparent' : colorMap[status]+'20',
                    color: selected===d ? '#fff' : status==='weekend'||status==='future' ? '#d1d5db' : colorMap[status],
                    fontWeight: selected===d ? 700 : 500,
                    border: status==='today' && selected!==d ? '2px solid #1a56db' : 'none'
                  }}>
                  {d}
                </button>
              ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 mt-4 pt-3" style={{ borderTop: '1px solid #f3f4f6' }}>
              {[['Present','#16a34a'],['Absent','#dc2626'],['Late','#d97706'],['Leave','#7c3aed'],['Weekend','#9ca3af']].map(([l,c])=>(
                <div key={l} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                  <span className="text-[10px]" style={{ color: '#6b7280' }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'history' && (
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold" style={{ color: '#111827' }}>Attendance History</p>
            <button className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#f3f4f6' }}>
              <Filter size={14} color="#6b7280" />
            </button>
          </div>
          <div className="card divide-y divide-gray-50">
            {history.map((h, i) => (
              <div key={i} className="p-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colorMap[h.status]+'20' }}>
                  <Clock size={16} color={colorMap[h.status]} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium" style={{ color: '#111827' }}>{h.date}</p>
                  {h.checkin !== '--' ? (
                    <p className="text-xs" style={{ color: '#6b7280' }}>{h.checkin} – {h.checkout} · {h.hours}</p>
                  ) : (
                    <p className="text-xs" style={{ color: '#9ca3af' }}>No punch record · {h.loc}</p>
                  )}
                </div>
                <StatusBadge status={h.status} size="xs" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
