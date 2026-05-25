import { useState } from 'react'
import { Home, Calendar, Clock, CheckSquare, MoreHorizontal } from 'lucide-react'
import BottomNav from '../components/BottomNav'
import HRHome from './hr-home/HRHome'
import Attendance from './attendance/Attendance'
import Leave from './leave/Leave'
import Approvals from './approvals/Approvals'
import MoreMenu from './MoreMenu'

const NAV = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'attendance', label: 'Attendance', icon: Clock },
  { key: 'leave', label: 'Leave', icon: Calendar },
  { key: 'approvals', label: 'Approvals', icon: CheckSquare },
  { key: 'more', label: 'More', icon: MoreHorizontal },
]

export default function HROrbit({ onBack }) {
  const [tab, setTab] = useState('home')

  const renderScreen = () => {
    switch (tab) {
      case 'home':       return <HRHome onBack={onBack} onNav={setTab} />
      case 'attendance': return <Attendance />
      case 'leave':      return <Leave />
      case 'approvals':  return <Approvals />
      case 'more':       return <MoreMenu onBack={onBack} onNav={setTab} />
      default:           return <HRHome onBack={onBack} onNav={setTab} />
    }
  }

  return (
    <div className="mobile-shell">
      <div className="screen">{renderScreen()}</div>
      <BottomNav items={NAV} active={tab} onChange={setTab} />
    </div>
  )
}
