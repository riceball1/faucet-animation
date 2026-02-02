/**
 * Faucet drip logic — extend: change interval, drip count, drip style.
 * Export: startDripping(), stopDripping(), createDrip(), setDripInterval()
 */

let dripIntervalId = null;
let dripIntervalMs = 5000; // match CSS --drip-interval (2s)
const DRIP_ANIMATION_MS = 2000;

/**
 * Create a single drip element, animate, then remove.
 * @param {HTMLElement} container - Element with id="drip-zone"
 * @param {() => void} [onComplete] - Called when the drip is removed (disappears)
 */
export function createDrip(container, onComplete) {
  if (!container) return;
  const drip = document.createElement("div");
  drip.className = "drip";
  drip.setAttribute("aria-hidden", "true");
  container.appendChild(drip);
  // Remove after animation ends (leave a little buffer), then notify
  setTimeout(() => {
    if (drip.parentNode) drip.remove();
    onComplete?.();
  }, DRIP_ANIMATION_MS + 100);
}

/**
 * Start dripping at the current interval.
 * @param {HTMLElement} [container] - Optional drip zone; uses #drip-zone if not passed
 * @param {{ onDripComplete?: () => void }} [options] - onDripComplete called when each drip disappears
 */
export function startDripping(container, options = {}) {
  const zone = container ?? document.getElementById("drip-zone");
  const onDripComplete = options?.onDripComplete;
  if (!zone) return;
  stopDripping();
  createDrip(zone, onDripComplete);
  dripIntervalId = setInterval(() => createDrip(zone, onDripComplete), dripIntervalMs);
}

/**
 * Stop the drip interval (drips already in DOM will still finish animating).
 */
export function stopDripping() {
  if (dripIntervalId !== null) {
    clearInterval(dripIntervalId);
    dripIntervalId = null;
  }
}

/**
 * Set drip interval in milliseconds (e.g. 1500 for faster).
 * Does not restart; call startDripping() again to apply.
 * @param {number} ms
 */
export function setDripInterval(ms) {
  if (typeof ms === "number" && ms > 0) dripIntervalMs = ms;
}

/**
 * Get current drip interval in ms (for UI or extensions).
 * @returns {number}
 */
export function getDripInterval() {
  return dripIntervalMs;
}
