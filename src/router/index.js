import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AddBook from '@/components/add-book'
import AddUser from '@/components/add-user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
        path: '/dodaj-ksiazke',
        name: 'AddBook',
        component: AddBook
    },
    {
        path: '/dodaj-osobe',
        name: 'AddUser',
        component: AddUser
    }
  ]
})
