import { dispatchEvent } from '../utilities/eventBus';

//Define Variables
let outputFieldElem, currentLang;

//Public Methods
const setOutputFn = output => {
  outputFieldElem.value = output;
  dispatchEvent('outputField:change', output);
};

//init
(() => {
  //DOM binding
  outputFieldElem = document.getElementById('outputTxt');
})();

//Expose Component
const OutputFieldComp = {
  setOutputFn
};

export default OutputFieldComp;
