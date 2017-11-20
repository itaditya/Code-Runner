import _ from 'lodash';

import style from './index.scss';
import languages from './utilities/languages';
import editor from './utilities/aceSetup';
import { Preloader } from './utilities/preloader/preloader';
import codingTemplates from './code_templates';

const outputLoader = new Preloader({}, '#outputPreloaderWrapper');

const submitBtn = document.getElementById('submitBtn');
const langSel = document.getElementById('langSel');
const outputTxt = document.getElementById('outputTxt');
const inputTxt = document.getElementById('inputTxt');
let currentLang = 'python';

editor.setValue(codingTemplates[currentLang]);

const submitFn = function(event) {
  const sourceCode = editor.getValue();
  const input = inputTxt.value;
  inputTxt.disabled = true;
  submitBtn.disabled = true;
  editor.setReadOnly(true);
  outputTxt.value = ' ';
  outputLoader.showLoader();
  fetch('/submit', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      language: currentLang,
      input,
      sourceCode
    })
  })
    .then(res => {
      if (res.status !== 200) {
        console.error('Couldn\'t connect to server');
        return;
      }
      res
        .json()
        .then(data => {
          let outputHtml = data.stdout;
          if (data.stderr.length !== 0) {
            outputHtml = `Error \n${data.stderr}`;
          }
          outputTxt.value = outputHtml;
        })
        .catch(err => {
          console.log('Some error occured');
        });
    })
    .catch(err => {
      console.log('Some error occured again');
    })
    .then(() => {
      inputTxt.disabled = false;
      submitBtn.disabled = false;
      outputLoader.hideLoader();
      editor.setReadOnly(false);
    });
};

const selectLangFn = function(selectedLang) {
  if (languages.includes(selectedLang)) {
    currentLang = selectedLang;
    let aceLang = currentLang;
    if (aceLang === 'c') {
      aceLang = 'c_cpp';
    }
    editor.getSession().setMode(`ace/mode/${aceLang}`);
    editor.setValue(codingTemplates[currentLang]);
  }
};

selectLangFn(currentLang);

const langSelFn = function(event) {
  selectLangFn(languages[event.target.selectedIndex]);
};

submitBtn.addEventListener('click', submitFn);
langSel.addEventListener('change', langSelFn);
