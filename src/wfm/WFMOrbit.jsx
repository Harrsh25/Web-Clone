import { useState } from 'react'
import { LayoutDashboard, FolderOpen, CheckSquare, Clock, MoreHorizontal } from 'lucide-react'
import { WFMBottomNav } from '../components/BottomNav'
import WFMHome from './wfm-home/WFMHome'
import Projects from './projects/Projects'
import Tasks from './tasks/Tasks'
import Timesheet from './timesheet/Timesheet'
import WFMMore from './WFMMore'

const NAV = [
  { key: 'home', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'projects', label: 'Projects', icon: FolderOpen },
  { key: 'tasks', label: 'Tasks', icon: CheckSquare },
  { key: 'timesheet', label: 'Timesheet', icon: Clock },
  { key: 'more', label: 'More', icon: MoreHorizontal },
]

export default function WFMOrbit({ onBack }) {
  const [tab, setTab] = useState('home')

  const renderScreen = () => {
    switch (tab) {
      case 'home':      return <WFMHome onBack={onBack} onNav={setTab} />
      case 'projects':  return <Projects />
      case 'tasks':     return <Tasks />
      case 'timesheet': return <Timesheet />
      case 'more':      return <WFMMore onBack={onBack} />
      default:          return <WFMHome onBack={onBack} onNav={setTab} />
    }
  }

  return (
    <div className="mobile-shell">
      <div className="screen">{renderScreen()}</div>
      <WFMBottomNav items={NAV} active={tab} onChange={setTab} />
    </div>
  )
}
