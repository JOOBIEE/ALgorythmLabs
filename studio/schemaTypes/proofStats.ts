import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'proofStats',
  title: 'Proof Strip Stats',
  type: 'document',
  fields: [
    defineField({
      name: 'provenCount',
      title: 'Systems Proven',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'inProgressCount',
      title: 'Systems In Progress',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'soldBeforeTestedCount',
      title: 'Systems Sold Before Tested',
      description: 'Should always be 0 — that\'s the whole point of the claim',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  preview: {
    select: { proven: 'provenCount', inProgress: 'inProgressCount' },
    prepare: ({ proven, inProgress }) => ({
      title: `${proven} Proven · ${inProgress} In Progress`,
    }),
  },
})