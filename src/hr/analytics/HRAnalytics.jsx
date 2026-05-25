import { TrendingUp, Users, Calendar, Clock, BarChart2 } from 'lucide-react'
import Header from '../../components/Header'
import ProgressBar from '../../components/ProgressBar'

const deptData = [
  { dept: 'Engineering', present: 48, total: 52, rate: 92 },
  { dept: 'Operations', present: 38, total: 44, rate: 86 },
  { dept: 'Finance', present: 22, total: 24, rate: 92 },
  { dept: 'HR', present: 12, total: 14, rate: 86 },
  { dept: 'Safety', present: 18, total: 21, rate: 86 },
]

const leaveUtilization = [
  { type: 'Casual Leave', used: 340, total: 600, color: '#1a56db' },
  { type: 'Earned Leave', used: 720, total: 1200, color: '#7c3aed' },
  { type: 'Sick Leave', used: 180, total: 360, color: '#dc2626' },
]

export default function HRAnalytics() {
  return (
    <div className="fade-in">
      <Header title="HR Analytics" />

      {/* KPI Row */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Overall Attendance', value: '87.4%', sub: '↑ 2.1% vs last month', color: '#16a34a', icon: Clock },
            { label: 'Active Employees', value: '148', sub: '3 on leave today', color: '#1a56db', icon: Users },
            { label: 'Leave Utilization', value: '62%', sub: 'Of annual quota used', color: '#d97706', icon: Calendar },
            { label: 'Attrition Rate', value: '3.2%', sub: '↓ 0.5% improvement', color: '#7c3aed', icon: TrendingUp },
          ].map(k => (
            <div key={k.label} className="card p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: k.color+'15' }}>
                  <k.icon size={16} color={k.color} />
                </div>
                <span className="font-bold text-xl" style={{ color: k.color }}>{k.value}</span>
              </div>
              <p className="text-xs font-semibold" style={{ color: '#374151' }}>{k.label}</p>
              <p className="text-[10px] mt-0.5" style={{ color: '#9ca3af' }}>{k.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Attendance Trend */}
      <div className="px-4 mb-4">
        <div className="card p-4">
          <p className="font-semibold text-sm mb-4" style={{ color: '#111827' }}>Weekly Attendance Trend</p>
          <div className="flex items-end gap-1.5 h-24">
            {[
              {d:'Mon',v:92},{d:'Tue',v:88},{d:'Wed',v:95},{d:'Thu',v:82},{d:'Fri',v:90},{d:'Sat',v:40},{d:'Sun',v:5}
            ].map(({d,v}) => (
              <div key={d} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9px]" style={{ color: '#9ca3af' }}>{v}%</span>
                <div className="w-full rounded-t-md" style={{ height: `${v}%`, background: v>85?'#16a34a':v>60?'#1a56db':'#e5e7eb', minHeight: 4 }} />
                <span className="text-[9px]" style={{ color: '#9ca3af' }}>{d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department Attendance */}
      <div className="px-4 mb-4">
        <div className="card p-4">
          <p className="font-semibold text-sm mb-3" style={{ color: '#111827' }}>Department Attendance</p>
          <div className="flex flex-col gap-3">
            {deptData.map(d => (
              <div key={d.dept}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium" style={{ color: '#374151' }}>{d.dept}</span>
                  <span className="text-xs" style={{ color: d.rate>=90?'#16a34a':'#d97706' }}>{d.present}/{d.total} · {d.rate}%</span>
                </div>
                <ProgressBar value={d.present} max={d.total} color={d.rate>=90?'#16a34a':'#d97706'} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leave Utilization */}
      <div className="px-4 mb-4">
        <div className="card p-4">
          <p className="font-semibold text-sm mb-3" style={{ color: '#111827' }}>Leave Utilization (Company-wide)</p>
          <div className="flex flex-col gap-3">
            {leaveUtilization.map(l => (
              <div key={l.type}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium" style={{ color: '#374151' }}>{l.type}</span>
                  <span className="text-xs font-medium" style={{ color: l.color }}>{Math.round(l.used/l.total*100)}%</span>
                </div>
                <ProgressBar value={l.used} max={l.total} color={l.color} />
                <p className="text-[10px] mt-0.5" style={{ color: '#9ca3af' }}>{l.used} of {l.total} days used</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Headcount */}
      <div className="px-4 mb-4">
        <div className="card p-4">
          <p className="font-semibold text-sm mb-3" style={{ color: '#111827' }}>Headcount Summary</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Total Employees', value: '152', color: '#1a56db' },
              { label: 'New Joiners (May)', value: '4', color: '#16a34a' },
              { label: 'On Probation', value: '8', color: '#d97706' },
              { label: 'Resigned (YTD)', value: '5', color: '#dc2626' },
            ].map(h => (
              <div key={h.label} className="p-3 rounded-xl" style={{ background: '#f9fafb' }}>
                <p className="text-2xl font-bold" style={{ color: h.color }}>{h.value}</p>
                <p className="text-xs mt-0.5" style={{ color: '#6b7280' }}>{h.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
