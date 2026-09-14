# LTP Store — Online Store Coding Challenge

Aplicação de e-commerce simples desenvolvida em **React Router (Remix)**, que permite listar produtos, ver o detalhe de cada um, adicioná-los ao carrinho e rever o conteúdo do carrinho.

## Tecnologias

- **[React Router v8](https://reactrouter.com/)** (modo framework, sucessor do Remix) — routing, loaders e actions server-side
- **React 19**
- **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/vite`) — estilização utility-first
- **[lucide-react](https://lucide.dev/)** — biblioteca de ícones
- **[DummyJSON API](https://dummyjson.com/)** — fonte de dados de produtos e categorias
- **Vite** — bundler / dev server
- Sessão de carrinho guardada em **cookie session** (server-side, via `createCookieSessionStorage`), sem necessidade de base de dados

## Estrutura do projeto

```
app/
  components/
    layout/
      Header.tsx           
      PageWrapper.tsx       
    product/
      ProductCard.tsx      
      ProductGrid.tsx       
      ProductsPanel.tsx    
      CategoriesPanel.tsx  
      SortDropdown.tsx     
      Pagination.tsx        
      ProductGallery.tsx    
      ProductDetails.tsx    
    cart/
      CartItem.tsx          
      CartSummary.tsx      
  lib/
    api.ts                  
    cart.server.ts          
  routes/
    home.tsx                
    product-detail.tsx      
    cart.tsx                
  root.tsx                 
  routes.ts                 
```

## Como correr o projeto

### Pré-requisitos
- Node.js instalado (recomendado LTS mais recente)
- npm (ou outro gestor de pacotes compatível)

### Passos

1. Instalar as dependências:
   ```bash
   npm install
   ```

2. Correr em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
   A aplicação fica disponível em `http://localhost:5173` (ou porta indicada no terminal).

3. Build de produção:
   ```bash
   npm run build
   ```

4. Correr a build de produção:
   ```bash
   npm start
   ```

5. Verificação de tipos (TypeScript):
   ```bash
   npm run typecheck
   ```

## Funcionalidades implementadas

- **Homepage**: listagem de produtos com paginação, ordenação (preço, nome, rating) e filtro por categoria — tudo através de `loader` e query params na URL (permite partilhar/guardar links filtrados)
- **Página de detalhe**: dados do produto vindos de `loader`; botão "Add to Cart" implementado como `action` (formulário POST, com progressive enhancement)
- **Carrinho de compras**:
  - Acessível pelo ícone no header, com contagem de itens
  - Lista de produtos, quantidade (com stepper +/-) e total
  - Remoção de produtos
  - Persistência via cookie session no servidor (não usa `localStorage`)
- **Responsividade**: layout adapta-se a mobile/tablet/desktop (grid de produtos, painéis empilhados, categorias em duas colunas em ecrãs pequenos)

## Notas técnicas

- O carrinho usa `createCookieSessionStorage` do React Router — o estado vive numa cookie `httpOnly`, lida e escrita exclusivamente em `loader`/`action` no servidor.
- O `secrets` da cookie session está definido como valor de desenvolvimento no código; em produção deve vir de uma variável de ambiente.
- Os dados de produtos/categorias vêm sempre de `loader`s (nunca fetch no cliente), seguindo as boas práticas do React Router.