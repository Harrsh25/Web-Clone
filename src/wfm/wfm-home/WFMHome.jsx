import {
  Bell, Search, Zap, MapPin, FolderOpen, CheckSquare, Clock,
  TrendingUp, Users, AlertCircle, ArrowRight, ChevronRight, BarChart2
} from 'lucide-react'
import StatusBadge from '../../components/StatusBadge'
import Avatar from '../../components/Avatar'
import ProgressBar from '../../components/ProgressBar'

const activeProjects = [
  { name: 'Metro Tower Complex', progress: 68, due: 'Aug 2026', status: 'inprogress', priority: 'high' },
  { name: 'Solar Farm Installation', progress: 42, due: 'Oct 2026', status: 'inprogress', priority: 'medium' },
]

const myTasks = [
  { title: 'Foundation Layout Review', project: 'Metro Tower', due: 'May 27', priority: 'high' },
  { title: 'Safety Checklist Submission', project: 'Solar Farm', due: 'May 28', priority: 'medium' },
  { title: 'Weekly Progress Report', project: 'Metro Tower', due: 'May 30', priority: 'low' },
]

export default function WFMHome({ onBack, onNav }) {
  return (
    <div className="fade-in">
      {/* Top Bar */}
      <div className="bg-white px-4 pt-12 pb-4" style={{ borderBottom: '1px solid #f3f4f6' }}>
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="text-xs px-2.5 py-1 rounded-lg" style={{ background: '#f5f3ff', color: '#7c3aed', fontWeight: 500 }}>
            ← Orbit
          </button>
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

      {/* Hero */}
      <div className="px-4 py-4">
        <div className="rounded-2xl p-5 relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#7c3aed,#5b21b6)' }}>
          <div className="absolute right-0 top-0 w-32 h-32 rounded-full opacity-10" style={{ background: '#fff', transform: 'translate(30%,-30%)' }} />
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
              <Zap size={22} color="#fff" />
            </div>
            <div>
              <p className="text-purple-200 text-xs">Productivity Orbit</p>
              <h2 className="text-white text-lg font-bold">Harsh Verma</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <MapPin size={11} color="rgba(255,255,255,0.6)" />
                <span className="text-xs text-purple-200">Metro Tower Site · Site Engineer</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
            {[['2','Active Projects'],['8','Open Tasks'],['5h 20m','Time Today']].map(([v,l])=>(
              <div key={l} className="text-center">
                <p className="text-white font-bold text-lg">{v}</p>
                <p className="text-purple-200 text-[10px] leading-tight">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="px-4 mb-4">
        <p className="font-semibold text-sm mb-3" style={{ color: '#111827' }}>Quick Actions</p>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'New Task', icon: CheckSquare, color: '#7c3aed', bg: '#f5f3ff', nav: 'tasks' },
            { label: 'Log Time', icon: Clock, color: '#1a56db', bg: '#EFF4FF', nav: 'timesheet' },
            { label: 'Projects', icon: FolderOpen, color: '#16a34a', bg: '#f0fdf4', nav: 'projects' },
            { label: 'Analytics', icon: BarChart2, color: '#d97706', bg: '#fffbeb', nav: 'more' },
          ].map(({ label, icon: Icon, color, bg, nav }) => (
            <button key={label} onClick={() => onNav(nav)} className="flex flex-col items-center gap-1.5 p-2 rounded-xl" style={{ background: '#fff', border: '1px solid #f3f4f6' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                <Icon size={18} color={color} />
              </div>
              <span className="text-[10px] font-medium" style={{ color: '#374151' }}>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Projects */}
      <div className="px-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold text-sm" style={{ color: '#111827' }}>Active Projects</p>
          <button onClick={() => onNav('projects')} className="text-xs font-medium" style={{ color: '#7c3aed' }}>View all</button>
        </div>
        <div className="flex flex-col gap-3">
          {activeProjects.map((p, i) => (
            <div key={i} className="card p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#111827' }}>{p.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>Due: {p.due}</p>
                </div>
                <StatusBadge status={p.priority} size="xs" />
              </div>
              <ProgressBar value={p.progress} color="#7c3aed" />
              <div className="flex justify-between mt-1.5">
                <span className="text-xs" style={{ color: '#6b7280' }}>{p.progress}% complete</span>
                <StatusBadge status={p.status} size="xs" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* My Tasks */}
      <div className="px-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold text-sm" style={{ color: '#111827' }}>My Tasks Today</p>
          <button onClick={() => onNav('tasks')} className="text-xs font-medium" style={{ color: '#7c3aed' }}>View all</button>
        </div>
        <div className="card divide-y divide-gray-50">
          {myTasks.map((t, i) => (
            <div key={i} className="flex items-start gap-3 p-3.5">
              <div className="w-5 h-5 rounded border-2 mt-0.5 flex-shrink-0" style={{ borderColor: '#7c3aed' }} />
              <div className="flex-1">
                <p className="text-sm font-medium" style={{ color: '#111827' }}>{t.title}</p>
                <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>{t.project} · Due {t.due}</p>
              </div>
              <StatusBadge status={t.priority} size="xs" />
            </div>
          ))}
        </div>
      </div>

      {/* Alert */}
      <div className="px-4 mb-4">
        <div className="rounded-xl p-4 flex items-center gap-3" style={{ background: '#fef2f2', border: '1px solid #fecaca' }}>
          <AlertCircle size={18} color="#dc2626" />
          <div className="flex-1">
            <p className="text-sm font-semibold" style={{ color: '#991b1b' }}>Timesheet Overdue</p>
            <p className="text-xs mt-0.5" style={{ color: '#b91c1c' }}>Week 17 timesheet not submitted. Due yesterday.</p>
          </div>
          <button onClick={() => onNav('timesheet')}>
            <ArrowRight size={18} color="#dc2626" />
          </button>
        </div>
      </div>
    </div>
  )
}
