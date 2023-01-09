import Vue from 'vue'
import App from './App.vue'

// import VueCodeMirror from 'vue-codemirror';
// import 'codemirror/lib/codemirror.css';
// Vue.use(VueCodeMirror);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
