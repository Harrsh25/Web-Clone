import { ArrowLeft, Bell, Search } from 'lucide-react'

export default function Header({ title, onBack, rightIcon, accent = '#1a56db', showSearch = false }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-white" style={{ borderBottom: '1px solid #f3f4f6' }}>
      {onBack && (
        <button onClick={onBack} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: '#f3f4f6' }}>
          <ArrowLeft size={18} color="#374151" />
        </button>
      )}
      <h1 className="flex-1 text-base font-semibold" style={{ color: '#111827' }}>{title}</h1>
      {showSearch && (
        <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: '#f3f4f6' }}>
          <Search size={17} color="#6b7280" />
        </button>
      )}
      {rightIcon || (
        <button className="w-9 h-9 rounded-full flex items-center justify-center relative" style={{ background: '#f3f4f6' }}>
          <Bell size={17} color="#6b7280" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
        </button>
      )}
    </div>
  )
}
