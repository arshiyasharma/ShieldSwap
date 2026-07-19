import { useState } from 'react'
import Step1_MEVProblem from '../components/Step1_MEVProblem'
import Step2_ConfidentialIntent from '../components/Step2_ConfidentialIntent'
import Step3_ProofGeneration from '../components/Step3_ProofGeneration'
import Step4_SelectiveDisclosure from '../components/Step4_SelectiveDisclosure'
import Step5_ExecutionResult from '../components/Step5_ExecutionResult'
import { midnightClient } from '../lib/midnightClient'

export default function SwapFlow() {
  const [step, setStep] = useState(1)

  // Swap intent — entered in Step 2, flows through every later step.
  const [amount, setAmount] = useState('1')
  const [minOutput, setMinOutput] = useState('2900')
  const [intentHash, setIntentHash] = useState('')

  // Create the confidential intent on Midnight, then advance to proofs.
  async function createIntentAndContinue() {
    const { intentHash } = await midnightClient.createConfidentialIntent(amount, minOutput)
    setIntentHash(intentHash)
    setStep(3)
  }

  const stepLabels = ['Problem', 'Intent', 'Proofs', 'Disclosure', 'Execute']

  return (
    <div className="text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-violet-400 to-emerald-300 bg-clip-text text-transparent">
          ShieldSwap
        </h1>
        <p className="text-gray-400 mb-8">Confidential Execution Layer for Uniswap on Midnight</p>

        {/* Step progress */}
        <div className="flex items-center mb-10">
          {stepLabels.map((label, i) => {
            const n = i + 1
            const active = n === step
            const done = n < step
            return (
              <div key={label} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border transition ${
                      active
                        ? 'bg-violet-600 border-violet-400 text-white'
                        : done
                          ? 'bg-emerald-600/80 border-emerald-400 text-white'
                          : 'bg-white/5 border-white/15 text-gray-500'
                    }`}
                  >
                    {done ? '✓' : n}
                  </div>
                  <span
                    className={`mt-2 text-[11px] ${active ? 'text-white' : 'text-gray-500'}`}
                  >
                    {label}
                  </span>
                </div>
                {n < stepLabels.length && (
                  <div
                    className={`h-0.5 flex-1 mx-2 mb-5 rounded ${
                      done ? 'bg-emerald-500/60' : 'bg-white/10'
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>

        {step === 1 && (
          <div>
            <Step1_MEVProblem />
            <button
              onClick={() => setStep(2)}
              className="w-full p-4 bg-green-600 hover:bg-green-700 rounded font-bold text-lg"
            >
              Use SwapShield →
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <Step2_ConfidentialIntent
              amount={amount}
              minOutput={minOutput}
              onAmountChange={setAmount}
              onMinOutputChange={setMinOutput}
            />
            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 p-4 bg-gray-700 hover:bg-gray-600 rounded font-bold"
              >
                ← Back
              </button>
              <button
                onClick={createIntentAndContinue}
                className="flex-1 p-4 bg-green-600 hover:bg-green-700 rounded font-bold"
              >
                Generate Proofs →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <Step3_ProofGeneration intentHash={intentHash} />
            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 p-4 bg-gray-700 hover:bg-gray-600 rounded font-bold"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex-1 p-4 bg-green-600 hover:bg-green-700 rounded font-bold"
              >
                View Proof →
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <Step4_SelectiveDisclosure intentHash={intentHash} />
            <div className="flex gap-4">
              <button
                onClick={() => setStep(3)}
                className="flex-1 p-4 bg-gray-700 hover:bg-gray-600 rounded font-bold"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(5)}
                className="flex-1 p-4 bg-green-600 hover:bg-green-700 rounded font-bold"
              >
                Execute →
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <Step5_ExecutionResult amount={amount} minOutput={minOutput} />
            <button
              onClick={() => setStep(1)}
              className="w-full p-4 bg-gray-700 hover:bg-gray-600 rounded font-bold"
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
