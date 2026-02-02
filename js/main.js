/**
 * Main entry — wires faucet drips and quote rotation.
 * Extend: add controls, themes, or other modules here.
 */

import { startDripping, setDripInterval, stopDripping } from "./faucet.js";
import { getNextQuote, getQuotes, setQuotes } from "./quotes.js";

function getElements() {
  return {
    quoteText: document.getElementById("quote-text"),
    quoteCite: document.getElementById("quote-cite"),
    dripZone: document.getElementById("drip-zone"),
  };
}

function showQuote() {
  const { quoteText, quoteCite } = getElements();
  if (!quoteText || !quoteCite) return;
  const quote = getNextQuote();
  if (!quote) return;
  // Optional: add fade-out then update then fade-in (see styles .fade-out / .fade-in)
  quoteText.classList.remove("fade-in");
  quoteText.classList.add("fade-out");
  setTimeout(() => {
    quoteText.textContent = `"${quote.text}"`;
    quoteCite.textContent = quote.author ? `— ${quote.author}` : "";
    quoteText.classList.remove("fade-out");
    quoteText.classList.add("fade-in");
  }, 400);
}

function init() {
  const { dripZone } = getElements();
  showQuote(); // show first quote immediately
  startDripping(dripZone, { onDripComplete: showQuote }); // change quote when each droplet disappears
}

// Optional: expose for extensions (e.g. pause/resume, change interval)
window.faucetApp = {
  init,
  startDripping,
  stopDripping,
  setDripInterval,
  getQuotes,
  setQuotes,
};

init();
