import _ from 'lodash';

import style from './index.scss';
import languages from './utilities/languages.js';
import editor from './utilities/aceSetup.js';

editor.setValue(`print(47);`);

let currentLang = 'python';

const submitFn = function (event) {
  const sourceCode = editor.getValue();
  fetch('/submit', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      language: currentLang,
      input: '42',
      sourceCode
    })
  }).then(res => {
    if (res.status !== 200) {
      console.error('Couldn\'t connect to server');
      return;
    }
    res.json().then(data => {
      console.log(data);
    }).catch(err => {
      console.log('Some error occured');
    })
  }).catch(err => {
      console.log('Some error occured again');
    })
}

const selectLangFn = function(selectedLang) {
  if(languages.includes(selectedLang)){
    currentLang = selectedLang;
    let aceLang = currentLang;
    if(aceLang === 'c'){
      aceLang = 'c_cpp';
    }
    editor.getSession().setMode(`ace/mode/${aceLang}`);
  }
}

selectLangFn(currentLang);

const langSelFn = function(event) {
  selectLangFn(languages[event.target.selectedIndex]);
}
document.getElementById('langSel').addEventListener('change', langSelFn);

document.getElementById('submitBtn').addEventListener('click', submitFn);

