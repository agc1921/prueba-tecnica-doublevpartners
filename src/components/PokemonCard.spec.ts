import { mount } from '@vue/test-utils'
import PokemonCard from '@/components/PokemonCard.vue'
import { describe, expect, it } from 'vitest'

describe('PokemonCard', () => {
  const mockPokemon = {
    id: 1,
    name: 'bulbasaur',
    image: 'url1'
  }

  it('renderiza correctamente la info del Pokémon', () => {
    const wrapper = mount(PokemonCard, {
      props: { pokemon: mockPokemon }
    })

    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe(mockPokemon.image)
    expect(img.attributes('alt')).toBe(mockPokemon.name)

    const h3 = wrapper.find('.pokemon-name')
    expect(h3.text()).toBe(`${mockPokemon.id} - ${mockPokemon.name}`)
  })

  it('emite el evento select al hacer click', async () => {
    const wrapper = mount(PokemonCard, {
      props: { pokemon: mockPokemon }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('select')
    expect(wrapper.emitted('select')![0]).toEqual([mockPokemon.id])
  })
})
