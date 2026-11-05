<script setup lang="ts">
// Filtro visual de status: todos, disponíveis, favoritos e adotados
import type { AbaStatus } from '~/tipos/api'

const store = useCaesStore()

const ABAS = computed(() => [
  { key: 'todos' as AbaStatus, rotulo: 'Todos', icone: 'pata' as const, count: store.passamFiltros.length },
  { key: 'disponiveis' as AbaStatus, rotulo: 'Disponíveis', icone: 'faisca' as const, count: store.passamFiltros.filter((b) => !store.statusDe(b.id).adotado).length },
  { key: 'favoritos' as AbaStatus, rotulo: 'Favoritos', icone: 'coracao' as const, count: store.passamFiltros.filter((b) => store.statusDe(b.id).favoritado).length },
  { key: 'adotados' as AbaStatus, rotulo: 'Adotados', icone: 'casa' as const, count: store.passamFiltros.filter((b) => store.statusDe(b.id).adotado).length },
])
</script>

<template>
  <div class="abas" role="tablist" aria-label="Filtrar por status">
    <button
      v-for="tab in ABAS"
      :key="tab.key"
      type="button"
      role="tab"
      class="aba"
      :class="{ 'aba--ativo': store.abaStatus === tab.key }"
      :aria-selected="store.abaStatus === tab.key"
      @click="store.definirAba(tab.key)"
    >
      <AppIcone :name="tab.icone" :size="14" :preenchido="tab.key === 'favoritos' && store.abaStatus === tab.key" />
      {{ tab.rotulo }}
      <span class="aba__contagem">{{ tab.count }}</span>
    </button>
  </div>
</template>

<style scoped lang="scss">
.abas {
  display: inline-flex;
  gap: 6px;
  background: $creme-200;
  padding: 5px;
  border-radius: $raio-pill;
  @media (max-width: 640px) {
    flex-wrap: wrap;
    border-radius: $raio-medio;
  }
}

.aba {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 16px;
  border-radius: $raio-pill;
  font: 600 0.84rem/1 $fonte-sans;
  color: $tinta-600;
  transition: all 0.15s ease;

  &:hover {
    color: $marrom-700;
  }

  &__contagem {
    background: rgba(255, 253, 248, 0.9);
    border-radius: $raio-pill;
    min-width: 22px;
    height: 20px;
    display: grid;
    place-items: center;
    font-size: 0.72rem;
    padding: 0 6px;
    color: $tinta-400;
  }

  &--ativo {
    background: $marrom-700;
    color: $creme-50;
    box-shadow: 0 6px 14px -6px rgba(95, 55, 34, 0.5);
    &:hover {
      color: $creme-50;
    }

    .aba__contagem {
      background: rgba(255, 253, 248, 0.2);
      color: $creme-50;
    }
  }
}
</style>
