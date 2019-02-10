import Vue from 'vue'
import { Actionsheet,Group,XInput,XImg,Spinner,XButton} from 'vux'
import { LoadingPlugin, ToastPlugin, AlertPlugin } from 'vux'
Vue.use(LoadingPlugin);
Vue.use(ToastPlugin,{position: 'top'});
Vue.use(AlertPlugin);

Vue.component('actionsheet', Actionsheet);
Vue.component('XInput', XInput);
Vue.component('Group', Group);
Vue.component('XImg', XImg);
Vue.component('spinner', Spinner);
Vue.component('XButton', XButton);
