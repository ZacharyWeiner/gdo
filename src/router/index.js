import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( '../views/About.vue')
  }, 
  {
    path: '/chat',
    name: 'Chat',
    component: () => import( '../views/Chat.vue')
    
  },
  {
    path: '/props',
    name: 'Proposals',
    component: () => import( '../views/Proposals.vue')
  },
  {
    path: '/prop-detail',
    name: 'Proposal-Deatil',
    component: () => import( '../views/ProposalDetails.vue')
  },
  {
    path: '/send-prop',
    name: 'Send-Proposal',
    component: () => import( '../views/NewProposalForm.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
