// Cores das etiquetas de tipo de cada Akuma no Mi
const TYPE_COLORS = {
  Paramecia: 'bg-orange-500/90 text-white',
  Logia: 'bg-sky-500/90 text-white',
  Zoan: 'bg-emerald-500/90 text-white',
  'Zoan Antique': 'bg-amber-700/90 text-white',
  'Zoan Mythique': 'bg-fuchsia-600/90 text-white',
  Smile: 'bg-yellow-400/90 text-mar',
  Clone: 'bg-slate-500/90 text-white',
}

export function typeClass(type) {
  return TYPE_COLORS[type] || 'bg-slate-500/90 text-white'
}
