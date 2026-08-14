'use client'

import { useState } from 'react'

export default function ContactForm({ system }: { system?: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, system }),
      })
      if (!res.ok) throw new Error()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <p className="mt-6 font-mono text-sm">
        &gt; Message received. We'll be in touch shortly.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-3">
      <input
        required
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full border border-[var(--border)] bg-transparent px-3 py-2 text-sm outline-none"
      />
      <input
        required
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full border border-[var(--border)] bg-transparent px-3 py-2 text-sm outline-none"
      />
      <textarea
        required
        placeholder="What are you stuck on?"
        rows={4}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="w-full border border-[var(--border)] bg-transparent px-3 py-2 text-sm outline-none"
      />
      <button
        type="submit"
        disabled={status === 'sending'}
        className="border border-[var(--fg)] px-4 py-2 font-mono text-xs uppercase disabled:opacity-50"
      >
        {status === 'sending' ? 'Sending...' : 'Send'}
      </button>
      {status === 'error' && (
        <p className="font-mono text-xs text-red-500">
          Something went wrong — try again, or email algorythmshq@gmail.com directly.
        </p>
      )}
    </form>
  )
}