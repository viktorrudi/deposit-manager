# Project Structure Overview

## Root
- `README.md` – interview task brief, goals for dashboard/form/table, setup steps, submission instructions.
- `package.json` – React 19 + TypeScript + Vite app with TanStack Query/Table, Tailwind 4 via `@tailwindcss/vite`, shadcn/ui dependencies, and scripts (`dev`, `build`, `lint`, `preview`).
- `tsconfig.json` – references `tsconfig.app.json` and `tsconfig.node.json`.
- `tsconfig.app.json` – strict TS bundler config, `@/*` path alias, React JSX transform, no emit.
- `tsconfig.node.json` – strict settings for tooling like Vite config.
- `eslint.config.js` – ESLint 9 + typescript-eslint setup with React Hooks/Refresh plugins.
- `vite.config.ts` – Vite + React + Tailwind plugins.
- `components.json` – shadcn/ui metadata and alias mapping.
- `docs/dashboard.png` – homepage design reference.
- `index.html` – Vite entry mounting `#root`.
- `dist/` – build output (ignored during development).
- `public/` – static assets (`vite.svg`).
- `server/` – Express mock API (read-only per instructions).
- `src/` – main React client code.

## Server (`/server`)
- `index.js` – Express app exposing `/api/products` (GET/POST with pagination, sorting, validation), `/api/companies`, `/api/users`, `/health`, and Swagger docs. Adds artificial latency.
- `database.js` – SQLite helper handling schema, CRUD, pagination, data conversion.
- `data/` – seed JSON + SQLite DB (`database.sqlite`).
- `README.md` – server usage notes.
- `package.json` – server dependencies (`express`, `cors`, `swagger`, `sqlite3`, etc.).

## Client (`/src`)
- `main.tsx` – entry point setting up global styles, `QueryClientProvider`, router, and root layout.
- `styles/global.css` – Tailwind directives, design tokens, base layer.
- `lib/utils.ts` – `cn` helper combining `clsx` and `tailwind-merge`.
- `assets/` – (currently empty placeholder for future assets).

### API Layer (`/src/api`)
- `common/fetchWrapper.ts` – unified fetch with base URL, query serialization, JSON handling, error normalization.
- `common/types.ts` – `ApiResponse`, success/error discriminated union types.
- `product/` – `types.ts` (product models, pagination info), `index.ts` (`getProducts`, `createProduct`, query param mapping), `hooks.ts` (TanStack Query hook + mutation with cache invalidation).
- `company/` – analogous `types.ts`, `index.ts`, `hooks.ts` returning total company count.
- `user/` – analogous user list fetching and typing.

### Components (`/src/components`)
- shadcn-style primitives: cards, alerts, buttons, navigation menu, table, pagination, skeletons, etc.
- `page-header.tsx` – reusable title/description header with optional icon.

### Modules / Features (`/src/modules`)
- `navigation/` – `layout.tsx` (full-page shell with header + outlet), `header.tsx` (top bar), `top-menu.tsx` (router-aware nav), `logo.tsx`.
- `home/home-page.tsx` – dashboard implementation:
  - Metric cards summarizing active/pending products, companies, users.
  - Quick actions card linking to products page and placeholder “Add new product” button.
  - “Recent products” list pulling latest active products (limit 5, sorted desc).
  - Error handling via shadcn alert and loading states via skeletons.
- `products/products-page.tsx` – placeholder page with header ready for table/filter implementation.

## Tooling & Conventions
- TanStack Query configured with 5-minute stale time and disabled refetch-on-focus.
- React Router v7 using data routers with `createBrowserRouter`.
- Tailwind 4 experimental setup using CSS `@theme` tokens and design system variables.
- TypesScript strictness enforced (`noUnusedLocals`, `noUncheckedSideEffectImports`, etc.).
- Guidelines prohibit modifying `/server`; frontend changes live under `/src`.
