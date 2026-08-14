import StaticGraphPreview from '@/components/graph/StaticGraphPreview'
const steps = [
  {
    number: '01',
    title: 'Diagnose',
    description:
      'We scan your existing framework for structural weaknesses, bloat, and manual failure points.',
  },
  {
    number: '02',
    title: 'Build',
    description:
      'Deployment of the modular system components tailored to your specific scale velocity.',
  },
  {
    number: '03',
    title: 'Prove',
    description:
      "Stress testing under real load. We don't hand off until it works perfectly in the field.",
  },
]

export default function Process() {
  return (
    <section id="process" className="border-y border-[var(--border)]">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2">
        <div>
          <p className="font-mono text-xs uppercase text-[var(--muted)]">
            [ Methodology ]
          </p>

          <ol className="mt-10 space-y-10">
            {steps.map((step) => (
              <li key={step.number} className="flex gap-6">
                <span className="font-mono text-sm text-[var(--muted)]">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-lg font-medium">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex min-h-[320px] items-center justify-center border border-[var(--border)] p-8">
  <StaticGraphPreview />
</div>
      </div>
    </section>
  )
}