import { setActivePinia, createPinia } from "pinia";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { usePokemonStore } from "@/stores/pokemon";
import PokemonDetailView from "@/views/PokemonDetailView.vue";
import { mount } from "@vue/test-utils";

describe("PokemonDetailView onMounted", () => {
  let store: ReturnType<typeof usePokemonStore>;
  const mockRouter = { push: vi.fn() };

  beforeEach(() => {
    setActivePinia(createPinia());
    store = usePokemonStore();
    vi.clearAllMocks();
  });

  vi.mock("vue-router", () => ({
    useRoute: vi.fn(() => ({ params: { name: "pikachu" } })),
    useRouter: vi.fn(() => ({ push: vi.fn() })),
  }));

  it("llama fetchPokemonDetail al montarse con el id/nombre correcto", async () => {
    const spy = vi.spyOn(store, "fetchPokemonDetail").mockResolvedValue();

    mount(PokemonDetailView, {
      global: {
        mocks: {
          $route: { params: { name: "pikachu" } },
          $router: mockRouter,
        },
        stubs: ["Loader"],
      },
    });

    expect(spy).toHaveBeenCalledWith("pikachu");
  });
});
