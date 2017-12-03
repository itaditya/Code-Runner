import _ from "lodash";

import codingTemplates from "./code_templates";
import style from "./index.scss";

import languages from "./utilities/languages";
import { addEvent, dispatchEvent } from "./utilities/eventBus";
import Preloader from "./utilities/preloader/preloader";

import LangSelComp from "./components/langSel";
import CodeEditorComp from "./components/codeEditor";
import SaveProgramComp from "./components/saveProgram";
import SubmitProgramComp from "./components/submitProgram";
import InputFieldComp from "./components/inputField";
import OutputFieldComp from "./components/outputField";

const outputLoader = new Preloader({}, "#outputPreloaderWrapper");

const savedProgram = JSON.parse(document.body.dataset.program);
console.log(savedProgram);

const onLanguageChange = currentLang => {
  CodeEditorComp.setLang(currentLang);
  CodeEditorComp.setSourceCodeFn(codingTemplates[currentLang]);
};

addEvent("langSel:change", currentLang => {
  onLanguageChange(currentLang);
});

if (savedProgram.title) {
  const { language, sourceCode, input } = savedProgram;
  LangSelComp.selectLangFn(language);
  InputFieldComp.setInputFn(input);
  CodeEditorComp.setLang(language);
  CodeEditorComp.setSourceCodeFn(sourceCode);
} else {
  dispatchEvent("langSel:change", "python");
}

addEvent("submitProgram:click", () => {
  OutputFieldComp.setOutputFn(" ");
  outputLoader.showLoader();
});

addEvent("submitProgram:output", output => {
  OutputFieldComp.setOutputFn(output);
  outputLoader.hideLoader();
});

addEvent("saveProgram:save", data => {
  window.open(`/programs/${data._id}`, "_blank");
});
