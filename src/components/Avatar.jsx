const colors = ['#1a56db','#7c3aed','#d97706','#dc2626','#16a34a','#0891b2','#db2777']

export default function Avatar({ name = '', size = 36, color }) {
  const initials = name.split(' ').map(w => w[0]).slice(0,2).join('').toUpperCase()
  const bg = color || colors[name.charCodeAt(0) % colors.length]
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: size * 0.36, fontWeight: 600, color: '#fff', letterSpacing: '-0.5px' }}>
      {initials}
    </div>
  )
}
