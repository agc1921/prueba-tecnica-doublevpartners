import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { usePokemonStore } from '@/stores/pokemon'
import * as PokemonService from '@/services/PokemonService'

describe('Pokemon Store', () => {
  let store: ReturnType<typeof usePokemonStore>

  const mockPokemons = [
    { id: 1, name: 'bulbasaur', image: 'url1' },
    { id: 2, name: 'ivysaur', image: 'url2' },
  ]

  const mockPokemonDetail = {
    id: 1,
    name: 'bulbasaur',
    image: 'url1',
    height: 0.7,
    weight: 6.9,
    types: ['grass', 'poison'],
    abilities: ['overgrow', 'chlorophyll'],
    description: 'Test description',
  }

  beforeEach(() => {
    setActivePinia(createPinia())
    store = usePokemonStore()
  })

  it('state inicial', () => {
    expect(store.pokemons).toEqual([])
    expect(store.selectedPokemon).toBeNull()
    expect(store.loading).toBe(false)
    expect(store.offset).toBe(0)
    expect(store.limit).toBe(16)
  })

  it('fetchPokemons actualiza pokemons y loading', async () => {
    vi.spyOn(PokemonService, 'getPokemons').mockResolvedValue(mockPokemons)

    const promise = store.fetchPokemons()
    expect(store.loading).toBe(true)
    await promise
    expect(store.loading).toBe(false)
    expect(store.pokemons).toEqual(mockPokemons)
  })

  it('fetchPokemonDetail actualiza selectedPokemon y loading', async () => {
    vi.spyOn(PokemonService, 'getPokemonDetail').mockResolvedValue(mockPokemonDetail)

    const promise = store.fetchPokemonDetail(1)
    expect(store.loading).toBe(true)
    await promise
    expect(store.loading).toBe(false)
    expect(store.selectedPokemon).toEqual(mockPokemonDetail)
  })

  it('nextPage incrementa offset y llama fetchPokemons', async () => {
    const fetchSpy = vi.spyOn(store, 'fetchPokemons').mockResolvedValue()
    store.nextPage()
    expect(store.offset).toBe(16)
    expect(fetchSpy).toHaveBeenCalled()
    fetchSpy.mockRestore()
  })

  it('prevPage decrementa offset correctamente y llama fetchPokemons', async () => {
    store.offset = 32
    const fetchSpy = vi.spyOn(store, 'fetchPokemons').mockResolvedValue()
    store.prevPage()
    expect(store.offset).toBe(16)
    expect(fetchSpy).toHaveBeenCalled()
    fetchSpy.mockRestore()
  })

  it('prevPage no decrementa offset por debajo de 0', async () => {
    store.offset = 0
    const fetchSpy = vi.spyOn(store, 'fetchPokemons').mockResolvedValue()
    store.prevPage()
    expect(store.offset).toBe(0)
    expect(fetchSpy).not.toHaveBeenCalled()
  })
})
