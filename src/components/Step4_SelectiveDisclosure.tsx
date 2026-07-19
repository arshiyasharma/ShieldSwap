type Props = {
  intentHash: string
}

export default function Step4_SelectiveDisclosure({ intentHash }: Props) {
  return (
    <div className="mb-8 p-6 bg-gray-800 rounded-lg border border-purple-500">
      <h2 className="text-2xl font-bold text-purple-400 mb-6">Selective Disclosure</h2>

      <div className="p-4 bg-gray-900 rounded mb-4 font-mono text-xs">
        <span className="text-gray-500">Public intent reference: </span>
        <span className="text-purple-300">{intentHash || '—'}</span>
      </div>

      <div className="space-y-3">
        <div className="p-4 bg-gray-700 rounded">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Trade Details</span>
            <span className="text-red-400">Hidden</span>
          </div>
        </div>

        <div className="p-4 bg-gray-700 rounded">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Wallet Address</span>
            <span className="text-red-400">Hidden</span>
          </div>
        </div>

        <div className="p-4 bg-gray-700 rounded">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Amount</span>
            <span className="text-red-400">Hidden</span>
          </div>
        </div>

        <div className="p-4 bg-gray-700 rounded">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Timestamp</span>
            <span className="text-green-400">✓ Verified</span>
          </div>
        </div>

        <div className="p-4 bg-gray-700 rounded">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Settlement</span>
            <span className="text-green-400">✓ Verified</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-400 mt-6">
        Privacy maintained while verifiability is proven.
      </p>
    </div>
  )
}