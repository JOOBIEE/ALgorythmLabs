import AboutGraphSection from './AboutGraphSection'

export default function AboutSection() {
  return (
    <section id="about" className="border-y border-[var(--border)]">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <p className="font-mono text-xs uppercase text-[var(--muted)]">
          [ The Collective ]
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold">
          System architects, not consultants.
        </h2>

        <div className="mt-16 grid gap-12 md:grid-cols-2 md:items-start">
          <div className="space-y-5 text-[var(--muted)]">
            <p>
              Algorythm Labs is a brand and digital systems agency. We build
              the infrastructure that growing businesses are missing — the
              branding that positions them correctly, the websites that
              convert, the content systems that sustain visibility, and the
              automations that remove the manual work slowing everything
              down.
            </p>
            <p>
              We do not believe in isolated services. A logo without a
              strategy is decoration. A website without a content system is a
              digital brochure. A social media presence without a conversion
              path is noise. We build systems where every part connects to
              every other part — because that is the only way any of it
              actually works.
            </p>
            <p>
              The principle that governs how we operate is simple: we prove
              every system on ourselves before selling it to clients. The
              website you are reading, the content strategy behind it, the
              lead pipeline we run — all of it was built and tested
              internally first. We do not recommend what we have not done. We
              do not sell what we have not proven.
            </p>
            <p>
              We work with small businesses, personal brands, and growing
              companies who have something real to offer and need the
              systems to match it. Our work spans brand identity, web
              development, content strategy, social media management, and
              business automation — not as separate offerings, but as a
              connected operating system built around where a business
              actually is and where it needs to go.
            </p>
            <p>
              If your business is stuck somewhere — in visibility, in
              conversion, in consistency — that is exactly where we start.
            </p>

            <p className="border-t border-[var(--border)] pt-5 font-mono text-xs uppercase text-[var(--muted)]">
              Based in Lagos. Working remotely across Nigeria and beyond.
            </p>
          </div>

          <AboutGraphSection />
        </div>
      </div>
    </section>
  )
}