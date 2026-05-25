import { useState } from 'react'
import {
  CreditCard, FileText, TrendingUp, Users, BookOpen, Award,
  Heart, Receipt, ChevronRight, ArrowLeft, X
} from 'lucide-react'
import Payroll from './payroll/Payroll'
import Documents from './documents/Documents'
import Training from './training/Training'
import Performance from './performance/Performance'
import Recruitment from './recruitment/Recruitment'
import HRAnalytics from './analytics/HRAnalytics'
import Profile from './profile/Profile'
import Onboarding from './onboarding/Onboarding'
import Benefits from './benefits/Benefits'
import Expense from './expense/Expense'

const modules = [
  { key: 'payroll', label: 'Payroll & Payslip', icon: CreditCard, color: '#d97706', bg: '#fffbeb', sub: 'Salary, deductions, tax' },
  { key: 'documents', label: 'Documents', icon: FileText, color: '#1a56db', bg: '#EFF4FF', sub: 'Offer letter, payslips, ID' },
  { key: 'performance', label: 'Performance', icon: TrendingUp, color: '#7c3aed', bg: '#f5f3ff', sub: 'Goals, reviews, ratings' },
  { key: 'training', label: 'Training', icon: BookOpen, color: '#16a34a', bg: '#f0fdf4', sub: 'Courses, certificates' },
  { key: 'recruitment', label: 'Recruitment', icon: Users, color: '#0891b2', bg: '#ecfeff', sub: 'Openings, candidates' },
  { key: 'analytics', label: 'HR Analytics', icon: Award, color: '#dc2626', bg: '#fef2f2', sub: 'Attendance, leave trends' },
  { key: 'profile', label: 'My Profile', icon: Award, color: '#374151', bg: '#f3f4f6', sub: 'Personal & employment info' },
  { key: 'onboarding', label: 'Onboarding', icon: Users, color: '#db2777', bg: '#fdf2f8', sub: 'New joiners, checklist' },
  { key: 'benefits', label: 'Benefits', icon: Heart, color: '#dc2626', bg: '#fef2f2', sub: 'PF, insurance, gratuity' },
  { key: 'expense', label: 'Expenses', icon: Receipt, color: '#d97706', bg: '#fffbeb', sub: 'Claims, reimbursements' },
]

export default function MoreMenu({ onBack }) {
  const [active, setActive] = useState(null)

  if (active === 'payroll')     return <BackWrap onBack={()=>setActive(null)}><Payroll /></BackWrap>
  if (active === 'documents')   return <BackWrap onBack={()=>setActive(null)}><Documents /></BackWrap>
  if (active === 'performance') return <BackWrap onBack={()=>setActive(null)}><Performance /></BackWrap>
  if (active === 'training')    return <BackWrap onBack={()=>setActive(null)}><Training /></BackWrap>
  if (active === 'recruitment') return <BackWrap onBack={()=>setActive(null)}><Recruitment /></BackWrap>
  if (active === 'analytics')   return <BackWrap onBack={()=>setActive(null)}><HRAnalytics /></BackWrap>
  if (active === 'profile')     return <BackWrap onBack={()=>setActive(null)}><Profile onBack={onBack} /></BackWrap>
  if (active === 'onboarding')  return <BackWrap onBack={()=>setActive(null)}><Onboarding /></BackWrap>
  if (active === 'benefits')    return <BackWrap onBack={()=>setActive(null)}><Benefits /></BackWrap>
  if (active === 'expense')     return <BackWrap onBack={()=>setActive(null)}><Expense /></BackWrap>

  return (
    <div className="fade-in">
      <div className="bg-white px-4 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid #f3f4f6' }}>
        <h1 className="text-base font-semibold" style={{ color: '#111827' }}>All HR Modules</h1>
        <button onClick={onBack} className="text-xs px-3 py-1.5 rounded-lg font-medium" style={{ background: '#EFF4FF', color: '#1a56db' }}>← Orbit</button>
      </div>

      <div className="px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          {modules.map(m => (
            <button key={m.key} onClick={() => setActive(m.key)}
              className="card p-4 text-left flex flex-col gap-2 active:scale-95 transition-transform">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: m.bg }}>
                <m.icon size={20} color={m.color} />
              </div>
              <div>
                <p className="text-sm font-semibold leading-tight" style={{ color: '#111827' }}>{m.label}</p>
                <p className="text-[10px] mt-0.5 leading-tight" style={{ color: '#9ca3af' }}>{m.sub}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function BackWrap({ children, onBack }) {
  return (
    <div className="relative">
      <button onClick={onBack} className="absolute top-3 left-4 z-10 flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg" style={{ background: '#f3f4f6', color: '#374151' }}>
        <ArrowLeft size={13} /> Back
      </button>
      {children}
    </div>
  )
}
