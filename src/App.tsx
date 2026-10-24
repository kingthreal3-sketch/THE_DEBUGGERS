import { useEffect, useMemo, useState } from 'react'

const events = [
  { at: 0, time: '00.00', text: 'System armed. 4 mics online.', tone: 'green' },
  { at: 18, time: '02.00', text: 'Impulse detected. CNN classify...', tone: 'amber' },
  { at: 34, time: '02.30', text: 'GUNSHOT 97% | firework filter: no', tone: 'red' },
  { at: 49, time: '02.60', text: 'TDOA bearing 137 deg, 85 m', tone: 'red' },
  { at: 65, time: '06.00', text: 'LoRa SOS received (wearable #07)', tone: 'amber' },
  { at: 82, time: '07.00', text: 'Responders dispatched. T+1.8s', tone: 'green' },
]

function App() {
  const [progress, setProgress] = useState(0)
  const [running, setRunning] = useState(true)

  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => {
      setProgress((value) => {
        if (value >= 100) {
          setRunning(false)
          return 100
        }
        return value + 1
      })
    }, 90)
    return () => window.clearInterval(id)
  }, [running])

  const visibleEvents = events.filter((event) => progress >= event.at)
  const threat = progress >= 34
  const located = progress >= 49
  const sos = progress >= 65
  const wave = useMemo(
    () =>
      Array.from({ length: 92 }, (_, index) => {
        const baseline = 40 + Math.sin(index * 2.7) * 5 + Math.cos(index * 1.3) * 4
        const spike = progress > 18 && index > 53 && index < 59 ? (index % 2 ? 29 : -25) : 0
        return `${index * 6},${baseline + spike}`
      }).join(' '),
    [progress],
  )

  const replay = () => {
    setProgress(0)
    setRunning(true)
  }

  return (
    <main className="dashboard">
      <header className="topbar">
        <div>
          <p className="eyebrow">THE DEBUGGERS / COMMAND SYSTEM 01</p>
          <h1>GUNSHOT DETECTION <span>&amp;</span> SOS COMMAND</h1>
        </div>
        <div className="status-wrap">
          <span className={`status-dot ${threat ? 'danger' : ''}`} />
          <div>
            <small>LIVE STATUS</small>
            <strong className={threat ? 'red' : 'green'}>{threat ? 'THREAT CONFIRMED' : 'ALL CLEAR'}</strong>
          </div>
        </div>
      </header>

      <section className="layout">
        <article className="panel radar-panel">
          <PanelTitle label="ACOUSTIC ARRAY" meta="DIRECTION / DISTANCE" />
          <div className="radar">
            <span className="direction north">N</span><span className="direction east">E</span>
            <span className="direction south">S</span><span className="direction west">W</span>
            <span className="axis axis-x" /><span className="axis axis-y" />
            {[1, 2, 3, 4].map((ring) => <span key={ring} className={`ring ring-${ring}`} />)}
            <span className="range r1">37m</span><span className="range r2">75m</span>
            <span className="range r3">112m</span><span className="range r4">150m</span>
            <div className="mic-array">
              {['M1', 'M2', 'M3', 'M4'].map((mic) => <span key={mic}>{mic}</span>)}
            </div>
            {!located && <span className="sweep" style={{ transform: `rotate(${progress * 8}deg)` }} />}
            {located && <>
              <span className="bearing" />
              <span className="source"><i /><b>137°</b><em>85 M</em></span>
            </>}
          </div>
          <footer className="panel-footer">
            <span><i className="signal" /> 4 MICS ONLINE</span>
            <span>{located ? 'SOURCE LOCKED' : 'SCANNING SECTOR'}</span>
          </footer>
        </article>

        <div className="right-column">
          <article className="panel wave-panel">
            <PanelTitle label="MIC INPUT" meta="2s RING BUFFER" />
            <svg className="waveform" viewBox="0 0 550 80" preserveAspectRatio="none" aria-label="Live microphone waveform">
              <line x1="0" y1="40" x2="550" y2="40" />
              <polyline points={wave} className={threat ? 'wave-red' : ''} />
            </svg>
            <div className="wave-meta"><span>CH 01–04 COMBINED</span><span>48.0 kHz</span><span>{threat ? '97.2 dB' : '32.8 dB'}</span></div>
          </article>

          <article className="panel map-panel">
            <PanelTitle label="COMMAND MAP" meta="SCHOOL BLOCK A" />
            <div className="map-grid">
              <div className="building">SCHOOL BLOCK A<small>ACADEMIC WING</small></div>
              {located && <div className="pin gunshot"><i />GUNSHOT<small>26.8461N / 80.9448E</small></div>}
              {sos && <div className="pin sos"><i />SOS SIGNAL<small>WEARABLE #07</small></div>}
              <span className="map-scale">50 M</span>
            </div>
          </article>

          <article className="panel log-panel">
            <PanelTitle label="EVENT LOG" meta={`${visibleEvents.length} EVENTS`} />
            <div className="log-list">
              {visibleEvents.slice(-4).map((event) => (
                <p key={event.time} className={event.tone}><time>[{event.time}s]</time>{event.text}</p>
              ))}
            </div>
          </article>
        </div>
      </section>

      <div className="controls">
        <button onClick={() => setRunning(!running)}>{running ? 'PAUSE FEED' : progress === 100 ? 'SEQUENCE COMPLETE' : 'RESUME FEED'}</button>
        <button className="primary" onClick={replay}>REPLAY DETECTION</button>
        <div className="timeline"><span style={{ width: `${progress}%` }} /></div>
        <output>T+ {(progress * 0.08).toFixed(2)}s</output>
      </div>
    </main>
  )
}

function PanelTitle({ label, meta }: { label: string; meta: string }) {
  return <header className="panel-title"><h2>{label}</h2><span>{meta}</span></header>
}

export default App
