/**
 *
 * @param {number} elapsed - time in seconds
 * @returns {string}
 */
export function formatElapsedTime(elapsed) {
  let seconds = (elapsed % 60) + "";
  const minutes = Math.floor(elapsed / 60);

  if (seconds.length < 2) {
    seconds = "0" + seconds;
  }

  return [minutes, seconds].join(":");
}
