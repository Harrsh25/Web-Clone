const config = {
  approved:   { bg: '#f0fdf4', color: '#16a34a', label: 'Approved' },
  pending:    { bg: '#fffbeb', color: '#d97706', label: 'Pending' },
  rejected:   { bg: '#fef2f2', color: '#dc2626', label: 'Rejected' },
  active:     { bg: '#EFF4FF', color: '#1a56db', label: 'Active' },
  inactive:   { bg: '#f3f4f6', color: '#6b7280', label: 'Inactive' },
  completed:  { bg: '#f0fdf4', color: '#16a34a', label: 'Completed' },
  inprogress: { bg: '#EFF4FF', color: '#1a56db', label: 'In Progress' },
  notstarted: { bg: '#f3f4f6', color: '#374151', label: 'Not Started' },
  onhold:     { bg: '#fffbeb', color: '#d97706', label: 'On Hold' },
  high:       { bg: '#fef2f2', color: '#dc2626', label: 'High' },
  medium:     { bg: '#fffbeb', color: '#d97706', label: 'Medium' },
  low:        { bg: '#f0fdf4', color: '#16a34a', label: 'Low' },
  critical:   { bg: '#fef2f2', color: '#dc2626', label: 'Critical' },
  cancelled:  { bg: '#f3f4f6', color: '#6b7280', label: 'Cancelled' },
  ongoing:    { bg: '#EFF4FF', color: '#1a56db', label: 'Ongoing' },
  present:    { bg: '#f0fdf4', color: '#16a34a', label: 'Present' },
  absent:     { bg: '#fef2f2', color: '#dc2626', label: 'Absent' },
  late:       { bg: '#fffbeb', color: '#d97706', label: 'Late' },
  leave:      { bg: '#f5f3ff', color: '#7c3aed', label: 'On Leave' },
  holiday:    { bg: '#EFF4FF', color: '#1a56db', label: 'Holiday' },
}

export default function StatusBadge({ status, label, size = 'sm' }) {
  const key = (status || '').toLowerCase().replace(/\s+/g, '')
  const c = config[key] || { bg: '#f3f4f6', color: '#6b7280', label: status || '' }
  const text = label || c.label
  const px = size === 'xs' ? '6px' : '8px'
  const py = size === 'xs' ? '1px' : '3px'
  const fs = size === 'xs' ? '10px' : '11px'
  return (
    <span style={{ background: c.bg, color: c.color, padding: `${py} ${px}`, borderRadius: 9999, fontSize: fs, fontWeight: 500, lineHeight: 1.5, whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center' }}>
      {text}
    </span>
  )
}
