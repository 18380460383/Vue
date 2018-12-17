import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HelloWorld1 from '@/components/HelloWorld1'
import Banner from '@/components/Banner'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/h1',
      name: 'HelloWorld1',
      component: HelloWorld1
    },
    {
      path: '/banner',
      name: 'Banner',
      component: Banner
    }
  ]
})
