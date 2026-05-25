import { useState } from 'react'
import { Edit, Mail, Phone, MapPin, Briefcase, ChevronRight, Shield, Bell, LogOut, User, Calendar } from 'lucide-react'
import Header from '../../components/Header'
import Avatar from '../../components/Avatar'

const details = [
  { label: 'Employee Code', value: 'EMP-2022-047' },
  { label: 'Date of Joining', value: 'Jan 15, 2022' },
  { label: 'Department', value: 'Engineering' },
  { label: 'Designation', value: 'Senior Engineer' },
  { label: 'Location', value: 'Mumbai HQ' },
  { label: 'Manager', value: 'Sarah Chen' },
  { label: 'Employee Type', value: 'Full-time' },
  { label: 'Grade', value: 'E3' },
]

const menuItems = [
  { label: 'Edit Profile', icon: User, color: '#1a56db' },
  { label: 'Notification Settings', icon: Bell, color: '#7c3aed' },
  { label: 'Privacy & Security', icon: Shield, color: '#16a34a' },
  { label: 'Leave & Attendance Policy', icon: Calendar, color: '#d97706' },
]

export default function Profile({ onBack }) {
  const [tab, setTab] = useState('info')

  return (
    <div className="fade-in">
      <Header title="My Profile" />

      {/* Profile Header */}
      <div className="px-4 py-5" style={{ background: 'linear-gradient(180deg, #1a56db 0%, #1e40af 100%)' }}>
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold mb-3" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', border: '3px solid rgba(255,255,255,0.4)' }}>
            HV
          </div>
          <h2 className="text-white text-xl font-bold">Harsh Verma</h2>
          <p className="text-blue-200 text-sm mt-0.5">Senior Engineer</p>
          <div className="flex items-center gap-1.5 mt-1">
            <MapPin size={12} color="rgba(255,255,255,0.6)" />
            <span className="text-xs text-blue-200">Mumbai HQ</span>
          </div>
          <div className="flex gap-3 mt-4">
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}>
              <Edit size={13} /> Edit Profile
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}>
              <Mail size={13} /> Message
            </button>
          </div>
        </div>
      </div>

      {/* Contact row */}
      <div className="flex border-b border-gray-100 bg-white">
        {['info','documents','settings'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="flex-1 py-3 text-sm font-medium capitalize"
            style={{ color: tab===t?'#1a56db':'#9ca3af', borderBottom: tab===t?'2px solid #1a56db':'2px solid transparent' }}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'info' && (
        <div className="px-4 py-4">
          {/* Contact */}
          <div className="card p-4 mb-4">
            <p className="font-semibold text-sm mb-3" style={{ color: '#111827' }}>Contact Info</p>
            {[
              { icon: Mail, label: 'harsh.verma@worksphere.com', color: '#1a56db' },
              { icon: Phone, label: '+91 98765 43210', color: '#16a34a' },
              { icon: MapPin, label: 'Mumbai, Maharashtra', color: '#d97706' },
            ].map(c => (
              <div key={c.label} className="flex items-center gap-3 py-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: c.color+'15' }}>
                  <c.icon size={15} color={c.color} />
                </div>
                <span className="text-sm" style={{ color: '#374151' }}>{c.label}</span>
              </div>
            ))}
          </div>

          {/* Employee details */}
          <div className="card p-4">
            <p className="font-semibold text-sm mb-3" style={{ color: '#111827' }}>Employment Details</p>
            <div className="flex flex-col divide-y divide-gray-50">
              {details.map(d => (
                <div key={d.label} className="flex justify-between py-2.5">
                  <span className="text-xs" style={{ color: '#9ca3af' }}>{d.label}</span>
                  <span className="text-xs font-medium" style={{ color: '#374151' }}>{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'documents' && (
        <div className="px-4 py-4">
          <div className="card divide-y divide-gray-50">
            {['Aadhaar Card','PAN Card','Passport','Bank Details','Educational Certificates'].map(doc => (
              <div key={doc} className="flex items-center justify-between p-4">
                <span className="text-sm" style={{ color: '#374151' }}>{doc}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#f0fdf4', color: '#16a34a' }}>Uploaded</span>
                  <ChevronRight size={16} color="#d1d5db" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'settings' && (
        <div className="px-4 py-4">
          <div className="card divide-y divide-gray-50 mb-4">
            {menuItems.map(m => (
              <button key={m.label} className="w-full flex items-center gap-3 p-4 text-left">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: m.color+'15' }}>
                  <m.icon size={17} color={m.color} />
                </div>
                <span className="flex-1 text-sm font-medium" style={{ color: '#374151' }}>{m.label}</span>
                <ChevronRight size={16} color="#d1d5db" />
              </button>
            ))}
          </div>
          <button onClick={onBack} className="w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2" style={{ background: '#fef2f2', color: '#dc2626' }}>
            <LogOut size={16} /> Switch Orbit
          </button>
        </div>
      )}
    </div>
  )
}
