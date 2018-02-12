import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import AddBook from '@/components/add-book'
import EditBook from '@/components/edit-book'
import AddUser from '@/components/add-user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
        path: '/dodaj-ksiazke',
        name: 'AddBook',
        component: AddBook
    },
      {
          path: '/edytuj-ksiazke',
          name: 'EditBook',
          component: EditBook
      },
    {
        path: '/dodaj-osobe',
        name: 'AddUser',
        component: AddUser
    },
    {
        path: '*',
        redirect: '/'
    }
  ]
})
