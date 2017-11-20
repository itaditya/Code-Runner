//Define Variables
let submitProgramElem,
  language,
  input,
  sourceCode,
  callbacksToTrigger = {};

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
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    })
    .then(() => {});
};

const watchCurrentLang = lang => {
  language = lang;
};

const watchSourceCode = code => {
  sourceCode = code;
};

const watchInput = inputData => {
  input = inputData;
};

const attachCallback = (eventType, callback) => {
  if (!callbacksToTrigger[eventType]) {
    callbacksToTrigger[eventType] = [];
  }
  callbacksToTrigger[eventType].push(callback);
};

//Private Functions

const _onClick = event => {
  submitProgramElem.disabled = true;
  _triggerCallbacks("click");
  submitProgram(({ stderr, stdout }) => {
    let output = stdout;
    if (stderr.length !== 0) {
      output = `Error \n${stderr}`;
    }
    submitProgramElem.disabled = false;
    _triggerCallbacks("output", output);
  });
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
  //DOM binding
  submitProgramElem = document.getElementById("submitBtn");

  //Event Bindings
  submitProgramElem.addEventListener("click", _onClick);
})();

//Expose Component
const SubmitProgramComp = {
  submitProgram,
  watchCurrentLang,
  watchSourceCode,
  watchInput,
  attachCallback
};

export default SubmitProgramComp;
