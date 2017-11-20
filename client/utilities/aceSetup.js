import ace from "brace";
import "brace/mode/python";
import "brace/mode/c_cpp";
import "brace/mode/java";
import "brace/mode/javascript";
import "brace/theme/solarized_dark";

const editor = ace.edit("editor");

editor.setTheme("ace/theme/solarized_dark");
editor.getSession().setUseSoftTabs(true);
editor.getSession().setTabSize(2);
editor.getSession().setUseWrapMode(true);

export default editor;
