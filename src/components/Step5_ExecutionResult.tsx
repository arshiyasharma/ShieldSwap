import { useState, useEffect } from 'react'
import { uniswapMock } from '../lib/uniswapMock'

type Props = {
  amount: string
  minOutput: string
}

type Result = {
  outputAmount: string
  txHash: string
  success: boolean
}

export default function Step5_ExecutionResult({ amount, minOutput }: Props) {
  const [result, setResult] = useState<Result | null>(null)

  useEffect(() => {
    let cancelled = false
    uniswapMock.executeSwap(amount, minOutput).then((r) => {
      if (!cancelled) setResult(r)
    })
    return () => {
      cancelled = true
    }
  }, [amount, minOutput])

  return (
    <div className="mb-8 p-6 bg-gray-800 rounded-lg border border-green-500">
      <h2 className="text-2xl font-bold text-green-400 mb-6">Execution Complete</h2>

      <div className="space-y-3 mb-6">
        <div className="p-4 bg-green-900/20 rounded border border-green-500">
          <p className="text-green-400">✓ Intent remained confidential</p>
        </div>

        <div className="p-4 bg-green-900/20 rounded border border-green-500">
          <p className="text-green-400">✓ No public mempool exposure</p>
        </div>

        <div className="p-4 bg-green-900/20 rounded border border-green-500">
          <p className="text-green-400">✓ Verified by Midnight</p>
        </div>

        <div className="p-4 bg-green-900/20 rounded border border-green-500">
          <p className="text-green-400">✓ Executed on Uniswap</p>
        </div>
      </div>

      {result && (
        <div
          className={`p-4 rounded border ${
            result.success
              ? 'bg-blue-900/20 border-blue-500'
              : 'bg-red-900/20 border-red-500'
          }`}
        >
          {result.success ? (
            <>
              <p className="text-blue-300 font-bold">
                Result: {amount} ETH → {result.outputAmount} USDC
              </p>
              <p className="text-sm text-blue-300 mt-2 font-mono">
                Transaction Hash: {result.txHash}
              </p>
            </>
          ) : (
            <p className="text-red-300 font-bold">
              ✗ Reverted: output {result.outputAmount} USDC is below your minimum of {minOutput} USDC
            </p>
          )}
        </div>
      )}
    </div>
  )
}
