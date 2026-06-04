import type {StructureResolver} from 'sanity/structure'

const SINGLETONS = ['heroStats', 'contactInfo', 'ctaBanner'] as const

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido del sitio')
    .items([
      S.listItem()
        .title('Hero · Estadísticas')
        .id('heroStats')
        .child(S.document().schemaType('heroStats').documentId('heroStats')),
      S.listItem()
        .title('Banner CTA')
        .id('ctaBanner')
        .child(S.document().schemaType('ctaBanner').documentId('ctaBanner')),
      S.listItem()
        .title('Información de contacto')
        .id('contactInfo')
        .child(S.document().schemaType('contactInfo').documentId('contactInfo')),
      S.divider(),
      S.documentTypeListItem('coverageItem').title('Coberturas (Home)'),
      S.documentTypeListItem('product').title('Productos'),
      S.documentTypeListItem('service').title('Servicios'),
      S.documentTypeListItem('testimonial').title('Testimonios'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() !== undefined &&
          ![
            ...SINGLETONS,
            'coverageItem',
            'product',
            'service',
            'testimonial',
          ].includes(item.getId() as string),
      ),
    ])
