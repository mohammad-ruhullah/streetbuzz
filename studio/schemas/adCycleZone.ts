import { defineField, defineType } from 'sanity'

export const adCycleZone = defineType({
  name: 'adCycleZone',
  title: 'AdCycle Zone',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Controls display order in the Deployment Coverage grid. Lower numbers first.',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'note',
      title: 'Note',
      type: 'string',
      description: 'Short caption under the city name, e.g. "Primary operating base".',
    }),
    defineField({
      name: 'areas',
      title: 'Areas',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Neighbourhoods / corridors covered in this city.',
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
    select: { title: 'city', subtitle: 'note' },
  },
})
