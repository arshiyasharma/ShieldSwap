// Mock Uniswap router. Simulates a swap execution for the demo.
// Uses a reference price of 2954 USDC/ETH and honors the minAmountOut guard.
export const uniswapMock = {
  async executeSwap(amountIn: string, minAmountOut: string) {
    const REFERENCE_PRICE = 2954 // USDC per ETH
    const output = parseFloat(amountIn) * REFERENCE_PRICE
    const minOut = parseFloat(minAmountOut)

    // Swap only succeeds if the output clears the minimum the user asked for.
    const success = output >= minOut

    return {
      outputAmount: output.toFixed(2),
      minAmountOut,
      txHash: '0x1a2b3c4d5e6f7a8b',
      success,
    }
  },
}
