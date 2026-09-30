import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.documentTypeListItem('service').title('Services'),
      S.documentTypeListItem('project').title('Portfolio'),
      S.documentTypeListItem('adCycleZone').title('AdCycle Zones'),
      S.documentTypeListItem('brand').title('Brand Collaborations'),
      S.documentTypeListItem('job').title('Careers — Open Roles'),
      S.divider(),
      S.listItem()
        .title('Careers — Applications')
        .id('applications')
        .child(
          S.documentTypeList('application')
            .title('Applications')
            .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }]),
        ),
      S.listItem()
        .title('Campaign Inquiries')
        .id('inquiries')
        .child(
          S.documentTypeList('inquiry')
            .title('Campaign Inquiries')
            .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }]),
        ),
    ])
