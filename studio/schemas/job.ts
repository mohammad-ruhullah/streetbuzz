import { defineField, defineType } from 'sanity'

export const job = defineType({
  name: 'job',
  title: 'Job Opening',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Controls position in the Open Roles list. Lower numbers first.',
    }),
    defineField({
      name: 'title',
      title: 'Role Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'team',
      title: 'Team / Department',
      type: 'string',
      description: 'e.g. Creative, Campaigns, Operations, Field.',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. Chattogram, Dhaka, Remote — Bangladesh.',
    }),
    defineField({
      name: 'type',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'One or two lines describing the role. Optional.',
    }),
    defineField({
      name: 'applyEmail',
      title: 'Applications Email (optional)',
      type: 'string',
      description: 'Where APPLY mailto goes. Falls back to the site contact email when empty.',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Turn off to hide this role without deleting it.',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Manual Order',
      name: 'manualOrder',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'location', active: 'active' },
    prepare: ({ title, subtitle, active }) => ({
      title: title || 'Untitled role',
      subtitle: active === false ? 'Hidden' : subtitle || '',
    }),
  },
})
