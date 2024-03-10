import document from "document";
import { View } from "./baseView";
import { Timer } from "../lib/timer";
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

    this.startTimer();
  };

  startTimer = () => {
    this.udpateTimer(0);
    this.timer.start(this.udpateTimer);
  };

  udpateTimer = (elapsed) => {
    this.statusEl.text = formatElapsedTime(elapsed);
  };

  handleStopBtnClick = () => {
    const total = this.timer.stop();
    this.appState.store.storeMeasurement({
      startedAt: total.startedAt,
      totalElapsedSeconds: total.totalElapsedSeconds,
      measurementType: this.measurementType,
    });
    this.appState.changeView("main");
  };
}
