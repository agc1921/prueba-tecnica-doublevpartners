<template>
  <div class="search-row">
    <input
      v-model="searchTerm"
      @keyup.enter="searchPokemon"
      type="text"
      placeholder="Buscar Pokémon por nombre o #..."
      class="form-control"
    />
    <button @click="searchPokemon">Buscar</button>
    <button @click="resetList" class="btn-ghost">Ver todos</button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";

const searchTerm = ref("");

const emits = defineEmits<{
  (e: "search", term: string): void;
  (e: "reset"): void;
}>();

const searchPokemon = () => {
  emits("search", searchTerm.value);
};

const resetList = () => {
  searchTerm.value = "";
  emits("reset");
};
</script>

<style scoped>
.search-row {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
}

.search-row input {
  width: 420px;
  padding: 10px 12px;
  border-radius: 8px;
  border: none;
  outline: none;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.4);
}

.search-row button {
  background: #ef4444;
  color: white;
  padding: 8px 14px;
  border-radius: 8px;
  border: 2px solid #000;
  cursor: pointer;
  box-shadow: 0 3px 0 #7b0000;
  transition: all 0.15s;
}
.search-row button:hover {
  transform: translateY(1px);
  box-shadow: 0 1px 0 #7b0000;
}
.search-row .btn-ghost {
  background: #222;
  color: #fff;
  border: 2px solid #555;
}
</style>
