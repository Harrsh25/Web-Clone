import { useState } from 'react'
import {
  Bell, Search, ChevronRight, MapPin, Clock, LogIn, LogOut,
  Calendar, FileText, CreditCard, TrendingUp, Users, BookOpen,
  Award, AlertCircle, CheckCircle, ArrowRight, Zap, Shield
} from 'lucide-react'
import StatusBadge from '../../components/StatusBadge'
import Avatar from '../../components/Avatar'

const quickActions = [
  { label: 'Apply Leave', icon: Calendar, color: '#1a56db', bg: '#EFF4FF' },
  { label: 'Attendance', icon: Clock, color: '#7c3aed', bg: '#f5f3ff' },
  { label: 'Payslip', icon: CreditCard, color: '#d97706', bg: '#fffbeb' },
  { label: 'Documents', icon: FileText, color: '#16a34a', bg: '#f0fdf4' },
  { label: 'Performance', icon: TrendingUp, color: '#0891b2', bg: '#ecfeff' },
  { label: 'Training', icon: BookOpen, color: '#db2777', bg: '#fdf2f8' },
  { label: 'Approvals', icon: CheckCircle, color: '#16a34a', bg: '#f0fdf4' },
  { label: 'More', icon: Zap, color: '#6b7280', bg: '#f3f4f6' },
]

const recentActivity = [
  { type: 'leave', text: 'Leave application approved', sub: 'May 10-14 · Earned Leave', status: 'approved', time: '2h ago' },
  { type: 'payroll', text: 'April payslip available', sub: 'Net Pay: ₹96,500', status: 'active', time: '1d ago' },
  { type: 'attendance', text: 'Attendance regularised', sub: 'Apr 22 · WFH approved', status: 'approved', time: '2d ago' },
  { type: 'training', text: 'Safety training due', sub: 'Complete by May 31', status: 'pending', time: '3d ago' },
]

