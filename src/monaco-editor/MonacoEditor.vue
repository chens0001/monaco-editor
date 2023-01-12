<template>
  <div ref="editor" class="main"></div>
</template>

<script>
// import * as monaco from "monaco-editor";
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js';
import createJavascriptCompleter from "./util/javascript-completion";
import registerLanguage from "./util/log-language";
const global = {};

const getHints = (model) => {
  let id = model.id.substring(6);
  return (global[id] && global[id].hints) || [];
};

monaco.languages.registerCompletionItemProvider(
  "javascript",
  createJavascriptCompleter(getHints)
);
registerLanguage(monaco);
/**
 * monaco options
 * https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandaloneeditorconstructionoptions.html
 */
export default {
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
    value: {
      type: String,
      required: true,
    },
    language: {
      type: String,
    },
    hints: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  name: "MonacoEditor",
  data() {
    return {
      editorInstance: null,
      defaultOptions: {
        theme: "vs",
        fontSize: 14,
      },
    };
  },
  watch: {
    value() {
      if (this.value !== this.editorInstance.getValue()) {
        this.editorInstance.setValue(this.value);
      }
    },
    // hints: {
    //   handler(newval) {
    //     monaco.languages.registerCompletionItemProvider(
    //       "javascript",
    //       createJavascriptCompleter(getHints, newval)
    //     );
    //     registerLanguage(monaco);
    //   },
    //   immediate: true,
    // },
  },
  mounted() {
    this.initEditor();
    global[this.editorInstance._id] = this;
    window.addEventListener("resize", this.layout);
    console.log(this.editorInstance,'monaco-editor---------------------')
    this.setCode();
  },    
  destroyed() {
    this.editorInstance.dispose();
    global[this.editorInstance._id] = null;
    window.removeEventListener("resize", this.layout);
  },
  methods: {
    layout() {
      this.editorInstance.layout();
    },
    undo() {
      this.editorInstance.trigger("anyString", "undo");
      this.onValueChange();
    },
    redo() {
      this.editorInstance.trigger("anyString", "redo");
      this.onValueChange();
    },
    setCode() {
      // manacoEditor 为 实例对象
      const insertText = `-------<div>hello world</div>------
      
      
      
      
      
      
      
      


      `;
      // 2 插入
      this.editorInstance.executeEdits("insert-code", [
        {
          range: {
            startLineNumber: 10,
            startColumn: 5 ,
            endLineNumber: 10,
            endColumn: 10
          },
          text: insertText,
        },
      ]);
    },
    getOptions() {
      let props = { value: this.value };
      this.language !== undefined && (props.language = this.language);
      let options = Object.assign({}, this.defaultOptions, this.options, props);
      return options;
    },
    handleClick(e) {
      console.log(e, 'click');
    },
    onValueChange() {
      this.$emit("input", this.editorInstance.getValue());
      this.$emit("change", this.editorInstance.getValue());


    },
    initEditor() {
      this.MonacoEnvironment = {
        getWorkerUrl: function () {
          return "./editor.worker.bundle.js";
        },
      };

      this.editorInstance = monaco.editor.create(this.$refs.editor, {
        ...this.getOptions(),
        readOnly: true
      });

      console.log(this.editorInstance, 'editor---------------------');

      this.editorInstance.onContextMenu((e) => {
        this.$emit("contextmenu", e);
      });
      this.editorInstance.onDidChangeModelContent(() => {
        this.onValueChange();
      });
      this.editorInstance.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S,
        () => {
          this.$emit("save", this.editorInstance.getValue());
        }
      );
      this.editorInstance.onKeyDown((e) => {
        console.log(e,' keydown');
        this.$emit("clickEditor");
      })
    },
  },
};
</script>

<style scoped>
.main /deep/ .view-lines * {
  font-family: Consolas, "Courier New", monospace;
}
</style>
