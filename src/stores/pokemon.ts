import { getPokemonDetail, getPokemons, type Pokemon, type PokemonDetail } from '@/services/PokemonService'
import { defineStore } from 'pinia'

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemons: [] as Pokemon[],
    selectedPokemon: null as PokemonDetail | null,
    loading: false,
    offset: 0,
    limit: 16
  }),

  actions: {
    async fetchPokemons(limit = 16) {
      this.loading = true
      try {
        this.pokemons = await getPokemons(limit, this.offset)
      } finally {
        this.loading = false
      }
    },

    async fetchPokemonDetail(idOrName: number | string) {
      this.loading = true
      try {
        this.selectedPokemon = await getPokemonDetail(idOrName)
      } finally {
        this.loading = false
      }
    },

    nextPage() {
      this.offset += 16
      this.fetchPokemons()
    },

    prevPage() {
      if (this.offset > 0) {
        this.offset -= 16
        this.fetchPokemons()
      }
    }
  },
})
