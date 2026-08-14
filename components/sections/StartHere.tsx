'use client'

import { useState, useEffect } from 'react'
import ContactForm from './ContactForm'
import DiagnosticReport from './DiagnosticReport'
import { systemDescriptions } from '@/lib/systemMeta'
import type { DiagnosticReportContent } from '@/lib/diagnosticReport'
import type { SystemKey } from '@/lib/systemMeta'

interface Option {
  label: string
  system: SystemKey
}

interface Question {
  prompt: string
  options: Option[]
}

const questions: Question[] = [
  {
    prompt: 'What is your primary bottleneck?',
    options: [
      { label: 'A. Revenue Plateau', system: 'GROWTH' },
      { label: 'B. Messy Internal Workflows', system: 'OPS' },
      { label: 'C. Identity Crisis', system: 'IDENTITY' },
      { label: 'D. Poor Visibility', system: 'PRESENCE' },
    ],
  },
  {
    prompt: 'How would you describe your current systems?',
    options: [
      { label: 'A. Nonexistent — we improvise', system: 'OPS' },
      { label: 'B. Inconsistent across channels', system: 'IDENTITY' },
      { label: 'C. No clear acquisition engine', system: 'GROWTH' },
      { label: 'D. Website/product underperforms', system: 'PRESENCE' },
    ],
  },
  {
    prompt: 'What would "fixed" look like in 90 days?',
    options: [
      { label: 'A. Predictable customer pipeline', system: 'GROWTH' },
      { label: 'B. A team that runs without me', system: 'OPS' },
      { label: 'C. A brand people remember', system: 'IDENTITY' },
      { label: 'D. A presence that converts', system: 'PRESENCE' },
    ],
  },
]

function useTypewriter(text: string, speed = 18) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    setDisplayed('')
    let i = 0
    const id = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text])

  return displayed
}

export default function StartHere() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<SystemKey[]>([])
  const [showContactForm, setShowContactForm] = useState(false)
  const [reportForm, setReportForm] = useState({ name: '', email: '' })
  const [reportStatus, setReportStatus] = useState<'idle' | 'sending' | 'error'>('idle')
  const [report, setReport] = useState<DiagnosticReportContent | null>(null)
  const introText = useTypewriter('> Initializing scan...')

  function handleSelect(system: SystemKey) {
    setAnswers((prev) => [...prev, system])
    setStep((prev) => prev + 1)
  }

  function handleRestart() {
    setStep(0)
    setAnswers([])
    setShowContactForm(false)
    setReport(null)
    setReportForm({ name: '', email: '' })
    setReportStatus('idle')
  }

  async function handleGenerateReport(e: React.FormEvent) {
    e.preventDefault()
    setReportStatus('sending')
    try {
      const res = await fetch('/api/diagnostic-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...reportForm, answers }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setReport(data.report)
      setReportStatus('idle')
    } catch {
      setReportStatus('error')
    }
  }

  const isComplete = step >= questions.length

  const recommendation = isComplete
    ? (Object.entries(
        answers.reduce<Record<string, number>>((acc, s) => {
          acc[s] = (acc[s] || 0) + 1
          return acc
        }, {})
      ).sort((a, b) => b[1] - a[1])[0][0] as SystemKey)
    : null

  return (
    <section
      id="start-here"
      className="pattern-interrupt bg-[var(--bg)] py-24 text-[var(--fg)]"
    >
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="text-2xl font-semibold">Tell us where you're stuck.</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Answer three questions and we'll generate a diagnostic report — or
          just reach out directly, no quiz required.
        </p>

        <div className="mt-8 border border-[var(--border)]">
          <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
            <span className="font-mono text-xs uppercase text-[var(--muted)]">
              SYSTEM_RECOMMENDER.EXE
            </span>
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="h-2 w-2 rounded-full border border-[var(--border)]" />
              <span className="h-2 w-2 rounded-full border border-[var(--border)]" />
              <span className="h-2 w-2 rounded-full bg-[var(--fg)]" />
            </div>
          </div>

          <div className="min-h-[280px] p-6 font-mono text-sm">
            <p className="text-[var(--muted)]">
              {introText}
              <span className="animate-pulse-dot">▍</span>
            </p>

            {!isComplete ? (
              <div className="mt-4">
                <p>
                  <span className="text-[var(--muted)]">
                    {String(step + 1).padStart(2, '0')}/
                  </span>{' '}
                  {questions[step].prompt}
                </p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {questions[step].options.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => handleSelect(opt.system)}
                      className="border border-[var(--border)] px-3 py-2 text-left text-xs uppercase hover:border-[var(--fg)]"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              recommendation && (
                <div className="mt-4">
                  <p className="text-[var(--muted)]">&gt; Scan complete.</p>
                  <p className="mt-3">
                    Recommended system:{' '}
                    <span className="font-semibold">{recommendation}</span>
                  </p>
                  <p className="mt-2 text-[var(--muted)]">
                    {systemDescriptions[recommendation]}
                  </p>

                  {!report ? (
                    <>
                      <form onSubmit={handleGenerateReport} className="mt-6 space-y-3">
                        <input
                          required
                          type="text"
                          placeholder="Name"
                          value={reportForm.name}
                          onChange={(e) =>
                            setReportForm({ ...reportForm, name: e.target.value })
                          }
                          className="w-full border border-[var(--border)] bg-transparent px-3 py-2 text-sm outline-none"
                        />
                        <input
                          required
                          type="email"
                          placeholder="Email"
                          value={reportForm.email}
                          onChange={(e) =>
                            setReportForm({ ...reportForm, email: e.target.value })
                          }
                          className="w-full border border-[var(--border)] bg-transparent px-3 py-2 text-sm outline-none"
                        />
                        <button
                          type="submit"
                          disabled={reportStatus === 'sending'}
                          className="border border-[var(--fg)] px-4 py-2 text-xs uppercase disabled:opacity-50"
                        >
                          {reportStatus === 'sending'
                            ? 'Generating...'
                            : 'Generate My Diagnostic Report'}
                        </button>
                        {reportStatus === 'error' && (
                          <p className="text-xs text-red-500">
                            Something went wrong — try again, or use the
                            direct message option below.
                          </p>
                        )}
                      </form>

                      <div className="mt-6 flex flex-wrap gap-3 border-t border-[var(--border)] pt-6">
                        <button
                          onClick={() => setShowContactForm(!showContactForm)}
                          className="border border-[var(--border)] px-4 py-2 text-xs uppercase text-[var(--muted)]"
                        >
                          Or send a direct message
                        </button>
                        <button
                          onClick={handleRestart}
                          className="border border-[var(--border)] px-4 py-2 text-xs uppercase text-[var(--muted)]"
                        >
                          Restart
                        </button>
                      </div>

                      {showContactForm && <ContactForm system={recommendation} />}
                    </>
                  ) : (
                    <>
                      <DiagnosticReport report={report} />
                      <button
                        onClick={handleRestart}
                        className="mt-4 border border-[var(--border)] px-4 py-2 text-xs uppercase text-[var(--muted)]"
                      >
                        Restart
                      </button>
                    </>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  )
}