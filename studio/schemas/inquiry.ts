import { defineField, defineType } from 'sanity'

/**
 * A campaign inquiry from the LET'S TALK form, written by /api/inquiry.
 * Never authored by hand, so the whole document is readOnly.
 *
 * These used to exist only as an email. If that email failed, bounced or was
 * deleted, the lead was gone with no record anywhere — which is the reason the
 * form now writes here first and treats the notification as secondary.
 */
export const inquiry = defineType({
  name: 'inquiry',
  title: 'Campaign Inquiry',
  type: 'document',
  readOnly: true,
  fields: [
    defineField({
      name: 'submittedAt',
      title: 'Submitted',
      type: 'datetime',
    }),
    defineField({
      name: 'brandName',
      title: 'Brand / Company',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'format',
      title: 'Format',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'Market / City',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Brief / Goals',
      type: 'text',
      rows: 5,
    }),
  ],
  orderings: [
    {
      name: 'submittedAtDesc',
      title: 'Newest first',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'brandName', city: 'city', submittedAt: 'submittedAt' },
    prepare: ({ title, city, submittedAt }) => ({
      title: title || 'Unnamed brand',
      subtitle: [city, submittedAt ? new Date(submittedAt).toLocaleDateString() : null]
        .filter(Boolean)
        .join(' — '),
    }),
  },
})
