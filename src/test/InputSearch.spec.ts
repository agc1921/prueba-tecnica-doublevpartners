import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import InputSearch from '@/components/InputSearch.vue'

describe('InputSearch', () => {
  it('emite "search" con el término ingresado al hacer click en Buscar o al presionar Enter en el input', async () => {
    const wrapper = mount(InputSearch)
    
    const input = wrapper.find('input')
    await input.setValue('pikachu')

    const searchBtn = wrapper.find('button')
    await searchBtn.trigger('click')

    expect(wrapper.emitted('search')).toBeTruthy()
    expect(wrapper.emitted('search')?.[0]).toEqual(['pikachu'])
  })

  it('emite "reset" y limpia input al hacer click en Ver todos', async () => {
    const wrapper = mount(InputSearch)
    
    const input = wrapper.find('input')
    await input.setValue('charmander')

    const resetBtn = wrapper.findAll('button')[1] 
    await resetBtn?.trigger('click')

    expect(wrapper.emitted('reset')).toBeTruthy()
    expect(input.element.value).toBe('')
  })
})
