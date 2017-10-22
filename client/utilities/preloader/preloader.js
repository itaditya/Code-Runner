import "./preloader.scss";
export class Preloader {
  constructor(config, elem) {
    console.log(elem);
    this.domElem = document.querySelector(elem);
    this.init();
  }
  init() {
    this.domElem.classList.add("preloader-elem");
  }
  showLoader() {
    console.log("loaded");
    this.domElem.classList.add("loading");
  }
  hideLoader() {
    console.log("loaded");
    this.domElem.classList.remove("loading");
  }
}
