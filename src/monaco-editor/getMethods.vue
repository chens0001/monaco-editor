<template>
  <div>
    hello
  </div>
</template>
<script>
export default {
  name: "getMethods",
  data() {
    return {
      value: "xxx",
    };
  },
  methods: {
    getData() {
      console.log('getData');
    },
    setData() {
      console.log('set data');
    },
    handleTodo() {
      console.log('handleTodo');
    }
  }
};
</script>