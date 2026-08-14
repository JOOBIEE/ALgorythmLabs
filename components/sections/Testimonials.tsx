import { getTestimonials } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import Image from 'next/image'

export default async function Testimonials() {
  const testimonials = await getTestimonials()

  if (testimonials.length === 0) return null

  return (
    <section id="testimonials" className="mx-auto max-w-4xl px-6 py-24">
      <p className="font-mono text-xs uppercase text-[var(--muted)]">
        [ What They Say ]
      </p>

      <div className="mt-10 space-y-12">
        {testimonials.map((t) => (
          <blockquote key={t._id} className="border-l-2 border-[var(--border)] pl-6">
            <p className="text-xl leading-relaxed">"{t.quote}"</p>
            <footer className="mt-4 flex items-center gap-3">
              {t.authorPhoto && (
            <Image
  src={urlFor(t.authorPhoto).width(80).height(80).url()}
  alt={t.authorName}
  width={40}
  height={40}
  sizes="40px"
  className="rounded-full grayscale"
/>
              )}
              <span className="font-mono text-xs uppercase text-[var(--muted)]">
                {t.authorName}
                {t.authorTitle && `, ${t.authorTitle}`}
              </span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  )
}