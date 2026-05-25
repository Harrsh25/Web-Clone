export default function BottomNav({ items, active, onChange }) {
  return (
    <nav className="bottom-nav" style={{ background: '#fff', borderTop: '1px solid #e5e7eb' }}>
      <div className="flex items-center justify-around py-2 px-1">
        {items.map(({ key, label, icon: Icon }) => {
          const isActive = active === key
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-all"
              style={{ flex: 1, background: isActive ? '#EFF4FF' : 'transparent' }}
            >
              <Icon size={20} color={isActive ? '#1a56db' : '#9ca3af'} strokeWidth={isActive ? 2 : 1.5} />
              <span className="text-[10px] font-medium" style={{ color: isActive ? '#1a56db' : '#9ca3af' }}>
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export function WFMBottomNav({ items, active, onChange }) {
  return (
    <nav className="bottom-nav" style={{ background: '#fff', borderTop: '1px solid #e5e7eb' }}>
      <div className="flex items-center justify-around py-2 px-1">
        {items.map(({ key, label, icon: Icon }) => {
          const isActive = active === key
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-all"
              style={{ flex: 1, background: isActive ? '#f5f3ff' : 'transparent' }}
            >
              <Icon size={20} color={isActive ? '#7c3aed' : '#9ca3af'} strokeWidth={isActive ? 2 : 1.5} />
              <span className="text-[10px] font-medium" style={{ color: isActive ? '#7c3aed' : '#9ca3af' }}>
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
