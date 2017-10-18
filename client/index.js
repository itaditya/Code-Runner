import _ from 'lodash'
import ace from 'brace';

import style from './index.scss';
import 'brace/mode/python';
import 'brace/theme/solarized_dark';

const editor = ace.edit('editor');
editor.setTheme('ace/theme/solarized_dark');
editor.getSession().setMode('ace/mode/python');
editor.getSession().setUseSoftTabs(true);
editor.getSession().setTabSize(2);
editor.getSession().setUseWrapMode(true);

editor.setValue('print (43)');

const submitFn = function (event) {
  const sourceCode = editor.getValue();
  console.log(sourceCode);
  fetch('/submit', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      ext: '.py',
      sourceCode,
      input: '42'
    })
  }).then(res => {
    if (res.status !== 200) {
      console.error('Couldn\'t connect to server');
      return;
    }
    res.json().then(data => {
      console.log(data);
    })
  })

}

document.getElementById('submitBtn').addEventListener('click', submitFn);
