export default function LoadingSpinner({ message = 'Carregando...' }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 py-20"
      role="status"
    >
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-ouro/30 border-t-ouro" />
      <p className="text-sm text-pergaminho/80">{message}</p>
    </div>
  )
}
