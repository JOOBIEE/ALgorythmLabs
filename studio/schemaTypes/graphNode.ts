import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'graphNode',
  title: 'Graph Node',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nodeType',
      title: 'Node Type',
      type: 'string',
      options: {
        list: [
          { title: 'Core', value: 'core' },
          { title: 'System', value: 'system' },
          { title: 'Team Member', value: 'team' },
        ],
      },
    }),

    defineField({
  name: 'group',
  title: 'Graph Group',
  description: 'Which diagram this node belongs to',
  type: 'string',
  options: {
    list: [
      { title: 'Homepage', value: 'home' },
      { title: 'About Page', value: 'about' },
    ],
  },
  validation: (Rule) => Rule.required(),
}),
defineField({
  name: 'bio',
  title: 'Bio / Description',
  description: 'Shown in the expand panel when this node is clicked',
  type: 'text',
  rows: 3,
}),

    defineField({
      name: 'relatedSystem',
      title: 'Related System',
      type: 'reference',
      to: [{ type: 'system' }],
      hidden: ({ document }) => document?.nodeType !== 'system',
    }),
    defineField({
      name: 'connections',
      title: 'Connected To',
      description: 'Other nodes this one links to in the graph',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'graphNode' }] }],
    }),
    defineField({
      name: 'position',
      title: 'Position Hint',
      description: 'Optional manual x/y hint; graph can also auto-layout',
      type: 'object',
      fields: [
        { name: 'x', type: 'number' },
        { name: 'y', type: 'number' },
      ],
    }),
  ],

  preview: {
    select: { title: 'label', subtitle: 'nodeType' },
  },
})
