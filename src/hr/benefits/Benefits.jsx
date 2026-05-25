import { Heart, Shield, PiggyBank, DollarSign, ChevronRight, CheckCircle } from 'lucide-react'
import Header from '../../components/Header'
import ProgressBar from '../../components/ProgressBar'

const benefits = [
  { title: 'Medical Insurance', icon: Heart, color: '#dc2626', bg: '#fef2f2', value: '₹5,00,000', sub: 'Family floater · Active', enrolled: true },
  { title: 'Provident Fund', icon: PiggyBank, color: '#1a56db', bg: '#EFF4FF', value: '₹7,800/mo', sub: 'Employee contribution', enrolled: true },
  { title: 'Life Insurance', icon: Shield, color: '#7c3aed', bg: '#f5f3ff', value: '₹50,00,000', sub: 'Sum assured · Active', enrolled: true },
  { title: 'Gratuity', icon: DollarSign, color: '#16a34a', bg: '#f0fdf4', value: '₹1,08,000', sub: 'Accrued (4.3 yrs)', enrolled: true },
]

export default function Benefits() {
  return (
    <div className="fade-in">
      <Header title="Benefits" />

      {/* Summary */}
      <div className="px-4 py-4">
        <div className="rounded-2xl p-4" style={{ background: 'linear-gradient(135deg,#1a56db,#1e40af)' }}>
          <p className="text-blue-200 text-xs mb-1">Benefits Enrollment Status</p>
          <p className="text-white text-2xl font-bold">4/4 <span className="text-base font-normal text-blue-200">Benefits Active</span></p>
          <div className="mt-3 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }}>
            <div className="h-full rounded-full" style={{ width: '100%', background: '#4ade80' }} />
          </div>
          <p className="text-blue-200 text-xs mt-1">All benefits enrolled · Next review: Jan 2027</p>
        </div>
      </div>

      {/* Benefits cards */}
      <div className="px-4 flex flex-col gap-3 mb-4">
        {benefits.map((b, i) => (
          <div key={i} className="card p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: b.bg }}>
              <b.icon size={22} color={b.color} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold" style={{ color: '#111827' }}>{b.title}</p>
              <p className="text-xs mt-0.5" style={{ color: '#6b7280' }}>{b.sub}</p>
              <p className="font-bold mt-1" style={{ color: b.color }}>{b.value}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              {b.enrolled && <CheckCircle size={18} color="#16a34a" />}
              <ChevronRight size={16} color="#d1d5db" />
            </div>
          </div>
        ))}
      </div>

      {/* PF Details */}
      <div className="px-4 mb-4">
        <div className="card p-4">
          <p className="font-semibold text-sm mb-3" style={{ color: '#111827' }}>Provident Fund Details</p>
          <div className="flex flex-col divide-y divide-gray-50">
            {[
              { label: 'UAN Number', value: '100456789012' },
              { label: 'PF Account', value: 'MH/BAN/12345/000/000001' },
              { label: 'Employee Contribution', value: '₹7,800 / month (12%)' },
              { label: 'Employer Contribution', value: '₹7,800 / month (12%)' },
              { label: 'Total Balance (Approx)', value: '₹4,02,400' },
            ].map(d => (
              <div key={d.label} className="flex justify-between py-2.5">
                <span className="text-xs" style={{ color: '#9ca3af' }}>{d.label}</span>
                <span className="text-xs font-medium" style={{ color: '#374151' }}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
