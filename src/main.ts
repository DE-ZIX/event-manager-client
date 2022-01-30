import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import { Quasar } from 'quasar';
import quasarUserOptions from './quasar-user-options';
import axios from 'axios';
import VueAxios from 'vue-axios';

createApp(App)
	.use(Quasar, quasarUserOptions)
	.use(store)
	.use(VueAxios, axios)
	.use(router)
	.mount('#app');
