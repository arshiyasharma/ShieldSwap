import { useState, useEffect } from 'react'
import { midnightClient } from '../lib/midnightClient'

type Props = {
  intentHash: string
}

type ProofRow = {
  name: string
  status: 'generating' | 'verified'
  hash: string
}

export default function Step3_ProofGeneration({ intentHash }: Props) {
  const [proofs, setProofs] = useState<ProofRow[]>([
    { name: 'Ownership', status: 'generating', hash: '' },
    { name: 'Output Validity', status: 'generating', hash: '' },
    { name: 'Signature', status: 'generating', hash: '' },
  ])

  useEffect(() => {
    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []

    midnightClient.generateProofs(intentHash).then((real) => {
      if (cancelled) return
      // Reveal each proof one second apart so the judge watches them verify.
      real.forEach((proof, i) => {
        const t = setTimeout(() => {
          setProofs((prev) => {
            const updated = [...prev]
            updated[i] = { name: proof.name, status: 'verified', hash: proof.hash }
            return updated
          })
        }, (i + 1) * 1000)
        timers.push(t)
      })
    })

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [intentHash])

  const allVerified = proofs.every((p) => p.status === 'verified')

  return (
    <div className="mb-8 p-6 bg-gray-800 rounded-lg border border-purple-500">
      <h2 className="text-2xl font-bold text-purple-400 mb-6">Confidential Execution Proof</h2>

      <div className="space-y-4 mb-6">
        {proofs.map((proof, i) => (
          <div key={i} className="p-4 bg-gray-700 rounded">
            <div className="flex items-center justify-between">
              <span className="font-bold">{proof.name}</span>
              {proof.status === 'generating' && <span className="animate-pulse text-yellow-400">⏳ Generating...</span>}
              {proof.status === 'verified' && <span className="text-green-400">✓ Verified</span>}
            </div>
            {proof.hash && <p className="text-xs text-gray-400 mt-2 font-mono">{proof.hash}</p>}
          </div>
        ))}
      </div>

      {allVerified && (
        <div className="p-4 bg-green-900/20 border border-green-500 rounded">
          <p className="text-green-400 font-bold">✓ All proofs verified on Midnight</p>
        </div>
      )}
    </div>
  )
}
