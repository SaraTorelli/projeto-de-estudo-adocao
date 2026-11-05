<script setup lang="ts">
// Barra de filtros da listagem: busca em tempo real, categoria, porte, idade,
// sexo, abas de status e ação de limpar  todos os dados vivem na store
import type { FaixaPorte, FaixaIdade, SexoCao } from '~/tipos/api'

const store = useCaesStore()

const opcoesPorte = computed(() => [
  { valor: 'pequeno', rotulo: 'Pequeno' },
  { valor: 'medio', rotulo: 'Médio' },
  { valor: 'grande', rotulo: 'Grande' },
])

const opcoesIdade = computed(() => [
  { valor: 'filhote', rotulo: 'Filhote' },
  { valor: 'jovem', rotulo: 'Jovem' },
  { valor: 'adulto', rotulo: 'Adulto' },
  { valor: 'senior', rotulo: 'Sênior' },
])

const opcoesSexo = computed(() => [
  { valor: 'macho', rotulo: 'Macho' },
  { valor: 'femea', rotulo: 'Fêmea' },
])

const opcoesCategorias = computed(() => store.categorias.map((c) => ({ valor: c, rotulo: c })))

const temFiltrosAtivos = computed(
  () =>
    store.termoBusca !== '' ||
    store.filtroCategoria !== '' ||
    store.filtroPorte !== '' ||
    store.filtroIdade !== '' ||
    store.filtroSexo !== '' ||
    store.abaStatus !== 'todos'
)
</script>

<template>
  <div class="filters">
    <CampoBusca
      class="filters__search"
      :model-value="store.termoBusca"
      @update:model-value="store.definirBusca($event)"
    />

    <div class="filters__lado">
      <AbasStatus class="filters__tabs" />

      <div class="filters__row">
        <BaseSelecao
          class="filters__select"
          :model-value="store.filtroCategoria"
          placeholder="Categoria"
          :opcoes="opcoesCategorias"
          compacto
          @update:model-value="store.definirCategoria($event)"
        />

        <BaseSelecao
          class="filters__select"
          :model-value="store.filtroPorte"
          placeholder="Porte"
          :opcoes="opcoesPorte"
          compacto
          @update:model-value="store.definirPorte($event as FaixaPorte | '')"
        />

        <BaseSelecao
          class="filters__select"
          :model-value="store.filtroIdade"
          placeholder="Idade"
          :opcoes="opcoesIdade"
          compacto
          @update:model-value="store.definirIdade($event as FaixaIdade | '')"
        />

        <BaseSelecao
          class="filters__select"
          :model-value="store.filtroSexo"
          placeholder="Sexo"
          :opcoes="opcoesSexo"
          compacto
          @update:model-value="store.definirSexo($event as SexoCao | '')"
        />

        <button
          v-if="temFiltrosAtivos"
          type="button"
          class="filters__clear"
          @click="store.limparFiltros()"
        >
          <AppIcone name="rotacionar" :size="14" />
          Limpar filtros
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.filters {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: $creme-50;
  border: 1px solid $linha-200;
  border-radius: $raio-grande;
  box-shadow: $sombra-1;
}
.filters {
  display: grid;
  grid-template-columns: minmax(0, 460px) 1fr;
  align-items: center;
  gap: 12px 28px;
  padding: 16px;
  background: $creme-50;
  border: 1px solid $linha-200;
  border-radius: $raio-grande;
  box-shadow: $sombra-1;
}

.filters__search {
  width: 100%;
}
.filters__lado {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}

.filters__row {
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 12px;
}

.filters__select {
  flex: 0 1 150px;
}
@media (max-width: 900px) {
  .filters {
    grid-template-columns: 1fr;
  }

  .filters__lado {
    align-items: stretch;
  }
}

.filters__clear {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font: 600 0.82rem/1 $fonte-sans;
  color: $terracota-500;
  padding: 9px 12px;
  border-radius: $raio-pill;

  &:hover {
    background: $vermelho-100;
  }
}
</style>
