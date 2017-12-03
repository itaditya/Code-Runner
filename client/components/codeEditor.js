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

//init
(() => {
  //Setup Ace Editor
  editor = ace.edit('editor');

  editor.setTheme('ace/theme/solarized_dark');
  editor.getSession().setUseSoftTabs(true);
  editor.getSession().setTabSize(2);
  editor.getSession().setUseWrapMode(true);
})();

//Expose Component
const CodeEditorComp = {
  setSourceCodeFn,
  getSourceCodeFn,
  setLang
};

export default CodeEditorComp;
