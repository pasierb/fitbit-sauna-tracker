import document from "document";
import { View } from "./baseView";
import { Timer, calculateElapsedSeconds } from "../lib/timer";
import { formatElapsedTime } from "../lib/formatting";

/**
 * @typedef {import("../appState").AppState} AppState
 */

export class TimerView extends View {
  /**
   * @param {AppState} appState
   * @param {"hot" | "cold"} measurementType
   */
  constructor(appState, measurementType) {
    super("timer.view");
    this.appState = appState;
    this.measurementType = measurementType;
    this.timer = new Timer();
  }

  onMount = () => {
    this.statusEl = document.getElementById("status");

    document.getElementById("timerView").class = this.measurementType;
    document
      .getElementById("stopBtn")
      .addEventListener("click", this.handleStopBtnClick);
    document
      .getElementById("cancelBtn")
      .addEventListener("click", this.handleCancelButtonClick);

    const activeMeasurement = this.appState.store.activeMeasurement;
    if (activeMeasurement) {
      this.startTimer(activeMeasurement.startedAt);
    } else {
      this.startTimer();
    }
  };

  startTimer = (maybeStartedAt) => {
    this.udpateTimer(0);
    this.startedAt = this.timer.start(this.udpateTimer, maybeStartedAt);
    if (maybeStartedAt) {
      return;
    }

    this.appState.store.storeMeasurement({
      startedAt: this.startedAt,
      measurementType: this.measurementType,
    });
  };

  udpateTimer = (elapsed) => {
    this.statusEl.text = formatElapsedTime(elapsed);
  };

  handleStopBtnClick = () => {
    const total = this.timer.stop();
    this.appState.store.updateMeasurement(this.startedAt, {
      startedAt: total.startedAt,
      stoppedAt: total.stoppedAt,
      totalElapsedSeconds: total.totalElapsedSeconds,
      measurementType: this.measurementType,
    });
    this.appState.changeView("main");
  };

  handleCancelButtonClick = () => {
    // TODO: Consider adding a confirmation dialog.
    this.appState.store.deleteMeasurement(this.startedAt);
    this.appState.changeView("main");
  };
}
