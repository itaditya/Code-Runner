//Define Variables
let outputFieldElem,
  currentLang,
  callbacksToTrigger = {};

//Public Methods
const setOutputFn = output => {
  outputFieldElem.value = output;
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
  outputFieldElem = document.getElementById("outputTxt");
})();

//Expose Component
const OutputFieldComp = {
  setOutputFn,
  attachCallback
};

export default OutputFieldComp;
