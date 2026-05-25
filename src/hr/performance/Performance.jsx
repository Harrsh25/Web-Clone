import { useState } from 'react'
import { Target, Star, TrendingUp, Plus, CheckCircle } from 'lucide-react'
import Header from '../../components/Header'
import StatusBadge from '../../components/StatusBadge'
import ProgressBar from '../../components/ProgressBar'
import Avatar from '../../components/Avatar'

const goals = [
  { title: 'Deliver Metro Tower Phase 1', progress: 75, due: 'Jun 30, 2026', status: 'inprogress', priority: 'high' },
  { title: 'Complete Safety Certification', progress: 40, due: 'May 31, 2026', status: 'inprogress', priority: 'high' },
  { title: 'Mentor 2 Junior Engineers', progress: 100, due: 'Apr 30, 2026', status: 'completed', priority: 'medium' },
  { title: 'Submit Monthly Progress Reports', progress: 80, due: 'Ongoing', status: 'inprogress', priority: 'low' },
]

const reviews = [
  { period: 'Q1 2026', type: 'Quarterly Review', rating: 4.2, by: 'Sarah Chen', date: 'Apr 5, 2026', status: 'completed' },
  { period: 'Annual 2025', type: 'Annual Review', rating: 4.5, by: 'Priya Mehta', date: 'Jan 15, 2026', status: 'completed' },
  { period: 'Q2 2026', type: 'Quarterly Review', rating: null, by: 'Sarah Chen', date: 'Jul 5, 2026', status: 'pending' },
]

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(s => (
        <Star key={s} size={14} color={s <= Math.floor(rating) ? '#f59e0b' : '#e5e7eb'} fill={s <= Math.floor(rating) ? '#f59e0b' : 'none'} />
      ))}
      <span className="text-xs font-semibold ml-1" style={{ color: '#d97706' }}>{rating}</span>
    </div>
  )
}

export default function Performance() {
  const [tab, setTab] = useState('goals')

  return (
    <div className="fade-in">
      <Header title="Performance" />

      {/* Rating Card */}
      <div className="px-4 py-4">
        <div className="card p-4 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center" style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)' }}>
            <p className="text-white text-2xl font-bold">4.2</p>
            <p className="text-yellow-100 text-[10px]">/ 5.0</p>
          </div>
          <div>
            <p className="font-bold text-base" style={{ color: '#111827' }}>Overall Rating</p>
            <Stars rating={4.2} />
            <p className="text-xs mt-1" style={{ color: '#6b7280' }}>Based on Q1 2026 review · Above Average</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 bg-white px-4">
        {['goals','reviews','feedback'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="flex-1 py-3 text-sm font-medium capitalize"
            style={{ color: tab===t?'#1a56db':'#9ca3af', borderBottom: tab===t?'2px solid #1a56db':'2px solid transparent' }}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'goals' && (
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <p className="font-semibold text-sm" style={{ color: '#111827' }}>My Goals</p>
            <button className="flex items-center gap-1 text-xs font-semibold" style={{ color: '#1a56db' }}>
              <Plus size={14} /> Add Goal
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {goals.map((g, i) => (
              <div key={i} className="card p-4">
                <div className="flex items-start justify-between mb-2 gap-2">
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: '#111827' }}>{g.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>Due: {g.due}</p>
                  </div>
                  <StatusBadge status={g.priority} size="xs" />
                </div>
                <ProgressBar value={g.progress} color={g.status==='completed'?'#16a34a':'#1a56db'} showLabel />
                {g.status === 'completed' && (
                  <div className="flex items-center gap-1 mt-2">
                    <CheckCircle size={13} color="#16a34a" />
                    <span className="text-xs" style={{ color: '#16a34a' }}>Goal achieved!</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'reviews' && (
        <div className="px-4 py-4 flex flex-col gap-3">
          {reviews.map((r, i) => (
            <div key={i} className="card p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-xs font-medium" style={{ color: '#6b7280' }}>{r.period}</p>
                  <p className="text-sm font-semibold" style={{ color: '#111827' }}>{r.type}</p>
                </div>
                <StatusBadge status={r.status} size="xs" />
              </div>
              {r.rating && <Stars rating={r.rating} />}
              <div className="flex items-center gap-2 mt-2">
                <Avatar name={r.by} size={20} />
                <span className="text-xs" style={{ color: '#6b7280' }}>{r.by} · {r.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'feedback' && (
        <div className="px-4 py-4">
          <div className="card p-4 mb-4">
            <p className="font-semibold text-sm mb-3" style={{ color: '#111827' }}>Manager Feedback</p>
            <div className="p-3 rounded-xl" style={{ background: '#f9fafb' }}>
              <div className="flex items-center gap-2 mb-2">
                <Avatar name="Sarah Chen" size={28} />
                <span className="text-xs font-medium" style={{ color: '#374151' }}>Sarah Chen · Q1 Review</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>
                "Harsh has shown excellent technical skills and strong ownership of the Metro Tower project.
                Communication with stakeholders has improved significantly. Continue focusing on deadline management."
              </p>
            </div>
          </div>
          <div className="card p-4">
            <p className="font-semibold text-sm mb-3" style={{ color: '#111827' }}>Submit Self-Review</p>
            <textarea rows={4} placeholder="Describe your achievements, challenges, and growth areas..." className="w-full border rounded-xl px-3 py-2.5 text-sm resize-none" style={{ borderColor: '#e5e7eb', color: '#374151' }} />
            <button className="w-full mt-3 py-3 rounded-xl text-sm font-bold" style={{ background: '#1a56db', color: '#fff' }}>
              Submit Self-Review
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
