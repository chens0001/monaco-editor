<template>
  <monaco-editor
    v-model="value"
    language="javascript"
    :options="{}"
    :hints="['table_name']"
    style="width:50vw;height:90vh"
  />
</template>
<script>
import MonacoEditor from "./monaco-editor/MonacoEditor.vue";
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
export default {
  components: {
    MonacoEditor,
  },
  data() {
    return {
      value: "xxx",
    };
  },
};
</script>