<template>
  <monaco-editor
    v-model="value"
    language="javascript"
    :options="{}"
    :hints="['table_name', ...resthints]"
    style="width: 50vw; height: 90vh"
    @clickEditor="handleclick"
  />
</template>
<script>
import MonacoEditor from "./monaco-editor/MonacoEditor.vue";
import GetMethods from "@/monaco-editor/getMethods";
import "monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution";

export default {
  components: {
    MonacoEditor,
    // eslint-disable-next-line vue/no-unused-components
    GetMethods,
  },
  mounted() {
    this.resthints = Object.keys(GetMethods.methods);
  },
  data() {
    return {
      value: "hello world",
      resthints: [],
    };
  },
  methods: {
    handleclick() {
      console.log('hello')
    },
  },
};
</script>

//       value: `<div>
//   <p> span</p>
//   <a>链接</a>
// </div>`,
