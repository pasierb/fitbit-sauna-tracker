/**
 * @typedef {Object} TimerResult
 * @property {number} startedAt
 * @property {number} stoppedAt
 * @property {number} totalElapsedSeconds
 *
 */

/**
 *
 * @param {number} startedAt
 * @param {number} stoppedAt
 * @returns {number} seconds from startedAt to stoppedAt
 */
export function calculateElapsedSeconds(startedAt, stoppedAt) {
  return Math.floor((stoppedAt - startedAt) / 1000);
}

export class Timer {
  constructor() {}

  /**
   *
   * @param {*} callback
   * @returns {number} startedAt
   */
  start = (callback, startedAt) => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.startedAt = startedAt || Date.now();
    this.intervalId = setInterval(this.handleTick.bind(this, callback), 1000);
    return this.startedAt;
  };

  /**
   *
   * @returns {TimerResult}
   */
  stop = () => {
    this.stoppedAt = Date.now();
    const totalElapsed = this.calculateElapsed(this.stoppedAt);
    clearInterval(this.intervalId);

    return {
      startedAt: this.startedAt,
      stoppedAt: this.stoppedAt,
      totalElapsedSeconds: totalElapsed,
    };
  };

  handleTick = (callback) => {
    const elapsed = this.calculateElapsed(Date.now());
    callback(elapsed);
  };

  calculateElapsed = (dateTo) => {
    return calculateElapsedSeconds(this.startedAt, dateTo);
  };
}
