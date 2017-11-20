import _ from "lodash";

import codingTemplates from "./code_templates";
import style from "./index.scss";

import languages from "./utilities/languages";
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
  SubmitProgramComp.watchCurrentLang(currentLang);
  SaveProgramComp.watchCurrentLang(currentLang);
  CodeEditorComp.setLang(currentLang);
  CodeEditorComp.setSourceCodeFn(codingTemplates[currentLang]);
};

if (savedProgram.title) {
  const { language, sourceCode, input } = savedProgram;
  SubmitProgramComp.watchCurrentLang(language);
  SaveProgramComp.watchCurrentLang(language);
  CodeEditorComp.setLang(language);
  CodeEditorComp.setSourceCodeFn(sourceCode);
  LangSelComp.selectLangFn(language);
  InputFieldComp.setInputFn(input);
} else {
  onLanguageChange("python");
}

LangSelComp.attachCallback("change", () => {
  const currentLang = LangSelComp.getSelectedLangFn();
  onLanguageChange(currentLang);
});

SubmitProgramComp.attachCallback("click", () => {
  const sourceCode = CodeEditorComp.getSourceCodeFn();
  SubmitProgramComp.watchSourceCode(sourceCode);

  const input = InputFieldComp.getInputFn();
  SubmitProgramComp.watchInput(input);
});

SaveProgramComp.attachCallback("click", () => {
  const sourceCode = CodeEditorComp.getSourceCodeFn();
  SaveProgramComp.watchSourceCode(sourceCode);

  const input = InputFieldComp.getInputFn();
  SaveProgramComp.watchInput(input);
});

SubmitProgramComp.attachCallback("output", output => {
  console.log(output);
  OutputFieldComp.setOutputFn(output);
});

SaveProgramComp.attachCallback("save", data => {
  window.open(`/programs/${data._id}`, "_blank");
  console.log(data);
});
