<template>
  <div class="detail">
    <button class="back-btn" @click="router.push('/pokemon')">← Volver</button>

    <Loader v-if="store.loading" />

    <div v-else-if="pokemon" class="card">
      <div class="text-center">
        <img :src="pokemon.image" :alt="pokemon.name" />
      </div>

      <h2 class="pokemon-name">{{ pokemon.name }}</h2>

      <div class="types">
        <span v-for="t in pokemon.types" :key="t" class="type">
          {{ t }}
        </span>
      </div>

      <div class="info">
        <p><strong>Peso:</strong> {{ pokemon.weight }} kg</p>
        <p><strong>Altura:</strong> {{ pokemon.height }} m</p>
        <p><strong>Habilidades:</strong> {{ pokemon.abilities.join(", ") }}</p>
        <p><strong>Descripción:</strong> {{ pokemon.description }}</p>
      </div>
    </div>

    <p v-else>No se encontró el Pokémon 😢</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import Loader from "../components/Loader.vue";
import { usePokemonStore } from "@/stores/pokemon";

const route = useRoute();
const router = useRouter();
const store = usePokemonStore();

const pokemon = computed(() => store.selectedPokemon);

onMounted(async () => {
  const idOrName = route?.params?.name as string;
  await store.fetchPokemonDetail(idOrName);
});
</script>

<style scoped>
.detail {
  max-width: 600px;
  margin: 30px auto;
  padding: 24px;
  text-align: center;
  background: linear-gradient(145deg, #d32f2f, #b71c1c);
  color: white;
  border-radius: 16px;
  box-shadow: inset 0 0 10px #7b0000, 0 8px 15px rgba(0, 0, 0, 0.4);
}

.back-btn {
  background: #ef4444;
  color: white;
  font-weight: 600;
  border: 2px solid #000;
  border-radius: 8px;
  padding: 8px 14px;
  cursor: pointer;
  margin-bottom: 20px;
  box-shadow: 0 4px 0 #7b0000;
}
.back-btn:hover {
  transform: translateY(2px);
  box-shadow: 0 2px 0 #7b0000;
}

.card {
  background: #1b1b1b;
  border-radius: 16px;
  padding: 20px;
  box-shadow: inset 0 0 12px #00c853, inset 0 0 25px #1de9b6;
  color: #fff;
}

.card img {
  width: 200px;
  height: 200px;
}

.types {
  margin: 10px 0;
}

.type {
  display: inline-block;
  background: #ef4444;
  color: white;
  padding: 4px 10px;
  border-radius: 8px;
  margin: 4px;
  font-weight: 500;
  text-transform: capitalize;
}

.info {
  margin-top: 20px;
  text-align: left;
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px 16px;
  border-radius: 12px;
}

.pokemon-name {
  text-transform: capitalize;
}
</style>
