export interface GalleryImage {
  id: number
  title: string
  image?: string
}

export const galleryData: GalleryImage[] = [
  { id: 1, title: 'Nuestra planta de producción' },
  { id: 2, title: 'Selección de carnes' },
  { id: 3, title: 'Ahumado artesanal' },
  { id: 4, title: 'Equipo Chorizoli' },
  { id: 5, title: 'Evento gastronómico' },
  { id: 6, title: 'Degustación en feria' },
]