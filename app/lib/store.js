import { readFileSync, existsSync, writeFileSync } from "fs";

const fileName = "measurements.json";

if (!existsSync(fileName)) {
  writeFileSync(fileName, JSON.stringify([]), "json");
}

/**
 * @typedef {Object} Measurement
 * @property {number} totalElapsedSeconds
 * @property {number} startedAt
 * @property {number} stoppedAt
 * @property {"hot" | "cold"} measurementType
 * @property {boolean} isSynced - Whether or not the measurement has been synced to the server
 */

/**
 * @param {Measurement[]} measurements
 * @param {number} startedAt
 * @returns {number} index of the measurement
 */
function findMeasurementIndex(measurements, startedAt) {
  for (let i = measurements.length - 1; i >= 0; i--) {
    if (measurements[i].startedAt === startedAt) {
      return i;
    }
  }

  return -1;
}

export class Store {
  constructor() {
    /**
     * @type {Measurement[]}
     */
    this.measurements = JSON.parse(readFileSync(fileName, "json"));
  }

  get activeMeasurement() {
    const lastIndex = this.measurements.length - 1;

    if (lastIndex < 0 || !!this.measurements[lastIndex].stoppedAt) {
      return null;
    }

    return this.measurements[lastIndex];
  }

  /**
   * @param {Measurement} measurement
   */
  storeMeasurement = (measurement) => {
    this.measurements.push(measurement);
    this.syncToDevice();
  };

  /**
   * @param {number} startedAt
   * @param {Measurement} measurement
   * @returns {Measurement}
   */
  updateMeasurement = (startedAt, measurement) => {
    const index = findMeasurementIndex(this.measurements, startedAt);
    if (index < 0) {
      throw new Error("Measurement not found");
    }
    this.measurements[index] = measurement;
    this.syncToDevice();
    return this.measurements[index];
  };

  syncToDevice = () => {
    writeFileSync(fileName, JSON.stringify(this.measurements), "json");
  };
}

export const store = new Store();
