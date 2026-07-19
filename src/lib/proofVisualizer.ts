export const proofVisualizer = {
  formatHash(hash: string): string {
    return hash.slice(0, 10) + '...'
  },

  getProofStatus(isVerified: boolean): 'generating' | 'verified' {
    return isVerified ? 'verified' : 'generating'
  }
}