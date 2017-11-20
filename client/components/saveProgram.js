//Define Variables
let saveProgramElem,
  language,
  input,
  sourceCode,
  callbacksToTrigger = {};

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
  saveProgramElem.disabled = true;
  _triggerCallbacks("click");
  saveProgram(data => {
    saveProgramElem.disabled = false;
    _triggerCallbacks("save", data);
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
  saveProgramElem = document.getElementById("saveBtn");

  //Event Bindings
  saveProgramElem.addEventListener("click", _onClick);
})();

//Expose Component
const SaveProgramComp = {
  saveProgram,
  watchCurrentLang,
  watchSourceCode,
  watchInput,
  attachCallback
};

export default SaveProgramComp;
