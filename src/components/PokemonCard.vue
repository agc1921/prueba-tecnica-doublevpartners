<template>
  <div class="pokemon-card" @click="$emit('select', pokemon.id)">
    <img :src="pokemon.image" :alt="pokemon.name" />
    <h3 class="pokemon-name">{{ pokemon.id }} - {{ pokemon.name }}</h3>
  </div>
</template>

<script setup lang="ts">
import type { Pokemon } from '../services/PokemonService'

defineProps<{ pokemon: Pokemon }>()
defineEmits<{ (e: 'select', id: number): void }>()
</script>

<style scoped>
.pokemon-card {
  cursor: pointer;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px 30px;
  transition: 0.2s;
  background: white;
}
.pokemon-card:hover {
  transform: scale(1.05);
  background: #f7f7f7;
}
img {
  width: 96px;
  height: 96px;
}
.pokemon-name {
  text-transform: capitalize;
  color: #333;
  font-weight: 200;
  font-size: 1.1rem;
}
</style>
