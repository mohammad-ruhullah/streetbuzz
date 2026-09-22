import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      description: 'Shown in the footer and the final CTA section.',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'founderEmail',
      title: 'Direct / Founder Inquiries Email',
      type: 'string',
      description: 'Shown under the final CTA as the direct founder briefing address.',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'socials',
      title: 'Social Links',
      type: 'array',
      of: [
        defineField({
          name: 'social',
          title: 'Social Link',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'url', title: 'URL', type: 'url', validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: 'label', subtitle: 'url' } },
        }),
      ],
    }),
    defineField({
      name: 'formFormatOptions',
      title: 'Inquiry Form — Format Options',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Options shown in the "Format" dropdown of the Let\'s Talk form.',
    }),
    defineField({
      name: 'formCityOptions',
      title: 'Inquiry Form — Market / City Options',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Options shown in the "Market / City" dropdown of the Let\'s Talk form.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
})
