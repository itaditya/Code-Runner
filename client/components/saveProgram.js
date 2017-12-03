import InputFieldComp from './inputField';
import CodeEditorComp from './codeEditor';

import { addEvent, dispatchEvent } from '../utilities/eventBus';

//Define Variables
let saveProgramElem, language, input, sourceCode;

//Public Methods

const saveProgram = async function(cb) {
  const body = JSON.stringify({
    title: 'hi',
    language,
    input,
    sourceCode
  });
  try {
    const res = await fetch('/save', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body
    });
    if (res.status !== 200) {
      console.error("Couldn't connect to server");
      return;
    }
    return res.json();
  } catch (err) {
    console.error(err);
  }
};

addEvent('langSel:change', currentLang => {
  language = currentLang;
});

//Private Functions

const _onClick = async function(event) {
  saveProgramElem.disabled = true;
  input = InputFieldComp.getInputFn();
  sourceCode = CodeEditorComp.getSourceCodeFn();
  dispatchEvent('saveProgram:click');
  const programData = await saveProgram();
  saveProgramElem.disabled = false;
  dispatchEvent('saveProgram:save', programData);
};

//init
(() => {
  //DOM binding
  saveProgramElem = document.getElementById('saveBtn');

  //Event Bindings
  saveProgramElem.addEventListener('click', _onClick);
})();

//Expose Component
const SaveProgramComp = {
  saveProgram
};

export default SaveProgramComp;
