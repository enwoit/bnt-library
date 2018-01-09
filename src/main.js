// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css';


import router from './router/index'

const authToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MTUzMjYzOTYsImNsaWVudElkIjoiY2pjNHE3bGcyMDduMzAxMjk5cWE0eGx0aSJ9.Ujb_lqRUny8NAL1leNJyt3u_ywAEeNT6Cl2p3rKtroE'
const httpLink = new HttpLink({
    // You should use an absolute URL here
    // uri: 'http://localhost:3020/graphql',
    uri: 'https://api.graph.cool/simple/v1/cjc4q7ng209920163h7tv15vq',
    transportBatching: true,
})

// const client = new ApolloClient({
//     link: new HttpLink({ uri: 'http://api.graph.cool/simple/v1/cjc4q7ng209920163h7tv15vq' }),
//     cache: new InMemoryCache()
// })

// Create the apollo client
const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    connectToDevTools: true,
})

// Install the vue plugin
Vue.use(VueApollo)
Vue.use(Vuetify)

Vue.config.productionTip = false

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})

new Vue({
    el: '#app',
    apolloProvider,
    router,
    render: h => h(App),
})
