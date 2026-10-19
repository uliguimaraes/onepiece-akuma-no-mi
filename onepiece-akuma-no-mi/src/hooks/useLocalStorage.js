import { useEffect, useState } from 'react'

// Custom hook que funciona como useState, mas persiste o valor no localStorage.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // localStorage indisponível: segue só em memória
    }
  }, [key, value])

  return [value, setValue]
}
