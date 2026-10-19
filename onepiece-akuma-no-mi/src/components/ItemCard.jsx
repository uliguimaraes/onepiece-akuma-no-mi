import { typeClass } from '../services/fruitTypes'

// Card individual: recebe os dados e callbacks via props.
export default function ItemCard({ fruit, isFavorite, onSelect, onToggleFavorite }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-mar-claro shadow-lg ring-1 ring-white/10 transition hover:-translate-y-1 hover:ring-ouro/60">
      <button
        type="button"
        onClick={() => onToggleFavorite(fruit.id)}
        aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        aria-pressed={isFavorite}
        className="absolute right-2 top-2 z-10 rounded-full bg-mar/70 px-2 py-1 text-lg leading-none transition hover:scale-110"
      >
        {isFavorite ? '★' : '☆'}
      </button>

      <button
        type="button"
        onClick={() => onSelect(fruit)}
        className="flex flex-1 flex-col text-left"
      >
        <div className="flex h-44 items-center justify-center bg-gradient-to-b from-white/10 to-transparent p-4">
          {fruit.image ? (
            <img
              src={fruit.image}
              alt={fruit.name}
              loading="lazy"
              className="max-h-full max-w-full object-contain drop-shadow-lg transition group-hover:scale-105"
            />
          ) : (
            <span className="text-6xl opacity-60" aria-hidden="true">
              🍈
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <span
            className={`w-fit rounded-full px-2.5 py-0.5 text-xs font-bold ${typeClass(fruit.type)}`}
          >
            {fruit.type}
          </span>
          <h3 className="text-base font-bold leading-snug">{fruit.name}</h3>
          {fruit.romanName && (
            <p className="text-sm italic text-ouro">{fruit.romanName}</p>
          )}
          <p className="line-clamp-3 text-sm text-pergaminho/70">
            {fruit.description}
          </p>
        </div>
      </button>
    </article>
  )
}
