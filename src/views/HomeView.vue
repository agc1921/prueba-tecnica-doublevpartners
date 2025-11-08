<template>
  <div class="home">
    <!-- Encabezado estilo Pokédex -->
    <header class="header">
      <div class="leds">
        <span class="led red"></span>
        <span class="led yellow"></span>
        <span class="led green"></span>
      </div>
      <h1>Pokédex</h1>
    </header>

    <!-- Búsqueda -->
    <InputSearch @search="onSearch" @reset="onReset" />

    <!-- Loader lista -->
    <Loader v-if="store.loading" />

    <!-- Grid -->
    <div v-else class="grid">
      <PokemonCard
        v-for="p in store.pokemons ?? []"
        :key="p.id ?? p.name"
        :pokemon="p"
        @select="goToDetail(p.name)"
      />
    </div>

    <!-- Paginación -->
    <div class="pagination" v-if="!searchMode && !store.loading">
      <button class="page-btn" @click="prevPage" :disabled="store.offset === 0">
        ◀ Anterior
      </button>

      <span class="page-info">Página {{ currentPage }}</span>

      <button
        class="page-btn"
        @click="nextPage"
        :disabled="(store.pokemons?.length ?? 0) < store.limit"
      >
        Siguiente ▶
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import PokemonCard from "../components/PokemonCard.vue";
import InputSearch from "../components/InputSearch.vue";
import Loader from "../components/Loader.vue";
import Swal from "sweetalert2";
import { usePokemonStore } from "@/stores/pokemon";

const router = useRouter();
const store = usePokemonStore(); // 👈 usamos el store

const searchMode = ref(false);

const currentPage = computed(() => Math.floor(store.offset / store.limit) + 1);

const fetchPokemons = async () => {
  await store.fetchPokemons();
};

onMounted(fetchPokemons);

const onSearch = async (term: string) => {
  if (!term.trim()) return;
  store.loading = true;
  searchMode.value = true;

  try {
    await store.fetchPokemonDetail(term.toLowerCase());

    // Si no encuentra Pokémon
    if (!store.selectedPokemon) {
      await onReset(); // resetea si no encuentra
      return;
    }

    // Si encontró Pokémon, actualizar la lista
    store.pokemons = [store.selectedPokemon];
  } catch (error) {
    // Captura errores de la API (por ejemplo, 404)
    Swal.fire({
      icon: "error",
      title: "Pokémon no encontrado",
      text: "Intenta buscar otro nombre o ID.",
      confirmButtonText: "Aceptar",
    });
    await onReset(); // resetea si hay error
  } finally {
    store.loading = false;
  }
};

const onReset = async () => {
  searchMode.value = false;
  store.offset = 0;
  await store.fetchPokemons();
};

const nextPage = async () => {
  await store.nextPage();
};

const prevPage = async () => {
  await store.prevPage();
};

const goToDetail = (id: number | string) => {
  router.push(`/pokemon/${id}`);
};
</script>

<style scoped>
.home {
  background: linear-gradient(145deg, #d32f2f, #b71c1c);
  border-radius: 16px;
  box-shadow: inset 0 0 10px #7b0000, 0 8px 15px rgba(0, 0, 0, 0.4);
  padding: 16px;
  margin: 30px;
  color: #fff;
}

.header {
  background: #b71c1c;
  border: 4px solid #000;
  border-radius: 12px 12px 0 0;
  text-align: center;
  padding: 12px 0 8px;
  position: relative;
  box-shadow: inset 0 0 10px #4a0000;
}

.header h1 {
  font-family: "Press Start 2P", sans-serif;
  font-size: 1.5rem;
  color: #ffeb3b;
  text-shadow: 0 0 10px #fff176;
}

.leds {
  position: absolute;
  left: 12px;
  top: 10px;
  display: flex;
  gap: 8px;
}

.led {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
}
.led.red {
  background: #ff1744;
}
.led.yellow {
  background: #ffeb3b;
}
.led.green {
  background: #00e676;
}

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

.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 16px;
  margin-top: 12px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin: 25px 0;
}

.page-btn {
  background: #ef4444;
  color: white;
  border: 2px solid #000;
  border-radius: 8px;
  padding: 8px 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 0 #7b0000;
  transition: all 0.15s;
}
.page-btn:hover {
  transform: translateY(2px);
  box-shadow: 0 2px 0 #7b0000;
}
.page-btn:disabled {
  background: #777;
  box-shadow: none;
  cursor: not-allowed;
}

.page-info {
  font-family: "Press Start 2P", sans-serif;
  color: #ffeb3b;
  text-shadow: 0 0 6px #fff176;
  font-size: 0.9rem;
}
</style>
