type Props = {
  amount: string
  minOutput: string
  onAmountChange: (value: string) => void
  onMinOutputChange: (value: string) => void
}

export default function Step2_ConfidentialIntent({
  amount,
  minOutput,
  onAmountChange,
  onMinOutputChange,
}: Props) {
  return (
    <div className="mb-8 p-6 bg-gray-800 rounded-lg border border-purple-500">
      <h2 className="text-2xl font-bold text-purple-400 mb-6">Create Confidential Swap Intent</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Amount (ETH)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Minimum Output (USDC)</label>
          <input
            type="number"
            value={minOutput}
            onChange={(e) => onMinOutputChange(e.target.value)}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white"
          />
        </div>

        <div className="p-4 bg-blue-900/20 border border-blue-500 rounded">
          <p className="text-sm text-blue-300">
            ✓ Your order will be stored privately on Midnight
          </p>
          <p className="text-sm text-blue-300 mt-2">
            ✓ No exposure to public mempool
          </p>
        </div>
      </div>
    </div>
  )
}
