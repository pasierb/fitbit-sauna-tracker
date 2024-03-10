import { readFileSync, existsSync, writeFileSync } from "fs";
import { peerSocket } from "messaging";

const fileName = "measurements.json";

if (!existsSync(fileName)) {
  writeFileSync(fileName, JSON.stringify([]), "json");
}

/**
 * @typedef {Object} Measurement
 * @property {number} totalElapsedSeconds
 * @property {number} startedAt
 * @property {"hot" | "cold"} measurementType
 * @property {boolean} isSynced - Whether or not the measurement has been synced to the server
 */

/**
 * @param {Measurement} measurement
 * @returns {boolean}
 */
function isMeasurementRecent(measurement) {
  return Date.now() - measurement.startedAt < maxLookupTimeInSeconds * 1000;
}

export class Store {
  constructor() {
    /**
     * @type {Measurement[]}
     */
    this.measurements = JSON.parse(readFileSync(fileName, "json"));
  }

  /**
   *
   * @param {Measurement} measurement
   */
  storeMeasurement = (measurement) => {
    this.measurements.push(measurement);
    writeFileSync(fileName, JSON.stringify(this.measurements), "json");
  };

  syncToDevice = () => {
    if (peerSocket.readyState === peerSocket.OPEN) {
      peerSocket.send(this.measurements);
    }
  };
}

export const store = new Store();
