# Deployment Guide: MetaLang Authoring GUI

The MetaLang GUI is a React-based web application designed for high-performance ontology authoring.

## 🏗️ Building for Production

To generate a production-ready static bundle:

```bash
# From the root of the monorepo
pnpm build
```

The output will be located in `packages/gui/dist`.

## 🚀 Hosting Options

### 1. Vercel / Netlify (Recommended)
- **Build Command**: `pnpm build`
- **Output Directory**: `packages/gui/dist`
- **Framework Preset**: Vite

### 2. Static Hosting (GitHub Pages, S3)
Simply upload the contents of `packages/gui/dist` to your static host.

## 🔐 GitHub Integration Setup

For the "Submit as PR" feature to work in production:

1. **GitHub PAT**: Users must provide a Personal Access Token with `repo` scope.
2. **CORS**: If hosting on a custom domain, ensure your GitHub settings allow requests from your origin (though Octokit typically handles this via the API).
3. **Configuration**: Use the **Settings** panel in the GUI to define the target `Owner/Repository`.

---

## 🛠️ Local Development

```bash
# Start the dev server
pnpm --filter @metalang/gui dev
```
