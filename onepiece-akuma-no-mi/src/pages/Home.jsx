import { useMemo, useState } from 'react'
import ItemDetails from '../components/ItemDetails'
import ItemList from '../components/ItemList'
import LoadingSpinner from '../components/LoadingSpinner'
import SearchForm from '../components/SearchForm'
import useFetch from '../hooks/useFetch'
import useLocalStorage from '../hooks/useLocalStorage'
import { FRUITS_URL, normalizeFruits } from '../services/api'

const PAGE_SIZE = 24

export default function Home() {
  const { data, loading, error, refetch } = useFetch(FRUITS_URL)

  // Estados da aplicação
  const [search, setSearch] = useState('')
  const [type, setType] = useState('')
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [selected, setSelected] = useState(null)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [favorites, setFavorites] = useLocalStorage('akuma-favorites', [])

  const fruits = useMemo(() => normalizeFruits(data), [data])

  const types = useMemo(
    () => [...new Set(fruits.map((f) => f.type))].sort(),
    [fruits],
  )

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return fruits.filter((fruit) => {
      const matchesText =
        !term ||
        fruit.name.toLowerCase().includes(term) ||
        fruit.romanName.toLowerCase().includes(term) ||
        fruit.description.toLowerCase().includes(term)
      const matchesType = !type || fruit.type === type
      const matchesFav = !onlyFavorites || favorites.includes(fruit.id)
      return matchesText && matchesType && matchesFav
    })
  }, [fruits, search, type, onlyFavorites, favorites])

  const visible = filtered.slice(0, visibleCount)

  // Sempre que um filtro muda, volta para a primeira "página"
  const withReset = (setter) => (value) => {
    setter(value)
    setVisibleCount(PAGE_SIZE)
  }

  const toggleFavorite = (id) =>
    setFavorites((current) =>
      current.includes(id) ? current.filter((fav) => fav !== id) : [...current, id],
    )

  const resetFilters = () => {
    setSearch('')
    setType('')
    setOnlyFavorites(false)
    setVisibleCount(PAGE_SIZE)
  }

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-ouro sm:text-5xl">
          Akuma no Mi
        </h1>
        <p className="mt-2 text-pergaminho/80">
          Catálogo das Frutas do Diabo de One Piece
        </p>
      </header>

      <main className="flex flex-col gap-6">
        <SearchForm
          search={search}
          onSearchChange={withReset(setSearch)}
          type={type}
          onTypeChange={withReset(setType)}
          types={types}
          onlyFavorites={onlyFavorites}
          onOnlyFavoritesChange={withReset(setOnlyFavorites)}
          onReset={resetFilters}
        />

        {loading && <LoadingSpinner message="Buscando frutas no Grand Line..." />}

        {error && (
          <div className="rounded-2xl bg-red-500/15 p-6 text-center ring-1 ring-red-400/40">
            <p className="mb-3 font-semibold">Ops! {error}</p>
            <button
              type="button"
              onClick={refetch}
              className="rounded-lg bg-ouro px-4 py-2 text-sm font-bold text-mar hover:brightness-110"
            >
              Tentar de novo
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <p className="text-sm text-pergaminho/70">
              {filtered.length} {filtered.length === 1 ? 'fruta encontrada' : 'frutas encontradas'}
            </p>

            <ItemList
              fruits={visible}
              favorites={favorites}
              onSelect={setSelected}
              onToggleFavorite={toggleFavorite}
            />

            {visibleCount < filtered.length && (
              <button
                type="button"
                onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                className="mx-auto rounded-full bg-ouro px-6 py-2.5 font-bold text-mar transition hover:brightness-110"
              >
                Carregar mais
              </button>
            )}
          </>
        )}
      </main>

      <footer className="mt-12 flex flex-col items-center gap-3 border-t border-white/10 pt-6 text-center text-sm text-pergaminho/70">
        <p>
          Criado por <span className="font-bold text-ouro">Ulisses "kakarotto" Guimarães</span>
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/ulisses-guimaraes-"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-white/10 px-4 py-1.5 font-semibold transition hover:bg-ouro hover:text-mar"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/uliguimaraes"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-white/10 px-4 py-1.5 font-semibold transition hover:bg-ouro hover:text-mar"
          >
            GitHub
          </a>
        </div>
        <p className="text-xs text-pergaminho/50">
          Dados: api-onepiece.com · Projeto acadêmico AP2 - ULBRA
        </p>
      </footer>

      {selected && (
        <ItemDetails
          fruit={selected}
          isFavorite={favorites.includes(selected.id)}
          onClose={() => setSelected(null)}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  )
}
