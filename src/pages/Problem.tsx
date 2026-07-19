type Props = {
  onLaunch: () => void
}

const sandwichSteps = [
  { n: 1, text: 'Your swap enters Ethereum’s public mempool — everyone can see it.' },
  { n: 2, text: 'MEV bots read your pending order before it settles.' },
  { n: 3, text: 'They buy the token ahead of you, pushing the price up.' },
  { n: 4, text: 'Your swap executes at a worse price than you were quoted.' },
  { n: 5, text: 'They sell right after you — pocketing the difference.' },
]

const solutions = [
  {
    name: 'Uniswap / DEXes',
    pros: ['Provide liquidity & pricing'],
    cons: ['Orders sit in the public mempool', 'Cannot hide orders from bots'],
  },
  {
    name: 'Flashbots Protect',
    pros: ['Hides orders from bots'],
    cons: ['Centralized — one entity controls it', 'Requires trusting a third party'],
  },
  {
    name: 'MEV Relayers',
    pros: ['Route orders privately'],
    cons: ['You still trust the relayer', 'Relayer itself can front-run you'],
  },
]

const proofs = [
  { title: 'Proof 1 — Ownership', text: '“User owns ≥ 1 ETH” — verified without ever showing the balance.' },
  { title: 'Proof 2 — Output validity', text: '“Minimum output is valid” — verified without revealing the amount.' },
  { title: 'Proof 3 — Signature', text: '“Signed by the wallet owner” — the only detail deliberately revealed.' },
]

const judgeReasons = [
  { title: 'Real problem', text: '$900M+ extracted from traders by MEV every year.' },
  { title: 'Midnight-native', text: 'Impossible to build without confidential smart contracts.' },
  { title: 'Clear value prop', text: 'Traders save 0.5–5% on every swap.' },
  { title: 'Realistic', text: 'Doesn’t rebuild Uniswap — it protects it.' },
  { title: 'Technically sound', text: 'Uses zero-knowledge proofs correctly.' },
]

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="max-w-5xl mx-auto px-6 py-14">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400 mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold text-white mb-8">{title}</h2>
      {children}
    </section>
  )
}

