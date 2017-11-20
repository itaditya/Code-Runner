//Define Variables
let inputFieldElem,
  currentLang,
  callbacksToTrigger = {};

//Public Methods

const getInputFn = () => {
  return inputFieldElem.value;
};

const setInputFn = input => {
  inputFieldElem.value = input;
  _triggerCallbacks("change");
};

const attachCallback = (eventType, callback) => {
  if (!callbacksToTrigger[eventType]) {
    callbacksToTrigger[eventType] = [];
  }
  callbacksToTrigger[eventType].push(callback);
};

//Private Functions

const _triggerCallbacks = eventType => {
  console.log(eventType);
  if (Object.keys(callbacksToTrigger).length === 0) {
    return;
  }
  const callbacks = callbacksToTrigger[eventType];
  for (let i = 0, l = callbacks.length; i < l; i++) {
    callbacks[i]();
  }
};

//init
(() => {
  //DOM binding
  inputFieldElem = document.getElementById("inputTxt");
})();

//Expose Component
const InputFieldComp = {
  getInputFn,
  setInputFn,
  attachCallback
};

export default InputFieldComp;
