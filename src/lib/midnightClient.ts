// Mock Midnight client - stands in for the compiled contract calls.
// Will integrate the real SDK later. Hashes are derived from inputs so the
// same intent always yields the same proof hashes (looks real, no crypto dep).
//
// NOTE: browser-safe. `Buffer` is Node-only and is not available in the Vite
// browser bundle, so we hex-encode manually instead.

function toHex(seed: string): string {
  let out = ''
  for (let i = 0; i < seed.length; i++) {
    out += seed.charCodeAt(i).toString(16).padStart(2, '0')
  }
  return '0x' + out.slice(0, 16)
}

export const midnightClient = {
  async createConfidentialIntent(amount: string, minOutput: string) {
    return {
      intentHash: toHex(`intent:${amount}:${minOutput}`),
      status: 'created' as const,
    }
  },

  async generateProofs(intentHash: string) {
    return [
      { name: 'Ownership', hash: toHex(`ownership:${intentHash}`), verified: true },
      { name: 'Output Validity', hash: toHex(`output:${intentHash}`), verified: true },
      { name: 'Signature', hash: toHex(`sig:${intentHash}`), verified: true },
    ]
  },

  async authorizeExecution(intentHash: string) {
    return {
      authorized: true,
      authHash: toHex(`auth:${intentHash}`),
    }
  },
}
