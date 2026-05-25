import { BookOpen, Award, Clock, CheckCircle, AlertCircle, ChevronRight, Play } from 'lucide-react'
import Header from '../../components/Header'
import StatusBadge from '../../components/StatusBadge'
import ProgressBar from '../../components/ProgressBar'

const courses = [
  { title: 'Safety Training Module', category: 'Mandatory', due: 'May 31, 2026', progress: 40, status: 'inprogress', color: '#dc2626', duration: '4h' },
  { title: 'Leadership & Team Management', category: 'Development', due: 'Jun 30, 2026', progress: 0, status: 'notstarted', color: '#7c3aed', duration: '8h' },
  { title: 'Construction Quality Standards', category: 'Technical', due: 'Apr 30, 2026', progress: 100, status: 'completed', color: '#16a34a', duration: '6h' },
  { title: 'Project Management Fundamentals', category: 'Technical', due: 'Mar 31, 2026', progress: 100, status: 'completed', color: '#16a34a', duration: '10h' },
  { title: 'HR Policy Awareness', category: 'Compliance', due: 'Jun 15, 2026', progress: 65, status: 'inprogress', color: '#1a56db', duration: '2h' },
]

const certs = [
  { title: 'Construction Safety Leadership', issued: 'Apr 2026', expires: 'Apr 2028', id: 'CERT-2026-0412' },
  { title: 'Project Management Professional', issued: 'Mar 2026', expires: 'Mar 2029', id: 'CERT-2026-0318' },
]

export default function Training() {
  return (
    <div className="fade-in">
      <Header title="Training & Development" />

      {/* Stats */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-4 gap-2">
          {[['5','Total',[],'#1a56db'],['2','Completed','#16a34a'],['2','In Progress','#d97706'],['1','Mandatory','#dc2626']].map(([v,l,c])=>(
            <div key={l} className="card p-2.5 text-center">
              <p className="text-lg font-bold" style={{ color: c || '#111827' }}>{v}</p>
              <p className="text-[9px] leading-tight mt-0.5" style={{ color: '#6b7280' }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Overdue alert */}
      <div className="px-4 mb-4">
        <div className="rounded-xl p-3.5 flex items-center gap-3" style={{ background: '#fffbeb', border: '1px solid #fde68a' }}>
          <AlertCircle size={18} color="#d97706" />
          <div>
            <p className="text-xs font-semibold" style={{ color: '#92400e' }}>Safety Training Due in 6 days</p>
            <p className="text-xs mt-0.5" style={{ color: '#a16207' }}>Complete before May 31 to avoid non-compliance</p>
          </div>
        </div>
      </div>

      {/* Courses */}
      <div className="px-4 mb-4">
        <p className="font-semibold text-sm mb-3" style={{ color: '#111827' }}>My Learning Paths</p>
        <div className="flex flex-col gap-3">
          {courses.map((c, i) => (
            <div key={i} className="card p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0 pr-2">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: c.color+'15', color: c.color }}>{c.category}</span>
                    <span className="text-[10px]" style={{ color: '#9ca3af' }}>{c.duration}</span>
                  </div>
                  <p className="text-sm font-semibold" style={{ color: '#111827' }}>{c.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>Due: {c.due}</p>
                </div>
                <StatusBadge status={c.status} size="xs" />
              </div>
              {c.status !== 'completed' && (
                <>
                  <ProgressBar value={c.progress} color={c.color} />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs" style={{ color: '#6b7280' }}>{c.progress}% complete</span>
                    <button className="flex items-center gap-1 text-xs font-semibold" style={{ color: c.color }}>
                      <Play size={12} /> {c.progress > 0 ? 'Continue' : 'Start'}
                    </button>
                  </div>
                </>
              )}
              {c.status === 'completed' && (
                <div className="flex items-center gap-1 mt-1">
                  <CheckCircle size={13} color="#16a34a" />
                  <span className="text-xs" style={{ color: '#16a34a' }}>Completed</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Certificates */}
      <div className="px-4 mb-4">
        <p className="font-semibold text-sm mb-3" style={{ color: '#111827' }}>Certificates</p>
        <div className="flex flex-col gap-3">
          {certs.map((c, i) => (
            <div key={i} className="card p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#EFF4FF' }}>
                <Award size={22} color="#1a56db" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold" style={{ color: '#111827' }}>{c.title}</p>
                <p className="text-xs mt-0.5" style={{ color: '#6b7280' }}>Issued: {c.issued} · Expires: {c.expires}</p>
                <p className="text-[10px] mt-0.5 font-mono" style={{ color: '#9ca3af' }}>{c.id}</p>
              </div>
              <ChevronRight size={16} color="#d1d5db" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
