import { createApp } from 'vue';
import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate'; // 匯入 vee-validate 主套件
import rules from '@vee-validate/rules'; // 匯入 vee-validate 全部規則,與上面擇一使用
// import { required, email, min } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n'; // 匯入多國語系的功能
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'; // 匯入繁體中文語系檔案
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import CKEditor from '@ckeditor/ckeditor5-vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { date, dollarSignThousandth } from './methods/filters';
import App from './App.vue';
import router from './router';
import store from './store';

// defineRule('required', required);
// defineRule('email', email);
// defineRule('min', min);

Object.keys(rules).forEach((rule) => {
  defineRule(rule, rules[rule]);
});

configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});

setLocale('zh_TW');

const app = createApp(App).use(store).use(router);
app.use(VueAxios, axios);
app.use(CKEditor);

app.config.globalProperties.$filters = {
  date,
  dollarSignThousandth,
};

app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);
app.component('loading', VueLoading);

app.mount('#app');
