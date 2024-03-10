import { Store } from "./store";

const maxLookupTimeInSeconds = 60 * 60 * 3;

export class Stats {
  /**
   *
   * @param {Store} store
   */
  constructor(store) {
    this.store = store;
  }

  get recentMeasurements() {
    return this.store.measurements.filter(
      (measurement) =>
        Date.now() - measurement.startedAt < maxLookupTimeInSeconds * 1000
    );
  }

  get coldTotal() {
    return this.store.measurements
      .filter((measurement) => measurement.measurementType === "cold")
      .reduce((acc, measurement) => acc + measurement.totalElapsedSeconds, 0);
  }

  get hotTotal() {
    return this.store.measurements
      .filter((measurement) => measurement.measurementType === "hot")
      .reduce((acc, measurement) => acc + measurement.totalElapsedSeconds, 0);
  }
}
