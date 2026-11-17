# tihn.dev Portfolio

Static Astro 7 site using [Vite+](https://viteplus.dev/guide/) 1.7.0 for Vite,
linting, formatting, and task execution. Use Node.js `^22.23.4 || ^24.11.0 || >=26.0.0`
and Bun 1.4.4 (declared in `packageManager`).

```sh
vp install
vp run dev       # Astro development server
vp run check     # Oxc checks, TypeScript 7, then Astro diagnostics
vp run build     # Astro diagnostics and the production build in dist/
vp run preview   # Preview the Astro production build
vp fmt           # Format files using the migrated settings
```

With no global `vp`, use `bun install` and prefix commands with `bunx --no-install`,
for example `bunx --no-install vp run dev`.

`vp dev` and `vp build` run the built-in Vite commands; they do not invoke Astro.
Use `vp run <task>` for project scripts, including `dev`, `build`, and `preview`.
Keep Astro configuration in `astro.config.ts` and import aliases in `tsconfig.json`; Vite+ lint, format,
and staged-file settings live in `vite.config.ts`. The pre-commit hook runs
`vp staged` to check and fix staged files.

Astro 7 is required for Vite+'s Vite 8 toolchain. `compressHTML: true` retains
the previous HTML whitespace behavior.

TypeScript 7.0.2 is the project compiler. Astro's current checker still needs
the TypeScript 6 compiler API, so `typescript-astro` supplies that API only to
the Astro diagnostics and language-server processes. `scripts/check-astro.ts`
uses the same `AstroCheck` engine as `astro check`, including errors, warnings,
and hints. Remove this compatibility adapter when Astro supports stable
TypeScript 7 diagnostics.

Open the project in Zed with the **Astro**, **Oxc**, and **TypeScript Language
Server** (`tsgo`) extensions installed. `.zed/settings.json` configures the
project-local servers, Oxfmt on save, and safe Oxlint fixes for JavaScript and
TypeScript. `.zed/tasks.json` provides dev, check, build, preview, lint, format,
and type-check tasks through Vite+.

Bun Guard is disabled and its dependency removed. The three-day release-age
setting remains in `bunfig.toml`.

There are currently no automated tests, coverage, browser, or benchmark suites.
`vp test --run` runs Vitest and reports that no test files exist; use
`vp run check` and `vp run build` to validate the site.
