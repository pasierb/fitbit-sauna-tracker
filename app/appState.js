import { MainView } from "./views/mainView";
import { TimerView } from "./views/timerView";
import { store } from "./lib/store";

export class AppState {
  constructor() {
    this.store = store;
    this.viewMap = {
      main: new MainView(this),
      timerHot: new TimerView(this, "hot"),
      timerCold: new TimerView(this, "cold"),
    };
  }

  changeView = (viewKey) => {
    this.viewMap[viewKey].mount();
  };
}
