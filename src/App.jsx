import { useState } from 'react'
import Landing from './pages/Landing'
import HROrbit from './hr/HROrbit'
import WFMOrbit from './wfm/WFMOrbit'

export default function App() {
  const [orbit, setOrbit] = useState(null) // null | 'hr' | 'wfm'

  if (orbit === 'hr') return <HROrbit onBack={() => setOrbit(null)} />
  if (orbit === 'wfm') return <WFMOrbit onBack={() => setOrbit(null)} />
  return <Landing onSelect={setOrbit} />
}
