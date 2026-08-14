import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Client / Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
  name: 'homepageSummary',
  title: 'Homepage Summary',
  description: 'Short one-liner shown in the Case Studies preview on the homepage (e.g. "Cut global latency 78%")',
  type: 'string',
  validation: (Rule) => Rule.max(80),
}),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'reportId',
      title: 'Report ID',
      description: 'e.g. SA-0449-HI',
      type: 'string',
    }),
    defineField({
      name: 'timestamp',
      title: 'Timestamp',
      type: 'datetime',
    }),
    defineField({
      name: 'systemApplied',
      title: 'System Applied',
      description: 'e.g. NEURAL_ROUTING_V4',
      type: 'string',
    }),
    defineField({
      name: 'relatedSystem',
      title: 'Related System',
      type: 'reference',
      to: [{ type: 'system' }],
    }),
    defineField({
      name: 'initialPerception',
      title: '01 — Initial Perception',
      type: 'object',
      fields: [
        { name: 'heading', type: 'string' },
        { name: 'body', type: 'text' },
        { name: 'figureImage', type: 'image', title: 'Figure Image' },
        { name: 'figureLabel', type: 'string' },
      ],
    }),
    defineField({
      name: 'intervention',
      title: '02 — Intervention',
      type: 'object',
      fields: [
        { name: 'appliedLogicLabel', type: 'string' },
        {
          name: 'bulletPoints',
          type: 'array',
          of: [{ type: 'string' }],
        },
        { name: 'figureImage', type: 'image', title: 'Figure Image' },
        { name: 'figureLabel', type: 'string' },
      ],
    }),
    defineField({
      name: 'result',
      title: '03 — Result',
      type: 'object',
      fields: [
        {
          name: 'metrics',
          title: 'Metrics',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', type: 'string' },
                { name: 'value', type: 'string' },
              ],
            },
          ],
        },
        { name: 'quote', type: 'text' },
        { name: 'quoteAuthorName', type: 'string' },
        { name: 'quoteAuthorTitle', type: 'string' },
        { name: 'quoteAuthorPhoto', type: 'image' },
      ],
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Meta Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'reportId' },
  },
})