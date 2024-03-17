import document from "document";
import { View } from "./baseView";
import { Stats } from "../lib/stats";
import { formatElapsedTime } from "../lib/formatting";

export class MainView extends View {
  /**
   *
   * @param {import("../appState").AppState} appState
   */
  constructor(appState) {
    super("main.view");
    this.appState = appState;
    this.stats = new Stats(appState.store);
  }

  onMount = () => {
    this.maybeRestoreMeasurement(this.appState.store.activeMeasurement);

    document
      .getElementById("hotBtn")
      .addEventListener("click", this.handleHotBtnClick);
    document
      .getElementById("coldBtn")
      .addEventListener("click", this.handleColdBtnClick);
    document.getElementById("hotTotal").text = formatElapsedTime(
      this.stats.recent.hotTotal
    );
    document.getElementById("coldTotal").text = formatElapsedTime(
      this.stats.recent.coldTotal
    );
    this.fillAggregatedStats("aggThisWeek", this.stats.thisWeek);
    this.fillAggregatedStats("aggPrevWeek", this.stats.previousWeek);
  };

  handleHotBtnClick = () => {
    this.appState.changeView("timerHot");
  };

  handleColdBtnClick = () => {
    this.appState.changeView("timerCold");
  };

  /**
   *
   * @param {import("../lib/store").Measurement} measurement
   */
  maybeRestoreMeasurement = (measurement) => {
    if (!measurement) {
      return;
    }

    switch (measurement.measurementType) {
      case "hot":
        this.appState.changeView("timerHot");
        break;
      case "cold":
        this.appState.changeView("timerCold");
        break;
      default:
        break;
    }
  };

  /**
   *
   * @param {String} id - The id of the element to fill
   * @param {import("../lib/stats").Stats} stats - The stats to fill the element with
   */
  fillAggregatedStats = (id, stats) => {
    const container = document.getElementById(id);

    container.getElementsByClassName("hotTotal")[0].text = formatElapsedTime(
      stats.hotTotal
    );
    container.getElementsByClassName("coldTotal")[0].text = formatElapsedTime(
      stats.coldTotal
    );
  };
}
