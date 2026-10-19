// Formulário controlado: os inputs são controlados pelo estado do componente pai.
export default function SearchForm({
  search,
  onSearchChange,
  type,
  onTypeChange,
  types,
  onlyFavorites,
  onOnlyFavoritesChange,
  onReset,
}) {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="grid gap-4 rounded-2xl bg-mar-claro/70 p-4 shadow-lg ring-1 ring-white/10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_auto_auto] lg:items-end"
    >
      <label className="flex flex-col gap-1 text-sm font-medium">
        Buscar fruta
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Ex.: Gomu Gomu, fogo, gravidade..."
          className="rounded-lg border border-white/10 bg-mar px-3 py-2 text-pergaminho placeholder:text-pergaminho/40 focus:border-ouro focus:outline-none focus:ring-2 focus:ring-ouro/40"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium">
        Tipo
        <select
          value={type}
          onChange={(e) => onTypeChange(e.target.value)}
          className="rounded-lg border border-white/10 bg-mar px-3 py-2 text-pergaminho focus:border-ouro focus:outline-none focus:ring-2 focus:ring-ouro/40"
        >
          <option value="">Todos os tipos</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <label className="flex cursor-pointer items-center gap-2 pb-2 text-sm font-medium">
        <input
          type="checkbox"
          checked={onlyFavorites}
          onChange={(e) => onOnlyFavoritesChange(e.target.checked)}
          className="h-4 w-4 accent-ouro"
        />
        Só favoritas
      </label>

      <button
        type="button"
        onClick={onReset}
        className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/20"
      >
        Limpar filtros
      </button>
    </form>
  )
}
