import { Users, Zap, ChevronRight, Building2, BarChart3, Clock } from 'lucide-react'

export default function Landing({ onSelect }) {
  return (
    <div className="mobile-shell" style={{ background: 'linear-gradient(160deg,#0f172a 0%,#1e3a6e 60%,#1a56db 100%)', minHeight: '100svh' }}>
      {/* Header */}
      <div className="px-6 pt-14 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <Building2 size={16} color="#fff" />
          </div>
          <span className="text-white/70 text-sm font-medium tracking-wide">WorkSphere</span>
        </div>
        <h1 className="text-white text-3xl font-bold mt-6 leading-tight">
          Your Workspace,<br />
          <span style={{ color: '#93c5fd' }}>Unified.</span>
        </h1>
        <p className="text-white/60 text-sm mt-2">Choose your orbit to get started</p>
      </div>

      {/* Orbit Cards */}
      <div className="px-5 flex flex-col gap-4 pb-10">
        {/* HR Orbit */}
        <button
          onClick={() => onSelect('hr')}
          className="w-full text-left rounded-2xl p-5 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1a56db 0%, #1e40af 100%)', boxShadow: '0 8px 32px rgba(26,86,219,0.4)' }}
        >
          <div className="absolute right-0 top-0 w-40 h-40 rounded-full opacity-10" style={{ background: '#fff', transform: 'translate(30%, -30%)' }} />
          <div className="absolute right-4 bottom-0 w-24 h-24 rounded-full opacity-10" style={{ background: '#93c5fd', transform: 'translateY(30%)' }} />

          <div className="flex items-start justify-between relative z-10">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
                <Users size={24} color="#fff" />
              </div>
              <h2 className="text-white text-xl font-bold mb-1">HR Orbit</h2>
              <p className="text-blue-200 text-sm leading-relaxed">
                People management, leave, payroll,<br />attendance & more
              </p>
            </div>
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center mt-1">
              <ChevronRight size={20} color="#fff" />
            </div>
          </div>

          <div className="flex gap-2 mt-4 relative z-10">
            {['Leave', 'Payroll', 'Attendance', 'Approvals'].map(m => (
              <span key={m} className="text-xs px-2 py-1 rounded-full text-blue-100" style={{ background: 'rgba(255,255,255,0.15)' }}>{m}</span>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-4 pt-4 relative z-10" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
            <div className="flex items-center gap-1.5">
              <BarChart3 size={14} color="rgba(255,255,255,0.7)" />
              <span className="text-white/70 text-xs">14 Modules</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users size={14} color="rgba(255,255,255,0.7)" />
              <span className="text-white/70 text-xs">Employee Self-Service</span>
            </div>
          </div>
        </button>

        {/* Productivity Orbit */}
        <button
          onClick={() => onSelect('wfm')}
          className="w-full text-left rounded-2xl p-5 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)', boxShadow: '0 8px 32px rgba(124,58,237,0.4)' }}
        >
          <div className="absolute right-0 top-0 w-40 h-40 rounded-full opacity-10" style={{ background: '#fff', transform: 'translate(30%, -30%)' }} />
          <div className="absolute right-4 bottom-0 w-24 h-24 rounded-full opacity-10" style={{ background: '#c4b5fd', transform: 'translateY(30%)' }} />

          <div className="flex items-start justify-between relative z-10">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
                <Zap size={24} color="#fff" />
              </div>
              <h2 className="text-white text-xl font-bold mb-1">Productivity Orbit</h2>
              <p className="text-purple-200 text-sm leading-relaxed">
                Projects, tasks, timesheets,<br />shifts & workforce management
              </p>
            </div>
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center mt-1">
              <ChevronRight size={20} color="#fff" />
            </div>
          </div>

          <div className="flex gap-2 mt-4 relative z-10 flex-wrap">
            {['Projects', 'Tasks', 'Timesheet', 'Shifts'].map(m => (
              <span key={m} className="text-xs px-2 py-1 rounded-full text-purple-100" style={{ background: 'rgba(255,255,255,0.15)' }}>{m}</span>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-4 pt-4 relative z-10" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
            <div className="flex items-center gap-1.5">
              <Zap size={14} color="rgba(255,255,255,0.7)" />
              <span className="text-white/70 text-xs">8 Modules</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} color="rgba(255,255,255,0.7)" />
              <span className="text-white/70 text-xs">Workforce Analytics</span>
            </div>
          </div>
        </button>

        {/* Info */}
        <div className="rounded-xl p-4 flex items-center gap-3" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
            <Building2 size={16} color="rgba(255,255,255,0.8)" />
          </div>
          <div>
            <p className="text-white text-sm font-medium">Harsh Verma</p>
            <p className="text-white/50 text-xs">Senior Engineer · Mumbai HQ</p>
          </div>
          <div className="ml-auto">
            <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ background: 'rgba(22,163,74,0.25)', color: '#4ade80' }}>Active</span>
          </div>
        </div>
      </div>
    </div>
  )
}
