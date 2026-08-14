import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'insight',
  title: 'Insight',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
  name: 'featuredOnHome',
  title: 'Featured on Homepage',
  description: 'Check to pin this note in the homepage preview (max 3 shown — most recent featured ones win if more than 3 are checked)',
  type: 'boolean',
  initialValue: false,
}),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'systemTag',
      title: 'System Tag',
      description: 'Which of the five systems this essay belongs to',
      type: 'reference',
      to: [{ type: 'system' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      description: 'One-line summary shown in the index list',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time (minutes)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Pull Quote', value: 'blockquote' },
          ],
        },
        { type: 'image' },
      ],
    }),
    defineField({
      name: 'relatedEssays',
      title: 'Related Essays',
      description: '2-3 links shown at the bottom of the essay',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'insight' }] }],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Meta Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'systemTag.name' },
  },
})