export default function HRHome({ onBack, onNav }) {
  const [checkedIn, setCheckedIn] = useState(false)
  const [checkTime, setCheckTime] = useState(null)

  const handleCheckIn = () => {
    setCheckedIn(true)
    setCheckTime(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }))
  }

  return (
    <div className="fade-in">
      {/* Top Bar */}
      <div className="bg-white px-4 pt-12 pb-4" style={{ borderBottom: '1px solid #f3f4f6' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button onClick={onBack} className="text-xs px-2.5 py-1 rounded-lg mr-1" style={{ background: '#EFF4FF', color: '#1a56db', fontWeight: 500 }}>
              ← Orbit
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: '#f3f4f6' }}>
              <Search size={16} color="#6b7280" />
            </button>
            <button className="w-9 h-9 rounded-full flex items-center justify-center relative" style={{ background: '#f3f4f6' }}>
              <Bell size={16} color="#6b7280" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ background: '#dc2626' }} />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="px-4 py-4">
        <div className="rounded-2xl p-5 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a56db 0%, #1e40af 100%)' }}>
          <div className="absolute right-0 top-0 w-32 h-32 rounded-full opacity-10" style={{ background: '#fff', transform: 'translate(30%,-30%)' }} />
          <div className="flex items-start gap-3">
            <Avatar name="Harsh Verma" size={44} color="#fff" />
            <div className="flex-1">
              <p className="text-blue-200 text-xs font-medium">Good Morning 👋</p>
              <h2 className="text-white text-lg font-bold">Harsh Verma</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <MapPin size={11} color="rgba(255,255,255,0.6)" />
                <span className="text-xs text-blue-200">Mumbai HQ · Senior Engineer</span>
              </div>
            </div>
            <StatusBadge status="active" label="Active" />
          </div>

          {/* Check In/Out */}
          <div className="mt-4 p-3 rounded-xl flex items-center justify-between" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <div>
              <p className="text-blue-100 text-xs">Today's Status</p>
              <p className="text-white font-semibold text-sm mt-0.5">
                {checkedIn ? `Checked in at ${checkTime}` : 'Not checked in yet'}
              </p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-blue-200 text-xs">⏱ 0h 0m</span>
                <span className="text-blue-200 text-xs">📍 Office</span>
              </div>
            </div>
            <button
              onClick={handleCheckIn}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{ background: checkedIn ? 'rgba(220,38,38,0.2)' : '#fff', color: checkedIn ? '#fca5a5' : '#1a56db' }}
            >
              {checkedIn ? <LogOut size={15} /> : <LogIn size={15} />}
              {checkedIn ? 'Check Out' : 'Check In'}
            </button>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="px-4 mb-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Days Present', value: '18', sub: 'This month', color: '#16a34a' },
            { label: 'Leave Balance', value: '12', sub: 'Days available', color: '#d97706' },
            { label: 'Pending Tasks', value: '4', sub: 'Action needed', color: '#dc2626' },
          ].map(s => (
            <div key={s.label} className="card p-3 text-center">
              <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs font-medium text-gray-700 mt-0.5">{s.label}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm" style={{ color: '#111827' }}>Quick Actions</h3>
          <button className="text-xs font-medium" style={{ color: '#1a56db' }}>See all</button>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map(({ label, icon: Icon, color, bg }) => (
            <button key={label} className="flex flex-col items-center gap-1.5 p-2 rounded-xl" style={{ background: '#fff', border: '1px solid #f3f4f6' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                <Icon size={18} color={color} />
              </div>
              <span className="text-[10px] font-medium text-center leading-tight" style={{ color: '#374151' }}>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Pending Approvals Alert */}
      <div className="px-4 mb-4">
        <div className="rounded-xl p-4 flex items-center gap-3" style={{ background: '#fffbeb', border: '1px solid #fde68a' }}>
          <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#fef3c7' }}>
            <AlertCircle size={18} color="#d97706" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold" style={{ color: '#92400e' }}>2 Pending Approvals</p>
            <p className="text-xs mt-0.5" style={{ color: '#a16207' }}>Leave request & expense claim awaiting your action</p>
          </div>
          <button onClick={() => onNav('approvals')}>
            <ArrowRight size={18} color="#d97706" />
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm" style={{ color: '#111827' }}>Recent Activity</h3>
          <button className="text-xs font-medium" style={{ color: '#1a56db' }}>View all</button>
        </div>
        <div className="card divide-y divide-gray-100">
          {recentActivity.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#f3f4f6' }}>
                {item.type === 'leave' && <Calendar size={14} color="#1a56db" />}
                {item.type === 'payroll' && <CreditCard size={14} color="#d97706" />}
                {item.type === 'attendance' && <Clock size={14} color="#7c3aed" />}
                {item.type === 'training' && <BookOpen size={14} color="#16a34a" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: '#111827' }}>{item.text}</p>
                <p className="text-xs mt-0.5" style={{ color: '#6b7280' }}>{item.sub}</p>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <StatusBadge status={item.status} size="xs" />
                <span className="text-[10px]" style={{ color: '#9ca3af' }}>{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming */}
      <div className="px-4 mb-4">
        <h3 className="font-semibold text-sm mb-3" style={{ color: '#111827' }}>Upcoming This Week</h3>
        <div className="flex flex-col gap-2">
          {[
            { day: 'Mon', date: '26', event: 'Team Stand-up', time: '10:00 AM', color: '#1a56db' },
            { day: 'Wed', date: '28', event: 'Performance Review', time: '2:00 PM', color: '#7c3aed' },
            { day: 'Fri', date: '30', event: 'Safety Training Due', time: 'End of Day', color: '#d97706' },
          ].map(u => (
            <div key={u.date} className="card px-4 py-3 flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl flex flex-col items-center justify-center flex-shrink-0" style={{ background: u.color + '15' }}>
                <span className="text-[10px] font-medium" style={{ color: u.color }}>{u.day}</span>
                <span className="text-base font-bold" style={{ color: u.color }}>{u.date}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold" style={{ color: '#111827' }}>{u.event}</p>
                <p className="text-xs" style={{ color: '#6b7280' }}>{u.time}</p>
              </div>
              <ChevronRight size={16} color="#d1d5db" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
