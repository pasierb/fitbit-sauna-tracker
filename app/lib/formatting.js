function padZero(num) {
  if (num < 10) {
    return "0" + num;
  }

  return "" + num;
}

/**
 *
 * @param {number} elapsed - time in seconds
 * @returns {string}
 */
export function formatElapsedTime(elapsed) {
  let seconds = elapsed % 60;
  const minutes = Math.floor(elapsed / 60);

  return [minutes, seconds].map(padZero).join(":");
}
