# Micro Frontend Demo (E-commerce) — Beginner Example

This is a **minimal** example showing how micro frontends work using
**Webpack 5 Module Federation**.

## What's inside

```
micro-frontend-demo/
├── shell/          → Main app (the "container" / host)
├── mfe-products/    → Micro frontend #1 (Product list)
└── mfe-cart/        → Micro frontend #2 (Shopping cart)
```

- `mfe-products` and `mfe-cart` are **independent apps**. Each has its own
  `package.json`, runs on its own port, and can be built/deployed separately.
- `shell` doesn't contain any product or cart code. At **runtime**, it fetches
  `remoteEntry.js` from each micro frontend and mounts them into two `<div>`s.
- The two micro frontends talk to each other using a simple **browser event**
  (`window.dispatchEvent` / `window.addEventListener`) — no shared state
  library needed. This is one common pattern for MFE-to-MFE communication.

## How to run it

Open **3 terminals**.

**Terminal 1 — Products micro frontend**
```bash
cd mfe-products
npm install
npm start
```
Runs on http://localhost:3001

**Terminal 2 — Cart micro frontend**
```bash
cd mfe-cart
npm install
npm start
```
Runs on http://localhost:3002

**Terminal 3 — Shell (main app)**
```bash
cd shell
npm install
npm start
```
Runs on http://localhost:3000 and opens automatically.

Now open **http://localhost:3000**. You'll see:
- A "Products" block — actually loaded live from port 3001
- A "Cart" block — actually loaded live from port 3002

Click "Add to Cart" on a product — the Cart micro frontend (a completely
separate app, on a separate port, built independently) updates instantly.

## Try this to really understand it

1. Stop the shell (Terminal 3) and open http://localhost:3001 directly —
   the Products app still works completely standalone.
2. Change a color or text inside `mfe-products/src/bootstrap.js`, save, and
   refresh the shell — you did NOT touch the shell code at all, yet the
   shell's UI changed. That's the core idea of micro frontends: independent
   teams/apps ship independently, and the shell composes them at runtime.
3. Open `shell/webpack.config.js` and look at the `remotes` field — that's
   the only place the shell "knows about" the other two apps (just a URL).

## The key files to look at

- `shell/webpack.config.js` → `remotes` (consumes other apps)
- `mfe-products/webpack.config.js` → `exposes` (publishes itself)
- `mfe-cart/webpack.config.js` → `exposes` (publishes itself)
- `shell/src/bootstrap.js` → dynamically imports the two remotes
- `mfe-products/src/bootstrap.js` → dispatches `add-to-cart` event
- `mfe-cart/src/bootstrap.js` → listens for `add-to-cart` event
