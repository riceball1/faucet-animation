/**
 * Quote management — extend with API, more quotes, or filters.
 * Export: getQuotes(), getNextQuote(), setQuotes()
 */

const DEFAULT_QUOTES = [
  { text: "Water does not resist. Water flows.", author: "Margaret Atwood" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "Drip by drip the bucket gets filled.", author: "Buddha" },
  { text: "The best time to plant a tree was twenty years ago.", author: "Chinese Proverb" },
  { text: "Patience is bitter, but its fruit is sweet.", author: "Aristotle" },
];

let quotes = [...DEFAULT_QUOTES];
let currentIndex = -1;

/**
 * Get the current list of quotes (for extension: filter, shuffle, etc.)
 * @returns {Array<{ text: string, author: string }>}
 */
export function getQuotes() {
  return [...quotes];
}

/**
 * Replace or extend the quote list (e.g. from API).
 * @param {Array<{ text: string, author: string }>} newQuotes
 */
export function setQuotes(newQuotes) {
  if (Array.isArray(newQuotes) && newQuotes.length > 0) {
    quotes = newQuotes.map((q) => ({
      text: q.text ?? "",
      author: q.author ?? "",
    }));
    currentIndex = -1;
  }
}

/**
 * Get the next quote in sequence (wraps around).
 * @returns {{ text: string, author: string } | null}
 */
export function getNextQuote() {
  if (quotes.length === 0) return null;
  currentIndex = (currentIndex + 1) % quotes.length;
  return quotes[currentIndex];
}
