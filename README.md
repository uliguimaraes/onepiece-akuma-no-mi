Akuma no Mi — Catálogo Interativo de One Piece
Aplicação web em React que lista as Frutas do Diabo (Akuma no Mi) de One Piece, com busca, filtro por tipo, detalhes e favoritos. Desenvolvida para a Avaliação Prática AP2 da disciplina Desenvolvimento de Aplicação Orientada a Componentes (ADS, ULBRA Campus Torres).

Às vezes preparado
React 19 (hooks: useState, useEffect, useMemo)
Vite
Tailwind CSS v4 (plugin oficial para Vite)
API REST pública api-onepiece.com
API utilizada
Base:https://api.api-onepiece.com/v2
Endpoint usado: GET /fruits/en— retorna a lista completa de Akuma no Mi (id, nome, nome em japonês romanizado, tipo, descrição e imagem).
Não exige chave de API e tem CORS liberado.
Funcionalidades (requisitos da AP2)
Requisito	Onde está
Listagem de dados	ItemList.jsxrenderiza um ItemCard.jsxpara cada fruta
Busca/filtro	SearchForm.jsx(texto, tipo e "só favoritas")
Componentização	components/, pages/, hooks/,services/
useState	Home.jsx(busca, tipo, seleção, favoritas, paginação)
useEffect+ API	hooks/useFetch.js(com AbortControllere array de dependências [url, reloadKey])
Ganchos personalizados	useFetch.jseuseLocalStorage.js
†	SearchForm.jsx(entradas controladas por estado do pai)
Tailwind responsivo	Grade de 1 a 4 colunas ( sm:, lg:, xl:), tema próprio emindex.css
Extras: estado de carregamento, tratamento de erro com botão "Tentar de novo", modal de detalhes (fecha com ESC), favoritas salvas no localStoragee botão "Carregar mais".

Estrutura do projeto
src/
├── components/
│   ├── ItemCard.jsx
│   ├── ItemList.jsx
│   ├── ItemDetails.jsx
│   ├── SearchForm.jsx
│   └── LoadingSpinner.jsx
├── hooks/
│   ├── useFetch.js
│   └── useLocalStorage.js
├── services/
│   └── api.js
├── pages/
│   └── Home.jsx
├── App.jsx
├── main.jsx
└── index.css
Instalação e execução
Pré-requisito: Node.js 20 ou superior.

npm install
npm run dev
Abra o endereço mostrado no terminal (normalmente http://localhost:5173).

Para gerar a versão de produção:

npm run build
npm run preview
Autor
Ulisses "kakarotto" Guimarães — ADS, ULBRA Campus Torres.

LinkedIn: https://www.linkedin.com/in/ulisses-guimaraes-
GitHub: https://github.com/uliguimaraes
