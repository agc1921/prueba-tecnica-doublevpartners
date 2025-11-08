import axios from "axios";

export interface Pokemon {
  id: number;
  name: string;
  image: string;
}

export interface PokemonDetail extends Pokemon {
  weight: number;
  height: number;
  types: string[];
  abilities: string[];
  description: string;
}

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});


export async function getPokemons(limit = 16, offset = 0): Promise<Pokemon[]> {
  try {
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    )

    // Solo devolvemos los datos básicos de la lista
    const results = data.results.map((p: any, index: number) => ({
      id: offset + index + 1,
      name: p.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${offset + index + 1}.png`
    }))

    return results
  } catch (error) {
    console.error('Error al obtener Pokémons:', error)
    return []
  }
}


export async function getPokemonDetail(id: number | string): Promise<PokemonDetail> {
const { data } = await api.get(`/pokemon/${id}`)

  // Obtenemos detalles adicionales (como la descripción)
  const speciesRes = await api.get(`/pokemon-species/${id}`)
  const species = speciesRes.data

  // Extraemos descripción en español o inglés
  const flavor = species.flavor_text_entries.find(
    (entry: any) => entry.language.name === 'es'
  ) || species.flavor_text_entries.find(
    (entry: any) => entry.language.name === 'en'
  )

  return {
    id: data.id,
    name: data.name,
    image: data.sprites.front_default,
    height: data.height / 10, // metros
    weight: data.weight / 10, // kg
    types: data.types.map((t: any) => t.type.name),
    abilities: data.abilities.map((a: any) => a.ability.name),
    description: flavor ? flavor.flavor_text.replace(/\f/g, ' ') : 'Sin descripción disponible',
  }
}
