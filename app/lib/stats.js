import { firstDayOfWeek } from "user-settings";
import { Store } from "./store";

const duration12Hours = 60 * 60 * 12 * 1000;
const duration7Days = 60 * 60 * 24 * 7 * 1000;
const duration30Days = 60 * 60 * 24 * 30 * 1000;

/**
 * @param {Date} date
 */
function startOfWeek(date) {
  const weekStartDay = firstDayOfWeek || 0;
  const day = date.getDay();
  const diff = (day < weekStartDay ? 7 : 0) + day - weekStartDay;

  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

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

  get thisWeek() {
    const start = startOfWeek(new Date(), 0);
    return new AggregateStats(
      this.store.measurements.filter(
        (measurement) => measurement.startedAt > start.getTime()
      )
    );
  }

  get previousWeek() {
    const start = startOfWeek(new Date(), 0);
    start.setDate(start.getDate() - 7);
    const end = new Date(start);
    end.setDate(end.getDate() + 7);

    return new AggregateStats(
      this.store.measurements.filter(
        (measurement) => measurement.startedAt > start.getTime() && measurement.startedAt < end.getTime()
      )
    );
  }

  /**
   * @type {AggregateStats}
   */
  get last7Days() {
    return new AggregateStats(
      this.store.measurements.filter(
        (measurement) => measurement.startedAt > Date.now() - duration7Days
      )
    );
  }

  /**
   * @type {AggregateStats}
   */
  get last30Days() {
    return new AggregateStats(
      this.store.measurements.filter(
        (measurement) => measurement.startedAt > Date.now() - duration30Days
      )
    );
  }

  /**
   * @type {AggregateStats}
   */
  get recent() {
    return new AggregateStats(
      this.store.measurements.filter(
        (measurement) => measurement.startedAt > Date.now() - duration12Hours
      )
    );
  }
}
