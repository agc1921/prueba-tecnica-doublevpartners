import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PokemonDetailView from '../views/PokemonDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/pokemon', name: 'home', component: HomeView },
    { path: '/pokemon/:name', name: 'pokemon-detail', component: PokemonDetailView },

    { path: '/:pathMatch(.*)*', redirect: '/pokemon' },
  ]
})

export default router