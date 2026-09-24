import { defineField, defineType } from 'sanity'

export const brand = defineType({
  name: 'brand',
  title: 'Brand',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Controls position in the logo strip. Lower numbers first.',
    }),
    defineField({
      name: 'name',
      title: 'Brand Name',
      type: 'string',
      description: 'Used for the logo alt text and the Studio list.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      description: 'Transparent PNG or SVG works best. The strip renders logos in a neutral tone.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Website (optional)',
      type: 'url',
      description: 'If set, the logo links to this address.',
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Turn off to hide this brand on the site without deleting it.',
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
    select: { title: 'name', media: 'logo', active: 'active' },
    prepare: ({ title, media, active }) => ({
      title: title || 'Untitled brand',
      subtitle: active === false ? 'Hidden' : 'Visible',
      media,
    }),
  },
})
