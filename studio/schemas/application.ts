import { defineField, defineType } from 'sanity'

/**
 * A careers application, written by the /api/apply function when someone
 * submits the form on /careers. Never authored by hand, so every field is
 * readOnly: nobody should be able to edit an applicant's own answers.
 *
 * Contains personal data (name, email, phone, CV). Two things to know:
 *  - Sanity serves asset files publicly even from a private dataset, so the
 *    CV URL is unguessable but not access-controlled.
 *  - These documents are only protected by the dataset's own read setting. On
 *    a public dataset anyone can query them, so the dataset must be private.
 */
export const application = defineType({
  name: 'application',
  title: 'Careers — Application',
  type: 'document',
  // Submissions are a record, not content. Read-only across the board.
  readOnly: true,
  fields: [
    defineField({
      name: 'submittedAt',
      title: 'Submitted',
      type: 'datetime',
    }),
    defineField({
      name: 'fullName',
      title: 'Full Name',
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
      name: 'discipline',
      title: 'What are they into?',
      type: 'string',
    }),
    defineField({
      name: 'portfolioUrl',
      title: 'Portfolio / LinkedIn / Instagram / Website',
      type: 'url',
    }),
    defineField({
      name: 'cv',
      title: 'CV',
      type: 'file',
      description: 'PDF, DOC or DOCX. Note: Sanity serves asset files publicly.',
    }),
    defineField({
      name: 'whyStreetbuzz',
      title: 'Why do you want to build with StreetBuzz?',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'dreamProject',
      title: "What would you love to build? (optional)",
      type: 'text',
      rows: 4,
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
    select: { title: 'fullName', discipline: 'discipline', submittedAt: 'submittedAt' },
    prepare: ({ title, discipline, submittedAt }) => ({
      title: title || 'Unnamed applicant',
      subtitle: [discipline, submittedAt ? new Date(submittedAt).toLocaleDateString() : null]
        .filter(Boolean)
        .join(' — '),
    }),
  },
})
