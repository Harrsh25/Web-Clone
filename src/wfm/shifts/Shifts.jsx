import { useState } from 'react'
import { Clock, RefreshCw, ChevronRight, Bell } from 'lucide-react'
import Header from '../../components/Header'
import StatusBadge from '../../components/StatusBadge'
import Avatar from '../../components/Avatar'

const roster = [
  { day:'Mon', date:'May 26', shift:'Morning', time:'08:00–17:00', status:'scheduled' },
  { day:'Tue', date:'May 27', shift:'Morning', time:'08:00–17:00', status:'scheduled' },
  { day:'Wed', date:'May 28', shift:'Morning', time:'08:00–17:00', status:'scheduled' },
  { day:'Thu', date:'May 29', shift:'Evening', time:'17:00–22:00', status:'scheduled' },
  { day:'Fri', date:'May 30', shift:'Morning', time:'08:00–17:00', status:'scheduled' },
  { day:'Sat', date:'May 31', shift:'Off', time:'—', status:'leave' },
  { day:'Sun', date:'Jun 1',  shift:'Off', time:'—', status:'holiday' },
]

const shiftColors = { Morning:'#1a56db', Evening:'#7c3aed', Night:'#374151', Off:'#9ca3af' }

const swapRequests = [
  { from:'Arjun Sharma', myShift:'May 28 Morning', theirShift:'May 29 Evening', status:'pending' },
  { from:'Raj Kumar', myShift:'Jun 3 Morning', theirShift:'Jun 2 Evening', status:'approved' },
]

export default function Shifts() {
  const [tab, setTab] = useState('roster')

  return (
    <div className="fade-in">
      <Header title="Shifts & Roster" />

      {/* Tabs */}
      <div className="flex border-b border-gray-100 bg-white px-4">
        {['roster','swap','team'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="flex-1 py-3 text-sm font-medium capitalize"
            style={{ color: tab===t?'#7c3aed':'#9ca3af', borderBottom: tab===t?'2px solid #7c3aed':'2px solid transparent' }}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'roster' && (
        <div className="px-4 py-4">
          {/* Next shift alert */}
          <div className="rounded-xl p-3.5 flex items-center gap-3 mb-4" style={{ background: '#EFF4FF', border: '1px solid #bfdbfe' }}>
            <Bell size={18} color="#1a56db" />
            <div>
              <p className="text-xs font-semibold" style={{ color: '#1e3a8a' }}>Next Shift: Monday Morning</p>
              <p className="text-xs mt-0.5" style={{ color: '#1d4ed8' }}>May 26 · 08:00–17:00 AM · Mumbai HQ</p>
            </div>
          </div>

          <p className="font-semibold text-sm mb-3" style={{ color: '#111827' }}>This Week's Schedule</p>
          <div className="flex flex-col gap-2">
            {roster.map((r, i) => (
              <div key={i} className="card p-3.5 flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl flex flex-col items-center justify-center flex-shrink-0" style={{ background: (shiftColors[r.shift]||'#9ca3af')+'15' }}>
                  <span className="text-[10px] font-medium" style={{ color: shiftColors[r.shift]||'#9ca3af' }}>{r.day}</span>
                  <span className="text-base font-bold" style={{ color: shiftColors[r.shift]||'#9ca3af' }}>{r.date.split(' ')[1]}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: '#111827' }}>{r.shift} Shift</p>
                  {r.time !== '—' && (
                    <p className="text-xs mt-0.5" style={{ color: '#6b7280' }}>
                      <Clock size={11} className="inline mr-1" />{r.time}
                    </p>
                  )}
                </div>
                <StatusBadge status={r.status} size="xs" />
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'swap' && (
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <p className="font-semibold text-sm" style={{ color: '#111827' }}>Shift Swap Requests</p>
            <button className="flex items-center gap-1 text-xs font-semibold" style={{ color: '#7c3aed' }}>
              <RefreshCw size={13} /> Request Swap
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {swapRequests.map((s,i) => (
              <div key={i} className="card p-4">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm font-semibold" style={{ color: '#111827' }}>Swap with {s.from}</p>
                  <StatusBadge status={s.status} size="xs" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 p-2 rounded-lg text-center" style={{ background: '#f3f4f6' }}>
                    <p className="text-[10px]" style={{ color: '#9ca3af' }}>My Shift</p>
                    <p className="text-xs font-medium" style={{ color: '#374151' }}>{s.myShift}</p>
                  </div>
                  <RefreshCw size={16} color="#9ca3af" />
                  <div className="flex-1 p-2 rounded-lg text-center" style={{ background: '#f3f4f6' }}>
                    <p className="text-[10px]" style={{ color: '#9ca3af' }}>Their Shift</p>
                    <p className="text-xs font-medium" style={{ color: '#374151' }}>{s.theirShift}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'team' && (
        <div className="px-4 py-4">
          <p className="font-semibold text-sm mb-3" style={{ color: '#111827' }}>Team Roster - Today</p>
          <div className="card divide-y divide-gray-50">
            {[
              ['Arjun Sharma','Morning Shift','08:00–17:00','present'],
              ['Sarah Chen','Morning Shift','08:00–17:00','present'],
              ['Raj Kumar','Evening Shift','17:00–22:00','scheduled'],
              ['Priya Singh','Morning Shift','08:00–17:00','leave'],
              ['Marcus Rivera','Night Shift','22:00–06:00','scheduled'],
            ].map(([n,s,t,status],i) => (
              <div key={i} className="flex items-center gap-3 p-3.5">
                <Avatar name={n} size={38} />
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: '#111827' }}>{n}</p>
                  <p className="text-xs" style={{ color: '#9ca3af' }}>{s} · {t}</p>
                </div>
                <StatusBadge status={status} size="xs" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
