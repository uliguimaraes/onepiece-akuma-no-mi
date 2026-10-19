import ItemCard from './ItemCard'

// Container da lista: renderiza um ItemCard para cada fruta.
export default function ItemList({ fruits, favorites, onSelect, onToggleFavorite }) {
  if (fruits.length === 0) {
    return (
      <p className="rounded-2xl bg-mar-claro/60 py-16 text-center text-pergaminho/70">
        Nenhuma fruta encontrada com esses filtros. 🏴‍☠️
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {fruits.map((fruit) => (
        <ItemCard
          key={fruit.id}
          fruit={fruit}
          isFavorite={favorites.includes(fruit.id)}
          onSelect={onSelect}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}
