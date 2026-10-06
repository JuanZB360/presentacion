// Dynamic glob import of all assets
const yoFiles = import.meta.glob('../assets/yo/*.{jpeg,jpg,png,webp}', { eager: true, import: 'default' })
const familiaFiles = import.meta.glob('../assets/miFamiliayPareja/*.{jpeg,jpg,png,webp}', { eager: true, import: 'default' })
const trabajoFiles = import.meta.glob('../assets/trabajo/*.{jpeg,jpg,png,webp}', { eager: true, import: 'default' })
const pasatiemposFiles = import.meta.glob('../assets/pasatiempos/*.{jpeg,jpg,png,webp}', { eager: true, import: 'default' })

// Helper to convert glob object into structured array with descriptive titles and prioritized sorting
function processImages(globObj, customSort = null, defaultCategory = '') {
  const entries = Object.entries(globObj).map(([path, url]) => {
    const filename = path.split('/').pop()
    const cleanName = decodeURIComponent(filename)
    return {
      path,
      url,
      filename: cleanName,
      caption: formatCaption(cleanName, defaultCategory),
    }
  })

  if (customSort) {
    entries.sort(customSort)
  }

  return entries
}

function formatCaption(name, category) {
  if (name.includes('JuanZB')) return 'Juan David Zapata - Desarrollador'
  if (name.includes('miFamilia')) return 'Familia completa - El gran clan'
  if (name.includes('miParejayYo')) return 'Con mi compañera de ruta: Carolina'
  if (name.includes('enlaPlaza')) return 'Camellando duro en la plaza de mercado'
  if (name.includes('bananera')) return 'Trabajo pesado en fincas bananeras'
  if (name.includes('arañafinca') || name.includes('ara??afinca')) return 'Fauna de la finca bananera: Araña local'
  if (name.includes('ranafinca')) return 'Fauna de la finca: Rana silvestre'
  if (name.includes('sarigueyafinca')) return 'Fauna de la finca: Zarigüeya en la faena'
  if (name.includes('serpientefinca')) return 'Fauna de la finca: Serpiente en el campo'

  // WhatsApp images categorized nicely
  if (category === 'yo') return 'Momentos de enfoque & buena energía'
  if (category === 'familia') return 'Momentos familiares y compartiendo con Caro'
  if (category === 'trabajo') return 'La escuela de la vida: esfuerzo y forja'
  if (category === 'pasatiempos') return 'Música, buena comida y tiempo libre'

  return name.replace(/\.[^/.]+$/, '')
}

// 1. Yo images: Prioritize JuanZB.jpeg first
export const yoImagesList = processImages(yoFiles, (a, b) => {
  if (a.filename.includes('JuanZB')) return -1
  if (b.filename.includes('JuanZB')) return 1
  return a.filename.localeCompare(b.filename)
}, 'yo')

// 2. Familia images: Prioritize miFamilia and miParejayYo first
export const familiaImagesList = processImages(familiaFiles, (a, b) => {
  if (a.filename.includes('miFamilia')) return -1
  if (b.filename.includes('miFamilia')) return 1
  if (a.filename.includes('miParejayYo')) return -1
  if (b.filename.includes('miParejayYo')) return 1
  return a.filename.localeCompare(b.filename)
}, 'familia')

// 3. Trabajo images: Highlight iconic milestones (plaza, bananera, fauna)
export const trabajoImagesList = processImages(trabajoFiles, (a, b) => {
  const priority = ['enlaPlaza', 'bananera', 'sarigueyafinca', 'serpientefinca', 'ranafinca', 'arañafinca']
  const indexA = priority.findIndex(p => a.filename.includes(p))
  const indexB = priority.findIndex(p => b.filename.includes(p))
  if (indexA !== -1 && indexB !== -1) return indexA - indexB
  if (indexA !== -1) return -1
  if (indexB !== -1) return 1
  return a.filename.localeCompare(b.filename)
}, 'trabajo')

