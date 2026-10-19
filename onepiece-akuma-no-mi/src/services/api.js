// Configuração e funções da API (api-onepiece.com, v2 - gratuita e sem chave)
export const BASE_URL = 'https://api.api-onepiece.com/v2'

export const FRUITS_URL = `${BASE_URL}/fruits/en`

// Normaliza os dados: alguns itens da API não têm imagem ou nome japonês.
export function normalizeFruit(fruit) {
  return {
    id: fruit.id,
    name: fruit.name?.trim() || 'Sem nome',
    romanName: fruit.roman_name?.trim() || '',
    type: fruit.type || 'Desconhecido',
    description: fruit.description?.trim() || 'Sem descrição disponível.',
    image: fruit.filename || null,
  }
}

export function normalizeFruits(list) {
  return Array.isArray(list) ? list.map(normalizeFruit) : []
}
