# React navigation integration

This project now uses React + Vite, TypeScript, Tailwind CSS v4, and shadcn-compatible aliases.

- UI components: `components/ui/`
- Tailwind theme: `styles/globals.css`
- Existing portfolio styling: `styles/portfolio.css`
- Aliases and shadcn configuration: `components.json`

Keeping reusable UI in `components/ui` makes `@/components/ui/...` imports resolve consistently and lets the shadcn CLI install future components in the same location.

Run `pnpm install`, then `pnpm dev`. Run `pnpm build` for TypeScript validation and production output. The standalone supplied demo is at `/demo.html` in development. To add future shadcn components, run `pnpm dlx shadcn@latest add button`. To initialize a fresh project instead, follow https://ui.shadcn.com/docs/installation/vite and run `pnpm dlx shadcn@latest init` after configuring the Vite alias and Tailwind plugin.

The supplied navigation demo is preserved verbatim. The homepage uses Home, Work, About and Contact with real section anchors. Blog is omitted from the homepage because no Blog page exists. No provider or global state is required. Local hover/focus state drives a staggered letter animation using Motion, with reduced-motion support and one accessible label per link.

No image or icon assets are needed by this navigation component. Existing user-supplied photography is retained. Mobile navigation retains the site's existing responsive styles.
