import document from "document";

export class View {
  constructor(viewPath) {
    this.viewPath = viewPath;
  }

  onMount = () => {};

  /**
   * @returns {Promise<void>}
   */
  mount = () => {
    return document.location.assign(this.viewPath).then(() => {
      this.onMount();
    });
  };
}
