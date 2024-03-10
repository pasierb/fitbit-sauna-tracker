import { Store } from "./store";

/**
 * @type {number} - The maximum time in seconds to look back for recent measurements.
 */
const maxLookupTimeInSeconds = 60 * 60 * 3; // 3 hours.

const duration7Days = 60 * 60 * 24 * 7 * 1000;
const duration12Hours = 60 * 60 * 12 * 1000;

class AggregateStats {
  /**
   *
   * @param {import("./store").Measurement[]} measurements
   */
  constructor(measurements) {
    this.measurements = measurements;
  }

  get coldTotal() {
    return this.measurements
      .filter((measurement) => measurement.measurementType === "cold")
      .reduce((acc, measurement) => acc + measurement.totalElapsedSeconds, 0);
  }

  get hotTotal() {
    return this.measurements
      .filter((measurement) => measurement.measurementType === "hot")
      .reduce((acc, measurement) => acc + measurement.totalElapsedSeconds, 0);
  }
}

export class Stats {
  /**
   *
   * @param {Store} store
   */
  constructor(store) {
    this.store = store;
  }

  get now() {
    return Date.now();
  }

  /**
   * @type {AggregateStats}
   */
  get last7Days() {
    return new AggregateStats(
      this.store.measurements.filter(
        (measurement) => measurement.startedAt > this.now - duration7Days
      )
    );
  }

  /**
   * @type {AggregateStats}
   */
  get recent() {
    return new AggregateStats(
      this.store.measurements.filter(
        (measurement) => measurement.startedAt > this.now - duration12Hours
      )
    );
  }
}
