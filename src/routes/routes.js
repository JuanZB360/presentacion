/**
 * Route path constants for all presentation slides
 */
export const ROUTES = {
  HOME: '/',
  MI_PRESENTACION: '/miPresentacion',
  MI_FAMILIA_Y_PAREJA: '/miFamiliayPareja',
  MI_HISTORIA: '/miHistoria',
  MIS_VALORES: '/misValores',
  MIS_PASATIEMPOS: '/misPasatiempos',
  MI_ANECDOTA: '/miAnecdota',
}

/**
 * Presentation slide route metadata definitions
 */
export const PRESENTATION_ROUTES = [
  {
    path: ROUTES.MI_PRESENTACION,
    slideId: 'intro',
    index: 0,
    title: 'Mi Presentación',
    navLabel: 'Presentación',
    aliases: ['/slide/1', '/intro', '/1'],
  },
  {
    path: ROUTES.MI_FAMILIA_Y_PAREJA,
    slideId: 'motor',
    index: 1,
    title: 'Mi Familia y Pareja',
    navLabel: 'Familia',
    aliases: ['/slide/2', '/motor', '/familia', '/miFamilia', '/2'],
  },
  {
    path: ROUTES.MI_HISTORIA,
    slideId: 'historia',
    index: 2,
    title: 'Mi Historia y Trayectoria',
    navLabel: 'Historia',
    aliases: ['/slide/3', '/historia', '/trayectoria', '/trabajo', '/3'],
  },
  {
    path: ROUTES.MIS_VALORES,
    slideId: 'valores',
    index: 3,
    title: 'Lo Que Creo y Cómo Trabajo',
    navLabel: 'Valores',
    aliases: ['/slide/4', '/valores', '/principios', '/loQueCreo', '/4'],
  },
  {
    path: ROUTES.MIS_PASATIEMPOS,
    slideId: 'pasatiempos',
    index: 4,
    title: 'Fuera del Código',
    navLabel: 'Pasatiempos',
    aliases: ['/slide/5', '/pasatiempos', '/hobbies', '/5'],
  },
  {
    path: ROUTES.MI_ANECDOTA,
    slideId: 'curiosidad',
    index: 5,
    title: 'El Dato Curioso: La Prueba de Fuego',
    navLabel: 'Anécdota',
    aliases: ['/slide/6', '/curiosidad', '/anecdota', '/datoCurioso', '/laPruebaDeFuego', '/6'],
  },
]

/**
 * Resolves the slide index (0 to 5) from any matching URL pathname or alias
 */
export function getSlideIndexFromPath(pathname) {
  if (!pathname) return 0
  const normalized = pathname.toLowerCase().replace(/\/+$/, '')

  // 1. Direct match on main route path
  const directRoute = PRESENTATION_ROUTES.find(
    (r) => r.path.toLowerCase() === normalized
  )
  if (directRoute) return directRoute.index

  // 2. Check alias list
  const aliasRoute = PRESENTATION_ROUTES.find(
    (r) => r.aliases.some((a) => a.toLowerCase() === normalized)
  )
  if (aliasRoute) return aliasRoute.index

  // 3. Check /slide/:num or /:num
  const numMatch = normalized.match(/(?:slide\/|^)?(\d+)$/)
  if (numMatch) {
    const num = parseInt(numMatch[1], 10)
    if (num >= 1 && num <= PRESENTATION_ROUTES.length) {
      return num - 1
    }
  }

  // 4. Check slideId in pathname
  const idMatch = normalized.replace(/^\/(?:slide\/)?/, '')
  const idRoute = PRESENTATION_ROUTES.find(
    (r) => r.slideId.toLowerCase() === idMatch
  )
  if (idRoute) return idRoute.index

  return 0
}

/**
 * Returns the canonical route path for a given slide index
 */
export function getPathBySlideIndex(index) {
  if (index >= 0 && index < PRESENTATION_ROUTES.length) {
    return PRESENTATION_ROUTES[index].path
  }
  return ROUTES.MI_PRESENTACION
}

