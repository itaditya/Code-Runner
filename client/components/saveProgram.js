import InputFieldComp from "./inputField";
import CodeEditorComp from "./codeEditor";

import { addEvent, dispatchEvent } from "../utilities/eventBus";

//Define Variables
let saveProgramElem, language, input, sourceCode;

//Public Methods

const saveProgram = cb => {
  const body = JSON.stringify({
    title: "hi",
    language,
    input,
    sourceCode
  });
  fetch("/save", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body
  })
    .then(res => {
      if (res.status !== 200) {
        console.error("Couldn't connect to server");
        return;
      }
      res
        .json()
        .then(data => {
          cb(data);
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    })
    .then(() => {});
};

addEvent("langSel:change", currentLang => {
  language = currentLang;
});

//Private Functions

const _onClick = event => {
  saveProgramElem.disabled = true;
  input = InputFieldComp.getInputFn();
  sourceCode = CodeEditorComp.getSourceCodeFn();
  dispatchEvent("saveProgram:click");
  saveProgram(data => {
    saveProgramElem.disabled = false;
    dispatchEvent("saveProgram:save", data);
  });
};

//init
(() => {
  //DOM binding
  saveProgramElem = document.getElementById("saveBtn");

  //Event Bindings
  saveProgramElem.addEventListener("click", _onClick);
})();

//Expose Component
const SaveProgramComp = {
  saveProgram
};

export default SaveProgramComp;
