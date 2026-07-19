import { useState } from 'react'
import './index.css'
import Problem from './pages/Problem'
import SwapFlow from './pages/SwapFlow'

type View = 'problem' | 'app'

export default function App() {
  const [view, setView] = useState<View>('problem')

  return (
    <div className="min-h-screen text-gray-200">
      {/* Nav */}
      <header className="sticky top-0 z-20 backdrop-blur-md bg-black/30 border-b border-white/10">
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <button
            onClick={() => setView('problem')}
            className="flex items-center gap-2 font-bold text-lg tracking-tight"
          >
            <span className="text-xl">🛡️</span>
            <span className="bg-gradient-to-r from-violet-400 to-emerald-300 bg-clip-text text-transparent">
              ShieldSwap
            </span>
          </button>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setView('problem')}
              className={`px-3 py-2 text-sm rounded-lg transition ${
                view === 'problem' ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white'
              }`}
            >
              The Problem
            </button>
            <button
              onClick={() => setView('app')}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white shadow-lg shadow-violet-900/40 transition"
            >
              Launch App →
            </button>
          </div>
        </nav>
      </header>

      {/* Pages */}
      <main>
        {view === 'problem' && <Problem onLaunch={() => setView('app')} />}
        {view === 'app' && <SwapFlow />}
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-10 mt-10 border-t border-white/10 text-sm text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>ShieldSwap — Confidential execution layer for Uniswap, powered by Midnight.</span>
        <span>Built for the MLH Midnight Hackathon</span>
      </footer>
    </div>
  )
}
