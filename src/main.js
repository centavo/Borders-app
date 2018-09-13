import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App.vue';
import ChangeCase from 'change-case';

Vue.use(VueResource);

Vue.http.options.root = 'https://restcountries.eu/rest/v2/name/'

new Vue({
  el: '#app',
  render: h => h(App)
});


