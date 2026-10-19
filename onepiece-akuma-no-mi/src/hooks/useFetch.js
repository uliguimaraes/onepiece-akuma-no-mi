import { useEffect, useState } from 'react'

// Custom hook genérico para requisições HTTP GET.
// Retorna { data, loading, error, refetch }.
export default function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(url, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Erro ${response.status} ao buscar os dados`)
        }
        setData(await response.json())
      } catch (err) {
        // AbortError acontece ao desmontar: não é erro de verdade
        if (err.name !== 'AbortError') {
          setError(err.message || 'Não foi possível carregar os dados')
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    load()
    return () => controller.abort()
  }, [url, reloadKey])

  const refetch = () => setReloadKey((key) => key + 1)

  return { data, loading, error, refetch }
}