export default function Problem({ onLaunch }: Props) {
  return (
    <div>
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/40 bg-violet-500/10 text-violet-300 text-xs font-medium mb-6 animate-floaty">
          <span>⚡</span> The MEV problem, solved with Midnight
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.05]">
          Sandwich attacks cost traders
          <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-emerald-300 bg-clip-text text-transparent">
            billions every year.
          </span>
        </h1>
        <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
          Every time you swap on a public DEX, bots can see your order before it settles — and
          quietly tax it. ShieldSwap makes your trade invisible until the moment it executes.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onLaunch}
            className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white shadow-lg shadow-violet-900/40 transition"
          >
            Try ShieldSwap →
          </button>
          <a
            href="#how"
            className="px-6 py-3 rounded-xl font-semibold border border-white/15 hover:bg-white/5 text-gray-200 transition"
          >
            See how it works
          </a>
        </div>

        {/* Stat row */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { stat: '$900M+', label: 'Extracted by MEV annually' },
            { stat: '0.5–5%', label: 'Lost per sandwiched swap' },
            { stat: '0', label: 'Details exposed with ShieldSwap' },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur px-6 py-8"
            >
              <div className="text-3xl font-extrabold text-white">{s.stat}</div>
              <div className="mt-2 text-sm text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Anatomy of a sandwich attack */}
      <Section eyebrow="The core problem" title="Anatomy of a sandwich attack">
        <div className="space-y-3">
          {sandwichSteps.map((s) => (
            <div
              key={s.n}
              className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 px-5 py-4"
            >
              <div className="shrink-0 w-8 h-8 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 font-bold flex items-center justify-center">
                {s.n}
              </div>
              <p className="text-gray-300">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-red-500/30 bg-red-500/5 p-6">
          <p className="text-sm font-semibold text-red-300 mb-3">Worked example</p>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <ul className="space-y-1 text-gray-300">
              <li>You swap <b className="text-white">1 ETH → USDC</b></li>
              <li>Fair price: <b className="text-white">1 ETH = 2,954 USDC</b></li>
              <li>Bot sees your order and buys first, pushing price up</li>
            </ul>
            <ul className="space-y-1 text-gray-300">
              <li>Your swap fills at <b className="text-white">2,920 USDC</b> (0.5% worse)</li>
              <li>Bot sells back into your trade</li>
              <li className="text-red-300 font-semibold">Bot profit: $17 · Your loss: $17</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Why current solutions fail */}
      <Section eyebrow="The gap" title="Why today’s solutions fall short">
        <div className="grid md:grid-cols-3 gap-5">
          {solutions.map((s) => (
            <div key={s.name} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-bold text-white mb-4">{s.name}</h3>
              <ul className="space-y-2 text-sm">
                {s.pros.map((p) => (
                  <li key={p} className="flex gap-2 text-emerald-300">
                    <span>✓</span>
                    <span className="text-gray-300">{p}</span>
                  </li>
                ))}
                {s.cons.map((c) => (
                  <li key={c} className="flex gap-2 text-red-300">
                    <span>✗</span>
                    <span className="text-gray-300">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-8 text-gray-400 max-w-3xl">
          The fundamental problem: you need an order that stays <b className="text-white">hidden</b>{' '}
          from bots, is <b className="text-white">verifiable</b> so no one can cheat, and that{' '}
          <b className="text-white">no single entity</b> can see or manipulate. No existing tool
          gives you all three.
        </p>
      </Section>

      {/* How Midnight solves it */}
      <section id="how" className="scroll-mt-24">
        <Section eyebrow="The solution" title="Why Midnight solves this">
          <p className="text-gray-400 max-w-3xl mb-8">
            Midnight enables confidential smart contracts with zero-knowledge proofs. ShieldSwap
            proves your order is legitimate <b className="text-white">without ever revealing it</b>.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {proofs.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-violet-500/30 bg-violet-500/5 p-6"
              >
                <h3 className="font-bold text-violet-200 mb-2">{p.title}</h3>
                <p className="text-sm text-gray-300">{p.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6">
            <p className="text-emerald-200 font-semibold mb-1">The result</p>
            <p className="text-gray-300 text-sm">
              The order is released for execution only after every proof passes — routed to the best
              DEX and settled before bots can react. You get a fair price with zero MEV loss.
            </p>
          </div>
        </Section>
      </section>

      {/* The innovation */}
      <Section eyebrow="The innovation" title="ShieldSwap is not a DEX">
        <p className="text-gray-400 max-w-3xl mb-6">
          It’s a <b className="text-white">confidential execution layer</b> that sits in front of
          existing DEXes — keeping orders hidden with Midnight privacy, proving execution without
          exposing details, and letting users trade on-chain without on-chain exposure.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            'Orders stay encrypted until execution',
            'Proofs verify without revealing data',
            'No centralized intermediary needed',
            'Trustless — cryptography, not trust',
          ].map((t) => (
            <div
              key={t}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-4"
            >
              <span className="text-emerald-300">✓</span>
              <span className="text-gray-300">{t}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* For judges */}
      <Section eyebrow="For judges" title="Why this wins">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {judgeReasons.map((r, i) => (
            <div key={r.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-2xl font-extrabold text-violet-400 mb-2">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="font-bold text-white mb-1">{r.title}</h3>
              <p className="text-sm text-gray-400">{r.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-600/20 to-emerald-500/10 p-10 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">
            See it protect a swap in real time
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">
            Walk through the full flow: confidential intent → zero-knowledge proofs → selective
            disclosure → settlement.
          </p>
          <button
            onClick={onLaunch}
            className="px-8 py-3.5 rounded-xl font-semibold bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white shadow-lg shadow-violet-900/40 transition"
          >
            Launch ShieldSwap →
          </button>
        </div>
      </section>
    </div>
  )
}
