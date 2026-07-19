# ShieldSwap

**Confidential Execution Layer for Uniswap on Midnight**

Stop losing money to sandwich attacks. ShieldSwap uses zero-knowledge proofs to keep your swap hidden from MEV bots until execution.

## The Problem

Every day, cryptocurrency traders lose billions to **sandwich attacks**—MEV bots that:
1. See your pending swap in the public mempool
2. Buy before you, driving the price up
3. Sell after you execute
4. Pocket 0.5–5% of your trade value

**$900M+ extracted annually by MEV attacks.**

A single 1 ETH swap can cost you $17–$127 in losses before your transaction even executes.

## How ShieldSwap Works

```
User enters swap intent (1 ETH → min 2,900 USDC)
    ↓
Order encrypted on Midnight (private, hidden from bots)
    ↓
Three ZK proofs generated:
  • Proof 1: User owns ≥ 1 ETH (verified without revealing balance)
  • Proof 2: Min output is valid (verified without revealing amount)
  • Proof 3: Signed by wallet owner (verified without exposing wallet)
    ↓
Proofs verified on Midnight
    ↓
Order released for execution (bots never saw it)
    ↓
Trade routed to Uniswap
    ↓
Result: Fair price, zero MEV loss
```

## Why Midnight

**Midnight enables confidential smart contracts** with zero-knowledge proofs. ShieldSwap leverages this to:
- Keep orders **encrypted** until execution (bots can't see them)
- Prove execution **without revealing details** (no trust required)
- Stay **decentralized** (no intermediary needed)

This is only possible with Midnight's privacy-first architecture.

## Features

- 🔒 **Private orders** – Encrypted on Midnight, invisible to MEV bots
- ✅ **Verifiable execution** – ZK proofs guarantee correctness without exposing data
- 🚀 **Instant integration** – Works with existing DEXes like Uniswap
- 💰 **Real savings** – Users recover 0.5–5% per trade
- ⛓️ **Trustless** – No intermediary. Only cryptography.

## Tech Stack

**Smart Contracts:**
- Compact (Midnight's privacy-enabled language)
- Zero-knowledge proofs (generated automatically by Compact compiler)

**Frontend:**
- React 18 + TypeScript + Vite
- Tailwind CSS
- Browser-based ZK proof validation

**Blockchain:**
- Midnight (privacy-first L1)
- Compiled contracts: `contracts/managed/shieldswap/`

**Deployment:**
- Vercel (frontend)
- Midnight Devnet (contracts)

## Getting Started

### Prerequisites
- Node.js 22+
- Compact compiler 0.31.1+
- Docker (for local Midnight devnet)

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/ShieldSwap.git
cd ShieldSwap

# Install dependencies
npm install

# Start dev server
npm run dev
```

Visit `http://localhost:5173` to see the demo.

### Compile Contracts

```bash
# Install Compact toolchain
curl --proto '=https' --tlsv1.2 -LsSf https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh | sh

# Compile
compact compile contracts/shieldswap.compact contracts/managed/shieldswap
```

## Project Structure

```
ShieldSwap/
├── contracts/
│   ├── shieldswap.compact          # Midnight smart contract
│   └── managed/shieldswap/         # Compiled circuits + ZK keys
├── src/
│   ├── components/
│   │   ├── Step1_MEVProblem.tsx    # Problem visualization
│   │   ├── Step2_ConfidentialIntent.tsx
│   │   ├── Step3_ProofGeneration.tsx
│   │   ├── Step4_SelectiveDisclosure.tsx
│   │   └── Step5_ExecutionResult.tsx
│   ├── lib/
│   │   ├── midnightClient.ts       # Midnight contract calls
│   │   ├── uniswapMock.ts          # Swap execution
│   │   └── proofVisualizer.ts      # Proof display utilities
│   └── pages/
│       └── SwapFlow.tsx            # Main app flow
└── package.json
```

## Demo Flow

1. **Step 1:** See the MEV problem (public swap loses $127)
2. **Step 2:** Create confidential intent (order stays private)
3. **Step 3:** Generate ZK proofs (three proofs verified)
4. **Step 4:** View selective disclosure (privacy + verifiability)
5. **Step 5:** Execute result (fair price, no MEV)

## Live Demo

**Vercel:** https://shieldswap-ashen.vercel.app/

## Hackathon

**MLH Midnight Hackathon 2026**
- Dates: July 17–19, 2026
- Track: DeFi, Beginner

## What's Next

- Deploy contracts to Midnight testnet
- Integrate real Midnight SDK
- Add wallet connection (Lace)
- Multi-DEX routing
- Gasless relayer support

## Why This Matters

ShieldSwap solves **MEV extraction**—one of the biggest unsolved problems in crypto. By leveraging Midnight's confidential contracts, we prove that **privacy and DeFi can coexist without sacrificing transparency or trust.**

This is the future of fair, user-controlled trading.

## Questions?

Reach out on Discord: `@shea3090`

---

**Built with Midnight. Built for privacy.**
