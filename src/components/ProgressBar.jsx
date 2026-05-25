export default function ProgressBar({ value = 0, max = 100, color = '#1a56db', height = 6, showLabel = false }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <div>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-xs text-gray-500">{value} / {max}</span>
          <span className="text-xs font-medium" style={{ color }}>{pct}%</span>
        </div>
      )}
      <div style={{ height, borderRadius: 9999, background: '#e5e7eb', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', borderRadius: 9999, background: color, transition: 'width 0.6s ease' }} />
      </div>
    </div>
  )
}
