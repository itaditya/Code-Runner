import languages from "../utilities/languages";

//Define Variables
let langSelElem,
  currentLang,
  callbacksToTrigger = {};

//Public Methods
const selectLangFn = selectedLang => {
  if (languages.includes(selectedLang)) {
    currentLang = selectedLang;
    langSelElem.value = selectedLang;
  }
};

const getSelectedLangFn = () => {
  return currentLang;
};

const attachCallback = (eventType, callback) => {
  if (!callbacksToTrigger[eventType]) {
    callbacksToTrigger[eventType] = [];
  }
  callbacksToTrigger[eventType].push(callback);
};

//Private Functions

const _onChange = event => {
  console.log("test");
  selectLangFn(languages[event.target.selectedIndex]);
  _triggerCallbacks("change");
};

const _triggerCallbacks = eventType => {
  const callbacks = callbacksToTrigger[eventType];
  for (let i = 0, l = callbacks.length; i < l; i++) {
    callbacks[i]();
  }
};

//init
(() => {
  //DOM binding
  langSelElem = document.getElementById("langSel");

  //Event Bindings
  langSelElem.addEventListener("change", _onChange);

  currentLang = "python";
  selectLangFn(currentLang);
})();

//Expose Component
const LangSelComp = {
  selectLangFn,
  getSelectedLangFn,
  attachCallback
};

export default LangSelComp;
