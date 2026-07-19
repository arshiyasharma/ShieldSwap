export default function Step1_MEVProblem() {
  return (
    <div className="grid grid-cols-2 gap-6 mb-8">
      {/* LEFT: Public Uniswap */}
      <div className="p-6 bg-red-900/20 border border-red-500 rounded-lg">
        <h3 className="text-xl font-bold text-red-400 mb-4">Uniswap (Public)</h3>
        <div className="bg-gray-800 p-4 rounded mb-4 font-mono text-sm">
          <pre>{`{
  ethAmount: 1.0
  tokenOut: USDC
  slippage: 0.5%
  wallet: 0xABC...
}`}</pre>
        </div>
        <p className="text-sm text-red-300">⚠️ Visible to all bots</p>
        <p className="text-sm text-red-300">⚠️ Sandwich attack incoming</p>
        <p className="text-lg font-bold text-red-400 mt-4">❌ You lose $127</p>
      </div>

      {/* RIGHT: Private SwapShield */}
      <div className="p-6 bg-green-900/20 border border-green-500 rounded-lg">
        <h3 className="text-xl font-bold text-green-400 mb-4">SwapShield (Private)</h3>
        <div className="bg-gray-800 p-4 rounded mb-4 font-mono text-sm">
          <pre>{`{
  intentHash: 0x9f3a...
  proof: zkProof_verified
  status: hidden until execution
}`}</pre>
        </div>
        <p className="text-sm text-green-300">✓ Bots see nothing</p>
        <p className="text-sm text-green-300">✓ Order protected by ZK</p>
        <p className="text-lg font-bold text-green-400 mt-4">✅ You save $127</p>
      </div>
    </div>
  )
}