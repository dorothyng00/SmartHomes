import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
import {
  Avatar,
  TreeSelect,
  Rate,
  Breadcrumb,
  InputNumber,
  Steps,
  // Message,
  Upload,
  Button,
  Layout,
  Table,
  Icon,
  Progress,
  Radio,
  Dropdown,
  Menu,
  Input,
  Badge,
  Form,
  Tooltip,
  Select,
  Switch,
  Tag,
  Affix,
  Spin,
  Alert,
  Checkbox,
  Tabs,
  Pagination,
  notification,
  Drawer,
  Cascader,
  DatePicker,
  TimePicker,
  Divider,
  Anchor,
  AutoComplete,
  Card,
  List,
  Popover,
  Tree,
  Timeline,
  Row,
  Col,
  Transfer,
  Modal,
  message,
  Popconfirm,
  Skeleton,
  LocaleProvider,
  FormModel,
  Calendar,
  Slider,
  Collapse
} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false

Vue.use(Avatar)
Vue.use(TreeSelect)
Vue.use(Rate)
Vue.use(Breadcrumb)
Vue.use(InputNumber)
Vue.use(Steps)
// Vue.use(Message)
Vue.use(Upload)
Vue.use(Button)
Vue.use(Layout)
Vue.use(Table)
Vue.use(Icon)
Vue.use(Progress)
Vue.use(Radio)
Vue.use(Dropdown)
Vue.use(Menu)
Vue.use(Input)
Vue.use(Badge)
Vue.use(Form)
Vue.use(Tooltip)
Vue.use(Select)
Vue.use(Switch)
Vue.use(Tag)
Vue.use(Affix)
Vue.use(Spin)
Vue.use(Alert)
Vue.use(Checkbox)
Vue.use(Tabs)
Vue.use(Pagination)
Vue.use(notification)
Vue.use(Drawer)
Vue.use(Cascader)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Divider)
Vue.use(Anchor)
Vue.use(AutoComplete)
Vue.use(Card)
Vue.use(List)
Vue.use(Popover)
Vue.use(Tree)
Vue.use(Timeline)
Vue.use(Row)
Vue.use(Col)
Vue.use(Transfer)
Vue.use(Modal)
Vue.use(message)
Vue.use(Popconfirm)
Vue.use(Skeleton)
Vue.use(LocaleProvider)
Vue.use(FormModel)
Vue.use(Slider)
Vue.use(Collapse)
Vue.use(Calendar)
Vue.use(VueResource)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
