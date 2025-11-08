import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { usePokemonStore } from '@/stores/pokemon'

describe('HomeView', () => {
  let store: ReturnType<typeof usePokemonStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = usePokemonStore()
  })

  it('onReset reinicia offset y llama fetchPokemons', async () => {
    vi.spyOn(store, 'fetchPokemons').mockResolvedValue()
    store.offset = 16

    store.offset = 0
    await store.fetchPokemons()

    expect(store.offset).toBe(0)
    expect(store.fetchPokemons).toHaveBeenCalled()
  })

  it('nextPage incrementa offset y llama fetchPokemons', async () => {
    vi.spyOn(store, 'fetchPokemons').mockResolvedValue()
    await store.nextPage()
    expect(store.offset).toBe(16)
    expect(store.fetchPokemons).toHaveBeenCalled()
  })

  it('prevPage decrementa offset y llama fetchPokemons', async () => {
    vi.spyOn(store, 'fetchPokemons').mockResolvedValue()
    store.offset = 32
    await store.prevPage()
    expect(store.offset).toBe(16)
    expect(store.fetchPokemons).toHaveBeenCalled()
  })
})
