# NexusAI Frontend

A modern AI-powered freelance marketplace frontend built with Next.js App Router, Tailwind CSS, React Query, NextAuth, and TypeScript.
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![React Query](https://img.shields.io/badge/React_Query-5-FF4154?style=flat&logo=react-query)](https://tanstack.com/query/latest)
[![NextAuth.js](https://img.shields.io/badge/NextAuth.js-Secure-green?style=flat&logo=next.js)](https://next-auth.js.org/)

This frontend is designed to work with a backend API and provides:
- AI-assisted pitch generation and career coaching
- Gig marketplace browsing and saved listings
- Freelancer, client, and admin dashboards
- Role-based navigation and authentication flows
- Profile management, orders, disputes, and moderation tools
A modern AI-powered freelance marketplace frontend built with **Next.js App Router**, **Tailwind CSS**, **React Query**, **NextAuth**, and **TypeScript**.

---
This frontend is designed to work seamlessly with our backend API, providing a robust platform for freelancers and clients to connect, collaborate, and leverage AI for career growth.

## What’s inside this repository

### Core frontend capabilities
- Public landing pages: home, explore, talent, about, blog, contact, FAQ
- Authentication with email/password and Google login
- Dashboard workspace for freelancers, clients, and admins
- AI-powered pages for pitch generation, analysis, recommendations, and chat
- Marketplace pages for gig browsing, saved gigs, and gig details

### Backend integration
- Central Axios API client in `src/lib/api.ts`
- JWT session token injection using `next-auth` session data
- Backend base URL configured with `NEXT_PUBLIC_API_URL`
- Shared API helpers for auth, gigs, talent, reviews, blog, AI, and admin actions
- Direct backend fetch usage in registration and protected user pages

---

## File structure snapshot
## ✨ Key Features

<details open>
<summary><b>📂 Project structure (click to expand folders)</b></summary>

<!-- app/ -->
<details open>
<summary><b>src/app/</b> — App Router pages & layouts</summary>

```text
src/app/
├── (auth)/
│   ├── login/page.tsx
│   └── register/page.tsx
├── (dashboard)/
│   ├── layout.tsx
│   ├── dashboard/page.tsx
│   ├── dashboard/gigs/page.tsx
│   ├── dashboard/orders/page.tsx
│   ├── dashboard/finances/page.tsx
│   ├── dashboard/messages/page.tsx
│   ├── dashboard/profile/page.tsx
│   ├── dashboard/saved/page.tsx
│   ├── dashboard/billing/page.tsx
│   ├── dashboard/purchases/page.tsx
│   └── dashboard/admin/
│       ├── users/page.tsx
│       ├── moderation/page.tsx
│       └── disputes/page.tsx
├── ai-pitch/page.tsx
├── analytics/page.tsx
├── blog/page.tsx
├── chat/page.tsx
├── contact/page.tsx
├── explore/page.tsx
├── faq/page.tsx
├── about/page.tsx
├── gigs/[slug]/page.tsx
├── talent/page.tsx
├── layout.tsx
└── page.tsx
```

- `login/page.tsx`, `register/page.tsx`: auth UI and flows (uses `next-auth` and direct fetch for register).
- `explore/page.tsx`: gig discovery; calls `gigApi.getGigs(...)` with filters and pagination.
- `gigs/[slug]/page.tsx`: gig details, saved-gigs checks and toggle endpoints.
- Dashboard pages: protected routes reading/writing via `api` and `adminApi` helpers.
</details>

<!-- components/ -->
<details>
<summary><b>src/components/</b> — Reusable UI & page blocks</summary>

```text
src/components/
├── ui/            # button.tsx, input.tsx, card.tsx, tabs.tsx, etc.
├── layout/        # Navbar.tsx, Footer.tsx, DashboardSidebar.tsx
├── cards/         # GigCard.tsx, GigCardSkeleton.tsx, TalentCard.tsx
├── shared/        # UserAvatar.tsx, EmptyState.tsx, Pagination.tsx
└── home/          # HeroSection.tsx, FeaturesSection.tsx, CTASection.tsx
```

- `ui/`: low-level primitives used across the app.
- `layout/`: global and dashboard layout components (Navbar handles auth state).
- `home/`: landing page sections imported by `src/app/page.tsx`.
</details>

<!-- hooks/ -->
<details>
<summary><b>src/hooks/</b> — Custom hooks that call APIs and provide utilities</summary>

```text
src/hooks/
├── useAI.ts        # wraps aiApi (buildPitch, analyzeCareer, chat)
├── useAuth.ts      # next-auth helpers and logout flow
├── useDebounce.ts  # debounce input values
├── useGigs.ts      # React Query hooks for gigs (list, detail, my-gigs)
└── useRole.ts      # helper to check user roles
```

- Hooks use `@tanstack/react-query` and `src/lib/api.ts` helpers to fetch/mutate data.
</details>

<!-- lib/ -->
<details>
<summary><b>src/lib/</b> — API client, auth config, constants, utilities</summary>

```text
src/lib/
├── api.ts            # central Axios instance + api helpers (authApi, gigApi, aiApi, adminApi)
├── auth.ts           # next-auth options and callbacks
├── constants.ts      # ROUTES, API_BASE_URL, demo creds, categories
├── query-client.ts   # React Query default config
└── utils.ts          # small helpers (cn, formatters)
```

- `api.ts` attaches tokens via `getSession()` and exposes typed helpers used across pages.
- `auth.ts` maps backend login responses into NextAuth session tokens.
</details>

<!-- providers/ -->
<details>
<summary><b>src/providers/</b> — App providers</summary>

```text
src/providers/
└── Providers.tsx   # SessionProvider, QueryClientProvider, NextThemesProvider
```

- Wraps the entire app; configures React Query and theme behavior.
</details>

<!-- store/ -->
<details>
<summary><b>src/store/</b> — Zustand stores for small persistent UI state</summary>

```text
src/store/
├── authStore.ts    # persisted auth UI state
├── chatStore.ts    # local AI chat state (drafts, history pointers)
└── uiStore.ts      # global UI toggles (modals, drawers)
```

- These are local-only, complementing server session state from NextAuth.
</details>

<!-- types/ -->
<details>
<summary><b>src/types/</b> — TypeScript interfaces & global types</summary>

```text
src/types/
├── index.ts           # User, Gig, ApiResponse, AI types
├── next-auth.d.ts     # NextAuth session augmentation
└── global.d.ts        # global declarations
```

- Central type definitions used for API responses and frontend models.
</details>

<!-- validations/ -->
<details>
<summary><b>src/validations/</b> — Zod schemas for form validation</summary>

```text
src/validations/
├── auth.schema.ts    # loginSchema, registerSchema
├── pitch.schema.ts   # AI pitch input validation
└── profile.schema.ts # profile update checks
```

- Zod validators are used on the client before sending requests to the backend.
</details>

</details>
### 🎨 Core Frontend Capabilities
- **Public Landing Pages**: Home, explore, talent, about, blog, contact, FAQ.
- **Authentication**: Secure email/password and Google OAuth login via NextAuth.
- **Dashboard Workspaces**: Dedicated, role-based views for Freelancers, Clients, and Admins.
- **AI-Powered Tools**: Pitch generation, resume analysis, tailored recommendations, and an interactive career coach chat.
- **Marketplace**: Comprehensive gig browsing with filtering, saved listings, and detailed gig pages.

### Key directories
- `src/app/` — route-driven pages and layout organization
- `src/components/` — reusable UI, page blocks, dashboard panels, and cards
- `src/lib/` — backend client, auth configuration, constants, and helpers
- `src/hooks/` — custom React hooks interacting with API and session state
- `src/providers/` — application wrappers for React Query, NextAuth, and theme
- `src/store/` — client-side persisted state with Zustand
- `src/types/` — app-wide TypeScript models and API typings
- `src/validations/` — Zod schemas for form validation
### ⚙️ Backend Integration
- **Centralized API Client**: Built with Axios (`src/lib/api.ts`) for clean network requests.
- **Secure Sessions**: JWT session token injection using `next-auth` session data.
- **Shared API Helpers**: Modularized logic for auth, gigs, talent, reviews, blog, AI, and admin actions.
- **Environment Configuration**: Easily configurable backend base URL via `NEXT_PUBLIC_API_URL`.

---

## Backend wiring and data flow
## 🛠️ Tech Stack

### Central API client
- `src/lib/api.ts`
  - Creates an Axios instance with `baseURL` from `API_BASE_URL`
  - Adds `Content-Type: application/json`
  - Uses `getSession()` to attach `Authorization: Bearer <token>` for authenticated requests
  - Normalizes errors for consistent frontend handling
  - Exposes REST helpers:
    - `authApi`
    - `gigApi`
    - `talentApi`
    - `reviewApi`
    - `blogApi`
    - `aiApi`
    - `adminApi`
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand (Client state), TanStack React Query (Server state)
- **Authentication:** NextAuth.js
- **Validation:** Zod

### Authentication config
- `src/lib/auth.ts`
  - Defines `next-auth` options with Credentials and Google providers
  - Credentials provider calls `${API_BASE_URL}/auth/login`
  - Google callback calls `${API_BASE_URL}/auth/google/callback?id_token=...`
  - Maps backend user fields into session token and session objects

### Route-to-backend mapping

#### Auth & onboarding
- `src/app/(auth)/login/page.tsx`
  - Uses `signIn('credentials')` and `signIn('google')`
- `src/app/(auth)/register/page.tsx`
  - POSTs directly to `${API_BASE_URL}/auth/register`
  - Auto-signs in the user after successful registration

#### Marketplace and discovery
- `src/app/explore/page.tsx`
  - Calls `gigApi.getGigs(...)`
  - Sends filters for search, category, price, sorting, page, and limit
- `src/app/gigs/[slug]/page.tsx`
  - Calls `gigApi.getGigBySlug(...)`
  - Loads saved gigs via `api.get('/users/saved-gigs')`
  - Toggles saved status with `api.post('/users/saved-gigs/${gig._id}')`

#### Blog & marketing
- `src/app/blog/page.tsx`
  - Uses `blogApi.getPosts(...)`
- `src/components/home/BlogPreview.tsx`
  - Also fetches `blogApi.getPosts({ limit: 3 })`

#### AI experiences
- `src/app/ai-pitch/page.tsx`
  - Uses `useAI` / `aiApi.chat(...)` for AI pitch generation
- `src/app/chat/page.tsx`
  - Uses `aiApi.chat(...)` to power the career coach chat interface
- `src/app/analytics/page.tsx`
  - Uses `aiApi` or `adminApi` for analytics-style results
- `src/hooks/useAI.ts`
  - Wraps AI mutations and queries in React Query for reusable behavior

#### Dashboard & account
- `src/app/(dashboard)/dashboard/profile/page.tsx`
  - GET `/users/profile`
  - PUT `/users/profile`
  - POST `/users/change-password`
- `src/app/(dashboard)/dashboard/gigs/page.tsx`
  - Calls `gigApi.getMyGigs()` for freelancer listings
- `src/app/(dashboard)/dashboard/orders/page.tsx`
  - Loads buyer or order data from protected backend routes
- `src/app/(dashboard)/dashboard/saved/page.tsx`
  - Uses saved gig APIs and toggles saved state

#### Admin tools
- `src/app/(dashboard)/dashboard/admin/users/page.tsx`
  - Calls `adminApi.getUsers(...)`
  - Toggles user status and updates user roles
- `src/app/(dashboard)/dashboard/admin/moderation/page.tsx`
  - Calls `adminApi.getGigs(...)`
  - Updates gig status via moderation actions
- `src/app/(dashboard)/dashboard/admin/disputes/page.tsx`
  - Calls `adminApi.getDisputes(...)`
  - Resolves disputes with `adminApi.resolveDispute(...)`

---

## Detailed backend contract examples
## 🚀 Getting Started

### `src/lib/constants.ts`
- Defines `API_BASE_URL` from environment variables
- Includes route constants such as `ROUTES.EXPLORE`, `ROUTES.DASHBOARD`, and admin paths
- Contains application data like gig categories, skills pool, experience levels, delivery times, and demo credentials
### 1. Prerequisites
Ensure you have Node.js (v18+ recommended) and npm installed.

### `src/app/(dashboard)/layout.tsx`
- Renders `DashboardSidebar`
- Provides role-aware dashboard layout for authenticated users
### 2. Environment Variables
Create a `.env.local` file in the root directory and add the following:

### `src/app/layout.tsx`
- Wraps all pages with `Providers`
- Includes global `Navbar` and `Footer`
- Sets metadata from `APP_NAME` and `APP_DESCRIPTION`

### `src/providers/Providers.tsx`
- Wraps the app with `SessionProvider`, `QueryClientProvider`, and `NextThemesProvider`
- Configures React Query default options and theme behavior

---

## Environment Variables

Create a `.env.local` file with:

```env
# The main backend endpoint. All API helpers depend on it.
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1

# NextAuth & Google OAuth Credentials
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_SECRET=your-nextauth-secret
```

> `NEXT_PUBLIC_API_URL` is the main backend endpoint. All API helpers depend on it.

---

## Run locally

```bash
npm install
npm run dev
```

Build production:

```bash
npm run build
npm start
```

Lint:

```bash
npm run lint
```

---

## Demo credentials

- Freelancer: `user@nexusai.com` / `Demo@1234`
- Client: `client@nexusai.com` / `Demo@1234`
- Admin: `admin@nexusai.com` / `Demo@1234`

---

## Notes

- This frontend is tightly coupled with a backend API that supports auth, gigs, users, AI, reviews, blog, and admin features.
- `next-auth` manages session state while Axios handles authenticated HTTP requests.
- The layout supports both public marketing and protected dashboard routes.
- The app includes dark mode, responsive design, and reusable UI components.

---

## Potential improvements

- Add complete gig creation/edit workflows in the dashboard
- Improve loading / error states across all pages
- Add AI conversation persistence and history
- Enhance analytics with real backend metrics
- Add stronger type-safe API wrappers for all endpoints
