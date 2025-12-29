import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Article from '../views/Article.vue'
import Archive from '../views/Archive.vue'
import About from '../views/About.vue'
import Games from '../views/Games.vue'
import Resources from '../views/Resources.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: Article
  },
  {
    path: '/archive',
    name: 'Archive',
    component: Archive
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/games',
    name: 'Games',
    component: Games
  },
  {
    path: '/resources',
    name: 'Resources',
    component: Resources
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
