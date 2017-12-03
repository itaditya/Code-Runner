import { dispatchEvent } from '../utilities/eventBus';

//Define Variables
let inputFieldElem, currentLang;

//Public Methods

const getInputFn = () => {
  return inputFieldElem.value;
};

const setInputFn = input => {
  inputFieldElem.value = input;
  dispatchEvent('inputField:change', input);
};

//init
(() => {
  //DOM binding
  inputFieldElem = document.getElementById('inputTxt');
})();

//Expose Component
const InputFieldComp = {
  getInputFn,
  setInputFn
};

export default InputFieldComp;
