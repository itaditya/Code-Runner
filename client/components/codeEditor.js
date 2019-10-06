import languages from '../utilities/languages';
import { dispatchEvent } from '../utilities/eventBus';

import ace from 'brace';
import 'brace/mode/python';
import 'brace/mode/c_cpp';
import 'brace/mode/java';
import 'brace/mode/javascript';
import 'brace/theme/solarized_dark';

//Define Variables
let editor, currentLang;

//Public Methods

const setSourceCodeFn = sourceCode => {
  editor.setValue(sourceCode);
  _onChange();
};

const getSourceCodeFn = () => {
  return editor.getValue();
};

const setLang = lang => {
  if (lang === 'c' || lang === 'cpp') {
    lang = 'c_cpp';
  }
  editor.getSession().setMode(`ace/mode/${lang}`);
};

//Private Functions
const _onChange = event => {
  dispatchEvent('codeEditor:change');
};

let MacCMDPressed = false;

const MacCommandKeys = ['MetaLeft', 'MetaRight'];

const _onKeydown = event => {
  if ((event.ctrlKey || MacCMDPressed) && event.keyCode === 13) {
    dispatchEvent('codeEditor:runcode');
  }

  if (MacCommandKeys.includes(event.code)) {
    MacCMDPressed = true;
  } else {
    MacCMDPressed = false;
  }
};

//init
(() => {
  //Setup Ace Editor
  editor = ace.edit('editor');
  editor.container.addEventListener('keydown', _onKeydown);

  editor.setTheme('ace/theme/solarized_dark');

  const session = editor.getSession();
  session.setUseSoftTabs(true);
  session.setTabSize(2);
  session.setUseWrapMode(true);

  const savedProgram = JSON.parse(document.body.dataset.program);
  const { _id } = savedProgram;
  if (_id) {
  }
})();

//Expose Component
const CodeEditorComp = {
  setSourceCodeFn,
  getSourceCodeFn,
  setLang
};

export default CodeEditorComp;
