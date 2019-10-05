import InputFieldComp from './inputField';
import CodeEditorComp from './codeEditor';

import { addEvent, dispatchEvent } from '../utilities/eventBus';

//Define Variables
let submitProgramElem, language, input, sourceCode, editorElement;

//Public Methods

async function submitProgram() {
  const body = JSON.stringify({
    language,
    input,
    sourceCode
  });
  try {
    const res = await fetch('/submit', {
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
}

addEvent('langSel:change', currentLang => {
  language = currentLang;
});

//Private Functions

async function _onClick(event) {
  submitProgramElem.disabled = true;
  input = InputFieldComp.getInputFn();
  sourceCode = CodeEditorComp.getSourceCodeFn();
  dispatchEvent('submitProgram:click');
  const { stderr, stdout } = await submitProgram();
  let output = stdout;
  if (stderr.length !== 0) {
    output = `Error \n${stderr}`;
  }
  submitProgramElem.disabled = false;
  dispatchEvent('submitProgram:output', output);
}

let MacCMDPressed = false;

const MacCommandKeys = ['MetaLeft', 'MetaRight'];

function _onKeyDown(event) {
  if ((event.ctrlKey || MacCMDPressed) && event.keyCode === 13) {
    _onClick(event);
  }

  if (MacCommandKeys.includes(event.code)) {
    MacCMDPressed = true;
  } else {
    MacCMDPressed = false;
  }
}

//init
(() => {
  //DOM binding
  submitProgramElem = document.getElementById('submitBtn');
  editorElement = document.getElementById('editor');

  //Event Bindings
  submitProgramElem.addEventListener('click', _onClick);
  window.addEventListener('keydown', _onKeyDown);
})();

//Expose Component
const SubmitProgramComp = {
  submitProgram
};

export default SubmitProgramComp;
