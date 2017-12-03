import './preloader.scss';
class Preloader {
  constructor(config, elem) {
    this.domElem = document.querySelector(elem);
    this.domElem.classList.add('preloader-elem');
  }
  showLoader() {
    this.domElem.classList.add('loading');
  }
  hideLoader() {
    this.domElem.classList.remove('loading');
  }
}

export default Preloader;
