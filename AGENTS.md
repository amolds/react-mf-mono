# Repository Guidance

## Workspace

- This is a pnpm monorepo. Workspace packages are under `apps/*` as defined in `pnpm-workspace.yaml`.
- The apps are `shell` (federation host), `customer` (remote), and `orders` (remote). Each app has its own `package.json` and Vite configuration.
- Use the pinned pnpm version from the root `package.json` (`pnpm@12.8.1`).

## Module Federation

- The shell is the host and runs on port `3000`. Customer and orders remotes are configured on ports `3001` and `3002`.
- Keep the remote names, exposed module keys, and shell imports aligned:
  - `customer/CustomersPage` is exposed as `./CustomersPage` from `apps/customer/src/components/CustomerPage.tsx`.
  - `orders/OrdersPage` is exposed as `./OrdersPage` from `apps/orders/src/components/OrdersPage.tsx`.
- Update `apps/shell/src/remotes.d.ts` when adding or renaming typed remote imports.
- Keep remote child route paths relative to the shell route mount (`/customers/*` or `/orders/*`). Use stable absolute URLs for their navigation links.
- With `@originjs/vite-plugin-federation`, run the host in Vite dev mode; remotes must be built and served from their generated `remoteEntry.js` files. Do not expect `vite dev` on a remote to provide its federation entry.

## Build, Lint, and Run

- Validate all apps with `pnpm -r --workspace-concurrency=1 build` followed by `pnpm -r lint`. Build sequentially to avoid resource-related failures.
- There are currently no root `build`, `lint`, or `dev` scripts. Run app scripts with `pnpm --filter <app> <script>` or `pnpm --filter <app> exec <command>`.
- To run the federation setup locally, build all apps, then in separate terminals run:
  - `pnpm --filter customer exec vite preview --host 127.0.0.1 --port 3001 --strictPort`
  - `pnpm --filter orders exec vite preview --host 127.0.0.1 --port 3002 --strictPort`
  - `pnpm --filter shell exec vite --host 127.0.0.1 --strictPort`
- The shell is available at `http://127.0.0.1:3000/` with this local setup.
- Stop the suite with `pnpm stop:dev` from the repository root. It sends `SIGTERM` to listeners on ports `3000`, `3001`, and `3002`; check that no unrelated service is using those ports first. Alternatively, press `Ctrl+C` in each app terminal.

## Product Context

- The intended architecture has the shell owning authentication and hosting the customer and orders pages.
- Authentication/login is not implemented yet. Do not assume routes or components are protected; treat auth as planned work until implemented and tested.
- The customer and orders pages currently contain placeholder content.
