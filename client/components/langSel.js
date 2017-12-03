import languages from "../utilities/languages";
import { dispatchEvent } from "../utilities/eventBus";

//Define Variables
let langSelElem, currentLang;

//Public Methods
const selectLangFn = selectedLang => {
  if (languages.includes(selectedLang)) {
    currentLang = selectedLang;
    langSelElem.value = selectedLang;
    dispatchEvent("langSel:change", currentLang);
  }
};

const getSelectedLangFn = () => {
  return currentLang;
};

//Private Functions

const _onChange = event => {
  selectLangFn(languages[event.target.selectedIndex]);
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
  getSelectedLangFn
};

export default LangSelComp;
