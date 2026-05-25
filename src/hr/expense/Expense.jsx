import { useState } from 'react'
import { Plus, Receipt, Upload, X } from 'lucide-react'
import Header from '../../components/Header'
import StatusBadge from '../../components/StatusBadge'

const claims = [
  { title: 'Client Dinner', type: 'Meal', amount: 2800, date: 'May 20', status: 'pending', receipt: true },
  { title: 'Bangalore Site Visit', type: 'Travel', amount: 12400, date: 'May 15', status: 'approved', receipt: true },
  { title: 'Safety Equipment', type: 'Equipment', amount: 5600, date: 'May 8', status: 'approved', receipt: true },
  { title: 'Team Lunch', type: 'Meal', amount: 3200, date: 'Apr 30', status: 'rejected', receipt: true },
  { title: 'Site Materials', type: 'Materials', amount: 8900, date: 'Apr 22', status: 'approved', receipt: false },
]

const typeColors = { Meal:'#d97706', Travel:'#1a56db', Equipment:'#7c3aed', Materials:'#16a34a' }

export default function Expense() {
  const [showForm, setShowForm] = useState(false)

  const total = claims.filter(c=>c.status==='approved').reduce((s,c)=>s+c.amount,0)
  const pending = claims.filter(c=>c.status==='pending').reduce((s,c)=>s+c.amount,0)

  return (
    <div className="fade-in">
      <Header title="Expense Claims" rightIcon={
        <button onClick={() => setShowForm(true)} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold" style={{ background: '#1a56db', color: '#fff' }}>
          <Plus size={13} /> New Claim
        </button>
      } />

      {/* Summary */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="card p-4" style={{ border: '1px solid #16a34a20' }}>
            <p className="text-xs" style={{ color: '#9ca3af' }}>Approved (YTD)</p>
            <p className="text-xl font-bold mt-1" style={{ color: '#16a34a' }}>₹{total.toLocaleString('en-IN')}</p>
          </div>
          <div className="card p-4" style={{ border: '1px solid #d9770620' }}>
            <p className="text-xs" style={{ color: '#9ca3af' }}>Pending Review</p>
            <p className="text-xl font-bold mt-1" style={{ color: '#d97706' }}>₹{pending.toLocaleString('en-IN')}</p>
          </div>
        </div>
      </div>

      {/* Claims list */}
      <div className="px-4 flex flex-col gap-3">
        {claims.map((c, i) => (
          <div key={i} className="card p-4">
            <div className="flex items-start justify-between mb-1">
              <div>
                <p className="text-sm font-semibold" style={{ color: '#111827' }}>{c.title}</p>
                <p className="text-xs mt-0.5" style={{ color: '#6b7280' }}>{c.date}</p>
              </div>
              <StatusBadge status={c.status} size="xs" />
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: (typeColors[c.type]||'#6b7280')+'15', color: typeColors[c.type]||'#6b7280' }}>
                {c.type}
              </span>
              <div className="flex items-center gap-3">
                {c.receipt && <div className="flex items-center gap-1"><Receipt size={12} color="#9ca3af" /><span className="text-xs" style={{ color: '#9ca3af' }}>Receipt</span></div>}
                <p className="font-bold" style={{ color: '#111827' }}>₹{c.amount.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Claim Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-end" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="w-full rounded-t-3xl bg-white px-5 pt-5 pb-8 slide-up" style={{ maxWidth: 430, margin: '0 auto' }}>
            <div className="flex items-center justify-between mb-5">
              <p className="font-bold text-base" style={{ color: '#111827' }}>New Expense Claim</p>
              <button onClick={() => setShowForm(false)}><X size={20} color="#6b7280" /></button>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#374151' }}>Expense Type</label>
                <select className="w-full border rounded-xl px-3 py-2.5 text-sm" style={{ borderColor: '#e5e7eb' }}>
                  {['Meal','Travel','Equipment','Materials','Other'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#374151' }}>Amount (₹)</label>
                <input type="number" placeholder="0.00" className="w-full border rounded-xl px-3 py-2.5 text-sm" style={{ borderColor: '#e5e7eb' }} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#374151' }}>Description</label>
                <input type="text" placeholder="Brief description..." className="w-full border rounded-xl px-3 py-2.5 text-sm" style={{ borderColor: '#e5e7eb' }} />
              </div>
              <button className="w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium" style={{ background: '#f3f4f6', color: '#374151' }}>
                <Upload size={16} /> Attach Receipt
              </button>
              <button onClick={() => setShowForm(false)} className="w-full py-3.5 rounded-xl text-sm font-bold" style={{ background: '#1a56db', color: '#fff' }}>
                Submit Claim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