// 4. Pasatiempos images
export const pasatiemposImagesList = processImages(pasatiemposFiles, null, 'pasatiempos')

export const slidesData = [
  {
    id: 'intro',
    number: '01',
    codeTag: 'INIT // DEV_PROFILE',
    title: 'Hola, soy el nuevo programador',
    subtitle: 'Juan David Zapata',
    role: 'Desarrollador / Programador',
    status: 'Listo para picar código, aprender del equipo y tomar buen café ☕',
    images: yoImagesList,
    accentColor: '#38bdf8', // Cyan
    summaryPoints: [
      { label: 'Rol', value: 'Software Developer / Programador', icon: 'code' },
      { label: 'Enfoque', value: 'Curiosidad, código limpio y trabajo en equipo', icon: 'zap' },
      { label: 'Compromiso', value: 'Prometo no tumbar producción en mi primera semana 🚀', icon: 'shield' },
    ],
    codeSnippet: `const newTeamMember = {
  name: "Juan David Zapata",
  role: "Desarrollador / Programador",
  status: "ready_to_deploy",
  coffeeLevel: "100%",
  firstWeekPromise: () => "No tumbar producción 🛡️"
};`,
    speechTime: '~30 seg',
    script: `"¡Hola a todos! Para quienes no me conocen todavía, soy Juan David Zapata y me sumo al equipo como desarrollador. Llego con muchas ganas de meterle la ficha a los proyectos, aprender de la experiencia que todos tienen aquí y, sobre todo, aportar desde ya. Prometo no tumbar producción en mi primera semana."`,
  },
  {
    id: 'motor',
    number: '02',
    codeTag: 'CORE // CLUSTER_FAMILIAR',
    title: 'Mi círculo y motor',
    subtitle: 'El ejército que me respalda y me aterriza',
    role: 'Mi núcleo principal',
    status: 'Familia numerosa + apoyo incondicional',
    images: familiaImagesList,
    accentColor: '#ec4899', // Pink / Rose
    summaryPoints: [
      { label: 'Familia numerosa', value: 'Adriana y Gabriel (mis padres).', icon: 'heart' },
      { label: 'Hermanos (modo clan)', value: 'Deisy, Carolina, Samuel, Santiago, Pablo y Ana (6 hermanos).', icon: 'users' },
      { label: 'Compañera de ruta', value: 'Carolina, mi apoyo incondicional en cada paso.', icon: 'sparkles' },
    ],
    codeSnippet: `const miMotor = {
  parents: ["Adriana", "Gabriel"],
  siblingsCount: 6,
  siblings: ["Deisy", "Carolina", "Samuel", "Santiago", "Pablo", "Ana"],
  partner: "Carolina 💖",
  purpose: "Aterrizarme después de un día frente a la pantalla"
};`,
    speechTime: '~45 seg',
    script: `"Detrás de este programador hay un ejército completo. Vengo de una familia bastante numerosa: mis papás Adriana y Gabriel, y mis seis hermanos: Deisy, Carolina, Samuel, Santiago, Pablo y Ana... sí, las reuniones familiares parecen un evento público.

También está mi novia Carolina, que ha sido mi apoyo incondicional. Ellos son mi motor principal, los que me aterrizan después de un día frente a la pantalla y los que han estado ahí en cada paso del camino."`,
  },
  {
    id: 'historia',
    number: '03',
    codeTag: 'TRACE // LOG_TRAYECTORIA',
    title: 'Mi historia: El camino largo hasta la pantalla',
    subtitle: 'De la escuela de la vida al código profesional',
    role: 'Trayectoria & Resiliencia',
    status: 'Superando obstáculos hasta cumplir el sueño',
    images: trabajoImagesList,
    accentColor: '#10b981', // Emerald
    timeline: [
      {
        year: '2015',
        title: 'Medellín ➔ Apartadó',
        desc: 'Crecí en Apartadó desde los 12 años. Bachiller en 2015, beca en el Politécnico (2 semestres). La beca se retiró y tocó salir a camellar duro.',
        badge: 'El origen',
      },
      {
        year: '2016 - 2022',
        title: 'La escuela de la vida',
        desc: 'Cargué bultos en la plaza de mercado, fui ayudante de soldador y trabajé en fincas bananeras bajo el sol. Conviví con la fauna silvestre y el esfuerzo rudo.',
        badge: 'Trabajo pesado',
      },
      {
        year: '2023',
        title: 'Apostarlo todo por el código',
        desc: 'Regreso a Medellín dejando todo atrás para formarme intensamente en Riwi y Cesde. El sueño intacto.',
        badge: 'Pivote Tech',
      },
      {
        year: 'Hoy',
        title: 'Cumpliendo la meta: Aquí con ustedes',
        desc: 'Integrándome como programador al equipo, con la experiencia forjada y listo para aportar soluciones.',
        badge: 'En Producción',
      },
    ],
    speechTime: '~1 min 15 seg',
    script: `"Mi camino hasta esta silla no fue el tradicional. Nací en Medellín, pero crecí en Apartadó desde los 12 años. Me gradué de bachiller en 2015 y logré una beca para estudiar programación en el Politécnico; alcancé a hacer dos semestres, pero por cosas de la vida me retiraron la beca. En mi casa no había cómo pagarla, así que tocó salir a camellar duro para costearme el sueño.

Pasé por de todo: cargué bultos en la plaza de mercado, fui ayudante de soldador, trabajé en fincas bananeras bajo el sol... pero mi meta de ser programador nunca cambió. En 2023 vi la oportunidad de regresar a Medellín, dejé todo atrás para estudiar en Riwi y en el Cesde, y aquí estoy hoy, cumpliendo exactamente lo que me propuse hace años."`,
  },
  {
    id: 'valores',
    number: '04',
    codeTag: 'STACK // FILOSOFIA_DEV',
    title: 'Lo que creo y cómo trabajo',
    subtitle: 'Principios que guían cada línea de código y cada interacción',
    role: 'Filosofía & Mentalidad',
    status: 'Curiosidad + Servicio + Calidad',
    images: [], // No dedicated folder requested for slide 4, will use developer code/interactive cards
    accentColor: '#818cf8', // Indigo / Purple
    principles: [
      {
        title: 'Curiosidad & Persistencia',
        highlight: 'Si algo no compila, no me rindo hasta descifrarlo.',
        detail: 'Me apasiona entender el porqué de las cosas. Si un bug se pone difícil, me enfoco hasta encontrar la causa raíz y la mejor solución.',
        code: `while (hasBug) {
  investigate();
  learn();
  resolve();
}`,
        tag: 'DEBUG_MODE',
        icon: 'terminal',
      },
      {
        title: 'Servicial & Amable',
        highlight: 'La buena energía en el equipo no se negocia.',
        detail: 'Creo firmemente que el código fluye mejor cuando hay compañerismo, empatía y apertura para ayudar a los demás.',
        code: `const team = {
  vibe: "positive",
  support: true,
  collaborate: () => "crecemos juntos"
};`,
        tag: 'TEAM_FIRST',
        icon: 'handshake',
      },
      {
        title: 'Ojo al detalle',
        highlight: 'El toque perfeccionista para entregar cosas de calidad.',
        detail: 'Asegurarme de que lo que se entregue no solo funcione hoy, sino que sea mantenible, limpio y bien construido.',
        code: `function shipCode(feature) {
  assert(feature.worksWell);
  assert(feature.isClean);
  return "calidad comprobada";
}`,
        tag: 'QUALITY_ASSURANCE',
        icon: 'check-circle',
      },
    ],
    speechTime: '~45 seg',
    script: `"En el trabajo y en la vida me muevo por principios muy claros. Soy curioso y bastante persistente; si un bug se pone difícil, me obsesiono hasta que sale bien. Me gusta ser servicial y amable, porque creo que el código fluye mejor cuando el ambiente de trabajo es agradable. Y tengo mi lado perfeccionista, asegurándome de que lo que entregue no solo funcione, sino que quede bien hecho."`,
  },
  {
    id: 'pasatiempos',
    number: '05',
    codeTag: 'OFFLINE // RECARGA_BATERIA',
    title: 'Fuera del código',
    subtitle: 'Desconexión mental, música y compartir',
    role: 'Vida personal & Hobbies',
    status: 'Recargando energía para volver con la cabeza fresca',
    images: pasatiemposImagesList,
    accentColor: '#f59e0b', // Amber / Orange
    hobbies: [
      {
        name: 'Guitarra en mano',
        desc: 'Creando música y tocando acordes para desconectarme del mundo digital.',
        badge: 'Música & Ritmo',
        icon: 'music',
      },
      {
        name: 'Rutas gastronómicas',
        desc: 'Salir a comer rico, descubrir sabores y disfrutar de un buen plato.',
        badge: 'Foodie',
        icon: 'utensils',
      },
      {
        name: 'Videojuegos y planes tranquilos',
        desc: 'Partidas casuales y tiempo de calidad y descanso con Carolina.',
        badge: 'Relax & Balance',
        icon: 'gamepad',
      },
    ],
    speechTime: '~45 seg',
    script: `"Cuando apago el computador y cierro el editor de código, me gusta cambiar de aire. Toco la guitarra para desconectarme, me encanta salir a comer algo rico, jugar un rato y compartir tiempo tranquilo con mi pareja. Es mi forma de recargar batería para llegar al otro día con la cabeza fresca."`,
  },
  {
    id: 'curiosidad',
    number: '06',
    codeTag: 'EDGE_CASE // INCIDENT_REPORT',
    title: 'El dato curioso: La prueba de fuego en el camión',
    subtitle: 'Plot twist de juventud: Los mercados del ICBF',
    role: 'La prueba de fuego',
    status: 'Calma y firmeza bajo presión extrema',
    images: [], // Special graphic / incident visual
    accentColor: '#ef4444', // Red / Rose
    anecdote: {
      tag: 'INCIDENT_POSTMORTEM_ICBF_TRUCK',
      age: '19 años',
      setting: 'Camión repartidor en carretera lejana, sin señal ni auxilio cercano',
      characters: 'Dos compañeros gigantes y curtidos vs. Yo (19 años, flaquito)',
      threat: 'Intento de jugada/atraco de los propios compañeros a espaldas en plena ruta',
      resolution: 'Armarme de valor, encarar la situación solo en el camión y salir invicto con las cosas completas',
      takeaways: [
        { label: 'Moraleja 1', text: 'Tranquilos, no muerdo... pero no me dejo tumbar.' },
        { label: 'Moraleja 2', text: 'Sé mantener la calma y actuar con determinación bajo presión extrema.' },
      ],
    },
    closingMessage: '¡Gracias y un gusto enorme estar con todos ustedes!',
    speechTime: '~1 min',
    script: `"Para cerrar y romper el hielo, les cuento una anécdota de cuando apenas tenía 19 años. En uno de esos tantos trabajos, me tocó ir a repartir mercados del ICBF en un camión a un municipio lejos de donde vivía. Iba con dos compañeros de trabajo: señores gigantes, fornidos, curtidos de carretera... y yo, un pelado de 19 años, flaquito y completamente desgualamido.

Resulta que en pleno viaje me di cuenta de que mis propios compañeros me estaban montando una jugada para robarme a mis espaldas. No había policía cerca ni a quién llamar; solo estábamos los tres y el camión. Me tocó armarme de valor y enfrentarme a esos dos gigantes yo solito. Afortunadamente salí invicto y con las cosas completas.

Así que ya saben: soy una persona amable y tranquila, ¡pero sé mantener la calma bajo presión extrema! Un gusto enorme unirme al equipo, gracias por el espacio y aquí estoy para lo que necesiten."`,
  },
]
