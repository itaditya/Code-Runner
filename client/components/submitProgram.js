import InputFieldComp from "./inputField";
import CodeEditorComp from "./codeEditor";

import { addEvent, dispatchEvent } from "../utilities/eventBus";

//Define Variables
let submitProgramElem, language, input, sourceCode;

//Public Methods

const submitProgram = cb => {
  const body = JSON.stringify({
    language,
    input,
    sourceCode
  });
  fetch("/submit", {
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
          console.log("b", err);
        });
    })
    .catch(err => {
      console.log("a", err);
    })
    .then(() => {});
};

addEvent("langSel:change", currentLang => {
  language = currentLang;
});

//Private Functions

const _onClick = event => {
  submitProgramElem.disabled = true;
  input = InputFieldComp.getInputFn();
  sourceCode = CodeEditorComp.getSourceCodeFn();
  dispatchEvent("submitProgram:click");
  submitProgram(({ stderr, stdout }) => {
    let output = stdout;
    if (stderr.length !== 0) {
      output = `Error \n${stderr}`;
    }
    submitProgramElem.disabled = false;
    dispatchEvent("submitProgram:output", output);
  });
};

//init
(() => {
  //DOM binding
  submitProgramElem = document.getElementById("submitBtn");

  //Event Bindings
  submitProgramElem.addEventListener("click", _onClick);
})();

//Expose Component
const SubmitProgramComp = {
  submitProgram
};

export default SubmitProgramComp;
