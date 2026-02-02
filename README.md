# Faucet Animation

A vintage pixel-style animation of a faucet dripping water at intervals, with rotating quotes below.

## Run locally

Open `index.html` in a browser. For ES modules to load correctly, use a local server, e.g.:

```bash
npx serve .
# or: python3 -m http.server 8000
```

Then open `http://localhost:3000` (or the port shown).

## Structure

- **index.html** — Faucet, drip zone, and quote block.
- **styles.css** — Vintage pixel look (Press Start 2P, CSS vars for theming).
- **js/main.js** — Entry: starts drips and quote rotation; exposes `window.faucetApp`.
- **js/faucet.js** — Drip creation and interval; `startDripping`, `stopDripping`, `setDripInterval`.
- **js/quotes.js** — Quote list and cycling; `getQuotes`, `setQuotes`, `getNextQuote`.

## Extending

- **Quotes:** Edit `DEFAULT_QUOTES` in `js/quotes.js`, or call `faucetApp.setQuotes([...])` (e.g. after fetching from an API).
- **Drip speed:** Call `faucetApp.setDripInterval(1500)` then `faucetApp.startDripping()` again, or change `--drip-interval` in CSS and `dripIntervalMs` in `faucet.js`.
- **Quote interval:** Change `QUOTE_ROTATE_MS` in `js/main.js`.
- **Theming:** Override CSS variables in `:root` or add `.theme-*` classes in `styles.css`.
- **Controls:** Use `faucetApp.startDripping()`, `faucetApp.stopDripping()` to pause/resume drips.
