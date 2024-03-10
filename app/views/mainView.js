import document from "document";
import { View } from "./baseView";
import { Stats } from "../lib/stats";
import { formatElapsedTime } from "../lib/formatting";

export class MainView extends View {
  constructor(appState) {
    super("main.view");
    this.appState = appState;
    this.stats = new Stats(appState.store);
  }

  onMount = () => {
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
  };

  handleHotBtnClick = () => {
    this.appState.changeView("timerHot");
  };

  handleColdBtnClick = () => {
    this.appState.changeView("timerCold");
  };
}
