import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'system',
  title: 'System',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      description: 'e.g. IDENTITY, PRESENCE, GROWTH, OPS, INTEL',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
    }),
    defineField({
      name: 'index',
      title: 'Index (01–05)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      description: 'The one-liner shown on the module card',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'expandedContent',
      title: 'Expanded Content',
      description: 'Shown when the module is expanded/clicked',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  orderings: [
    {
      title: 'Index',
      name: 'indexAsc',
      by: [{ field: 'index', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'index' },
  },
})