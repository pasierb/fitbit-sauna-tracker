import { MainView } from "./views/mainView";
import { TimerView } from "./views/timerView";
import { store } from "./lib/store";

export class AppState {
  constructor() {
    this.store = store;
    /**
     * @type {Object.<string, import("./views/baseView").View>}
     */
    this.viewMap = {
      main: new MainView(this),
      timerHot: new TimerView(this, "hot"),
      timerCold: new TimerView(this, "cold"),
    };
  }

  /**
   * @param {string} viewKey
   * @returns {Promise<void>}
   */
  changeView = (viewKey) => {
    return this.viewMap[viewKey].mount();
  };
}
