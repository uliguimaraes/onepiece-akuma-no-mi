import { useEffect } from 'react'
import { typeClass } from '../services/fruitTypes'

// Modal com os detalhes da fruta selecionada.
export default function ItemDetails({ fruit, isFavorite, onClose, onToggleFavorite }) {
  // Fecha com a tecla ESC
  useEffect(() => {
    const handleKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Detalhes de ${fruit.name}`}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-mar-claro p-6 shadow-2xl ring-1 ring-white/10 sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="flex h-48 shrink-0 items-center justify-center rounded-2xl bg-white/10 p-4 sm:h-56 sm:w-56">
            {fruit.image ? (
              <img
                src={fruit.image}
                alt={fruit.name}
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <span className="text-7xl opacity-60" aria-hidden="true">
                🍈
              </span>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-3">
            <span
              className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${typeClass(fruit.type)}`}
            >
              {fruit.type}
            </span>
            <h2 className="text-2xl font-extrabold">{fruit.name}</h2>
            {fruit.romanName && (
              <p className="italic text-ouro">{fruit.romanName}</p>
            )}
            <p className="text-sm leading-relaxed text-pergaminho/85">
              {fruit.description}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={() => onToggleFavorite(fruit.id)}
            className="rounded-lg bg-ouro px-4 py-2 text-sm font-bold text-mar transition hover:brightness-110"
          >
            {isFavorite ? '★ Favorita' : '☆ Favoritar'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/20"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}
