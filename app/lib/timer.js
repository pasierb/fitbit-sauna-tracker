/**
 * @typedef {Object} TimerResult
 * @property {number} startedAt
 * @property {number} stoppedAt
 * @property {number} totalElapsedSeconds
 *
 */

export class Timer {
  constructor() {}

  start = (callback) => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.startedAt = Date.now();
    this.intervalId = setInterval(this.handleTick.bind(this, callback), 1000);
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
    return Math.floor((dateTo - this.startedAt) / 1000);
  };
}
