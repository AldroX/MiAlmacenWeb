# AGENTS.md — MiAlmacen

NestJS 11 + Prisma 7 (PostgreSQL) project. Two independent pnpm workspaces — mind the boundary.

## Project layout

- **Root** — pnpm workspace for Prisma tooling only (`prisma`, `dotenv`, `@prisma/client`, `@prisma/adapter-pg`). No `scripts` in `package.json`.
- **`backend/`** — NestJS 11 API. Has its **own** `pnpm-workspace.yaml`, `package.json`, and `node_modules`. The root workspace does **not** declare it as a package — run every backend command from `backend/`.
- **`prisma/`** — Prisma schema + migrations. 6 models: `User` → `Category` → `Product` → `Variant` → `Stock` → `StockMovement`.
- **`src/generated/prisma/`** — Generated Prisma Client (gitignored at root `.gitignore`).

## Database

PostgreSQL 16 via Docker — **start from `backend/`**:

```bash
cd backend
docker compose up -d
```

Defaults: DB=`mialmacen`, User=`mialmacen`, Password=`mialmacen_dev`, Port=`5432`. Override via `POSTGRES_DB`/`POSTGRES_USER`/`POSTGRES_PASSWORD`/`POSTGRES_PORT` in `backend/.env`.

`DATABASE_URL` lives in root `.env` and is consumed by `prisma7.config.ts` via `process.env["DATABASE_URL"]`.

## Prisma (v7)

Config is auto-discovered from `prisma7.config.ts` at root (verified — Prisma finds it without `--config`).

```bash
pnpm prisma generate                         # from root — regenerate client after schema changes
pnpm prisma db push                          # from root — push schema to DB (dev, no migration)
pnpm prisma db migrate dev --name <name>     # from root — create + apply migration
pnpm prisma studio                           # from root — GUI
```

> `src/generated/prisma/` is gitignored. Run `prisma generate` after every `prisma/schema.prisma` edit.

If `pnpm` is blocked by PowerShell execution policy in this environment, use:
```bash
node node_modules/prisma/build/index.js <command>   # from root
```

## Backend (NestJS 11)

```bash
cd backend
pnpm install         # install deps
pnpm run start:dev   # dev server, watches on port 3000
pnpm run build       # compile to dist/
pnpm run start:prod  # run production build from dist/
pnpm test            # unit tests (Jest)
pnpm test:e2e        # e2e tests
pnpm run lint        # ESLint — auto-fixes
pnpm run format      # Prettier
```

Env is loaded via `@nestjs/config` (`ConfigModule.forRoot({ isGlobal: true })` in `AppModule`). Port: `process.env.PORT ?? 3000` in `main.ts`.

**Starter state**: `AppModule` only imports `ConfigModule` — no PrismaModule is wired yet. Deps are installed but Prisma is not registered in DI.

## TypeScript & linting

- `backend/tsconfig.json`: `module: "nodenext"`, `moduleResolution: "nodenext"`, `strictNullChecks: true`, but `noImplicitAny: false` and `strictBindCallApply: false` — not fully strict.
- ESLint (`backend/eslint.config.mjs`): flat config, `recommendedTypeChecked` + Prettier. `@typescript-eslint/no-explicit-any` is **off**; `no-floating-promises` and `no-unsafe-argument` are **warn**.
- Prettier (`backend/.prettierrc`): single quotes, trailing commas `all`.

## Testing

- Jest 30 + ts-jest. Unit tests match `.*\.spec\.ts$` under `src/`. E2e tests match `.*\.e2e-spec.ts$` under `test/` (config: `test/jest-e2e.json`).
- E2e tests use `supertest`. Unit tests do not require a database.

## Skill registry

Project-specific Prisma skills live in `.claude/skills/` (mirrored to `.agents/skills/`). Registry: `.atl/skill-registry.md`. Load relevant skills before writing Prisma queries.
