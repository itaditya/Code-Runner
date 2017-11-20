import languages from "../utilities/languages";

import ace from "brace";
import "brace/mode/python";
import "brace/mode/c_cpp";
import "brace/mode/java";
import "brace/mode/javascript";
import "brace/theme/solarized_dark";

//Define Variables
let editor,
  currentLang,
  callbacksToTrigger = {};

//Public Methods

const setSourceCodeFn = sourceCode => {
  editor.setValue(sourceCode);
  _onChange();
};

const getSourceCodeFn = () => {
  return editor.getValue();
};

const setLang = lang => {
  if (lang === "c") {
    lang = "c_cpp";
  }
  editor.getSession().setMode(`ace/mode/${lang}`);
};

const attachCallback = (eventType, callback) => {
  callbacksToTrigger[eventType].push(callback);
};

//Private Functions

const _onChange = event => {
  _triggerCallbacks("change");
};

const _triggerCallbacks = (eventType, data) => {
  if (Object.keys(callbacksToTrigger).length === 0) {
    return;
  }
  const callbacks = callbacksToTrigger[eventType];
  for (let i = 0, l = callbacks.length; i < l; i++) {
    callbacks[i](data);
  }
};

//init
(() => {
  //Setup Ace Editor
  editor = ace.edit("editor");

  editor.setTheme("ace/theme/solarized_dark");
  editor.getSession().setUseSoftTabs(true);
  editor.getSession().setTabSize(2);
  editor.getSession().setUseWrapMode(true);
})();

//Expose Component
const CodeEditorComp = {
  setSourceCodeFn,
  getSourceCodeFn,
  setLang,
  attachCallback
};

export default CodeEditorComp;
