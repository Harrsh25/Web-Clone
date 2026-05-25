import { useState } from 'react'
import { FileText, Download, Upload, Search, Filter, FolderOpen, CheckCircle } from 'lucide-react'
import Header from '../../components/Header'
import StatusBadge from '../../components/StatusBadge'

const docs = [
  { name: 'Offer Letter', category: 'Employment', date: 'Jan 15, 2022', size: '245 KB', status: 'completed', type: 'PDF' },
  { name: 'Appointment Memo', category: 'Employment', date: 'Jan 20, 2022', size: '180 KB', status: 'completed', type: 'PDF' },
  { name: 'April 2026 Payslip', category: 'Payroll', date: 'May 1, 2026', size: '312 KB', status: 'completed', type: 'PDF' },
  { name: 'March 2026 Payslip', category: 'Payroll', date: 'Apr 1, 2026', size: '305 KB', status: 'completed', type: 'PDF' },
  { name: 'Form 16 (2025-26)', category: 'Tax', date: 'Jun 15, 2025', size: '890 KB', status: 'pending', type: 'PDF' },
  { name: 'Aadhaar Card', category: 'Identity', date: 'Jan 15, 2022', size: '1.2 MB', status: 'completed', type: 'PDF' },
  { name: 'PAN Card', category: 'Identity', date: 'Jan 15, 2022', size: '850 KB', status: 'completed', type: 'PDF' },
  { name: 'Safety Training Certificate', category: 'Training', date: 'Apr 10, 2026', size: '560 KB', status: 'completed', type: 'PDF' },
  { name: 'PF Statement', category: 'Finance', date: 'Mar 31, 2026', size: '420 KB', status: 'pending', type: 'PDF' },
]

const categories = ['All', 'Employment', 'Payroll', 'Tax', 'Identity', 'Training', 'Finance']
const colorMap = { Employment:'#1a56db', Payroll:'#7c3aed', Tax:'#d97706', Identity:'#dc2626', Training:'#16a34a', Finance:'#0891b2', Finance2:'#db2777' }

export default function Documents() {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All')

  const filtered = docs.filter(d =>
    (cat === 'All' || d.category === cat) &&
    d.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="fade-in">
      <Header title="Documents" rightIcon={
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold" style={{ background: '#1a56db', color: '#fff' }}>
          <Upload size={13} /> Upload
        </button>
      } />

      {/* Search */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ background: '#f3f4f6' }}>
          <Search size={16} color="#9ca3af" />
          <input className="flex-1 text-sm bg-transparent" placeholder="Search documents..." value={search} onChange={e => setSearch(e.target.value)} style={{ color: '#111827' }} />
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 px-4 mb-4 overflow-x-auto pb-1">
        {categories.map(c => (
          <button key={c} onClick={() => setCat(c)}
            className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0"
            style={{ background: cat===c ? '#1a56db' : '#f3f4f6', color: cat===c ? '#fff' : '#374151' }}>
            {c}
          </button>
        ))}
      </div>

      {/* Summary */}
      <div className="px-4 mb-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Total Docs', value: docs.length, color: '#1a56db', bg: '#EFF4FF' },
            { label: 'Uploaded', value: docs.filter(d=>d.status==='completed').length, color: '#16a34a', bg: '#f0fdf4' },
            { label: 'Pending', value: docs.filter(d=>d.status==='pending').length, color: '#d97706', bg: '#fffbeb' },
          ].map(s => (
            <div key={s.label} className="card p-3 text-center" style={{ border: `1px solid ${s.color}20` }}>
              <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs font-medium mt-0.5" style={{ color: '#374151' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Documents list */}
      <div className="px-4 flex flex-col gap-2">
        {filtered.map((doc, i) => (
          <div key={i} className="card px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: (colorMap[doc.category] || '#1a56db') + '15' }}>
              <FileText size={18} color={colorMap[doc.category] || '#1a56db'} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate" style={{ color: '#111827' }}>{doc.name}</p>
              <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>{doc.category} · {doc.size} · {doc.date}</p>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={doc.status} size="xs" />
              <button className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#f3f4f6' }}>
                <Download size={14} color="#6b7280" />
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <FolderOpen size={40} color="#d1d5db" className="mx-auto mb-3" />
            <p className="text-sm" style={{ color: '#9ca3af' }}>No documents found</p>
          </div>
        )}
      </div>
    </div>
  )
}
