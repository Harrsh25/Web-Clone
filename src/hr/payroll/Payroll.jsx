import { useState } from 'react'
import { Download, TrendingUp, CreditCard, ChevronDown, ChevronUp } from 'lucide-react'
import Header from '../../components/Header'

const months = ['April 2026','March 2026','February 2026','January 2026','December 2025','November 2025']

const breakdown = {
  earnings: [
    { label: 'Basic Salary', amount: 65000 },
    { label: 'HRA', amount: 26000 },
    { label: 'Project Allowance', amount: 8000 },
    { label: 'Transport Allowance', amount: 3200 },
    { label: 'Medical Allowance', amount: 1500 },
  ],
  deductions: [
    { label: 'PF (Employee)', amount: 7800 },
    { label: 'ESI Contribution', amount: 1200 },
    { label: 'TDS Deduction', amount: 4800 },
    { label: 'Salary Advance EMI', amount: 3400 },
  ]
}

export default function Payroll() {
  const [selected, setSelected] = useState(0)
  const [showDetails, setShowDetails] = useState(false)

  const gross = breakdown.earnings.reduce((s,e) => s+e.amount, 0)
  const deductions = breakdown.deductions.reduce((s,e) => s+e.amount, 0)
  const net = gross - deductions

  return (
    <div className="fade-in">
      <Header title="Payroll & Payslip" />

      {/* Net Pay Hero */}
      <div className="px-4 py-4">
        <div className="rounded-2xl p-5 relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#1a56db,#1e40af)' }}>
          <div className="absolute right-0 top-0 w-32 h-32 rounded-full opacity-10" style={{ background: '#fff', transform: 'translate(30%,-30%)' }} />
          <p className="text-blue-200 text-xs mb-1">{months[selected]}</p>
          <p className="text-white/70 text-sm">Net Pay</p>
          <p className="text-white text-4xl font-bold mt-1">₹{net.toLocaleString('en-IN')}</p>
          <div className="flex gap-4 mt-3">
            <div><p className="text-blue-200 text-xs">Gross Pay</p><p className="text-white text-sm font-semibold">₹{gross.toLocaleString('en-IN')}</p></div>
            <div><p className="text-blue-200 text-xs">Deductions</p><p className="text-white text-sm font-semibold">₹{deductions.toLocaleString('en-IN')}</p></div>
          </div>
          <button className="mt-4 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}>
            <Download size={15} /> Download Payslip
          </button>
        </div>
      </div>

      {/* Month selector */}
      <div className="px-4 mb-4">
        <p className="text-xs font-semibold mb-2" style={{ color: '#374151' }}>Select Month</p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {months.map((m, i) => (
            <button key={m} onClick={() => setSelected(i)}
              className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0"
              style={{ background: selected===i ? '#1a56db' : '#f3f4f6', color: selected===i ? '#fff' : '#374151' }}>
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Breakdown */}
      <div className="px-4 mb-4">
        <button onClick={() => setShowDetails(!showDetails)}
          className="card w-full p-4 flex items-center justify-between text-left">
          <p className="font-semibold text-sm" style={{ color: '#111827' }}>Salary Breakdown</p>
          {showDetails ? <ChevronUp size={18} color="#6b7280" /> : <ChevronDown size={18} color="#6b7280" />}
        </button>

        {showDetails && (
          <div className="card mt-2 overflow-hidden">
            <div className="px-4 py-3" style={{ borderBottom: '1px solid #f3f4f6' }}>
              <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6b7280' }}>Earnings</p>
              {breakdown.earnings.map(e => (
                <div key={e.label} className="flex justify-between py-2" style={{ borderBottom: '1px solid #f9fafb' }}>
                  <span className="text-sm" style={{ color: '#374151' }}>{e.label}</span>
                  <span className="text-sm font-medium" style={{ color: '#111827' }}>₹{e.amount.toLocaleString('en-IN')}</span>
                </div>
              ))}
              <div className="flex justify-between pt-2 mt-1">
                <span className="text-sm font-semibold" style={{ color: '#111827' }}>Gross Total</span>
                <span className="text-sm font-bold" style={{ color: '#16a34a' }}>₹{gross.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <div className="px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#6b7280' }}>Deductions</p>
              {breakdown.deductions.map(d => (
                <div key={d.label} className="flex justify-between py-2" style={{ borderBottom: '1px solid #f9fafb' }}>
                  <span className="text-sm" style={{ color: '#374151' }}>{d.label}</span>
                  <span className="text-sm font-medium" style={{ color: '#dc2626' }}>- ₹{d.amount.toLocaleString('en-IN')}</span>
                </div>
              ))}
              <div className="flex justify-between pt-2 mt-1">
                <span className="text-sm font-semibold" style={{ color: '#111827' }}>Total Deductions</span>
                <span className="text-sm font-bold" style={{ color: '#dc2626' }}>₹{deductions.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <div className="px-4 py-4 flex justify-between" style={{ background: '#EFF4FF', borderTop: '2px solid #1a56db22' }}>
              <span className="font-bold" style={{ color: '#111827' }}>Net Pay</span>
              <span className="font-bold text-lg" style={{ color: '#1a56db' }}>₹{net.toLocaleString('en-IN')}</span>
            </div>
          </div>
        )}
      </div>

      {/* Salary History chart placeholder */}
      <div className="px-4 mb-4">
        <div className="card p-4">
          <div className="flex items-center justify-between mb-4">
            <p className="font-semibold text-sm" style={{ color: '#111827' }}>Salary History</p>
            <TrendingUp size={18} color="#16a34a" />
          </div>
          <div className="flex items-end gap-2 h-20">
            {[82000,88000,88000,92000,96500,96500].map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-lg" style={{ height: `${(v/100000)*100}%`, background: i===5?'#1a56db':'#EFF4FF', minHeight: 8 }} />
                <span className="text-[8px]" style={{ color: '#9ca3af' }}>{['N','D','J','F','M','A'][i]}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: '1px solid #f3f4f6' }}>
            <p className="text-xs" style={{ color: '#6b7280' }}>Annual Increment: +15%</p>
            <span className="text-xs font-medium" style={{ color: '#16a34a' }}>↑ ₹14,500 growth</span>
          </div>
        </div>
      </div>

      {/* Tax */}
      <div className="px-4 mb-4">
        <div className="card p-4">
          <p className="font-semibold text-sm mb-3" style={{ color: '#111827' }}>Tax Overview FY 2025-26</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Tax Liability', value: '₹57,600', color: '#dc2626' },
              { label: 'Tax Paid (YTD)', value: '₹38,400', color: '#1a56db' },
              { label: 'HRA Exemption', value: '₹1,56,000', color: '#16a34a' },
              { label: 'Section 80C', value: '₹1,50,000', color: '#d97706' },
            ].map(t => (
              <div key={t.label} className="p-3 rounded-xl" style={{ background: '#f9fafb' }}>
                <p className="text-xs" style={{ color: '#9ca3af' }}>{t.label}</p>
                <p className="font-bold mt-0.5" style={{ color: t.color }}>{t.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
