import { createApp, provide, h } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import apolloClient from './apolloClient'
import { DefaultApolloClient } from '@vue/apollo-composable'

const app = createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App)
})

app.use(store)
app.use(router)

app.mount('#app')
