<script setup lang="ts">
// Paginação com seletor de quantidade por página, numeração com elisão e resumo do intervalo exibido
interface Props {
  pagina: number
  itensPorPagina: number
  total: number
  tamanhosPagina?: number[]
}

const props = withDefaults(defineProps<Props>(), { tamanhosPagina: () => [8, 12, 16, 24] })
const emit = defineEmits<{ 'update:pagina': [pagina: number]; 'update:itensPorPagina': [tamanho: number] }>()

const totalPaginas = computed(() => Math.max(1, Math.ceil(props.total / props.itensPorPagina)))

const rotuloIntervalo = computed(() => {
  if (props.total === 0) return 'Nenhum resultado'
  const inicio = (props.pagina - 1) * props.itensPorPagina + 1
  const fim = Math.min(props.pagina * props.itensPorPagina, props.total)
  return `Exibindo ${inicio} a ${fim} de ${props.total} ${props.total === 1 ? 'cão' : 'cães'}`
})

// numeração compacta: 1 … 4 5 6 … 12
const paginas = computed<(number | '...')[]>(() => {
  const total = totalPaginas.value
  const atual = props.pagina
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const janela = [atual - 1, atual, atual + 1].filter((p) => p > 1 && p < total)
  const lista: (number | '...')[] = [1]
  const inicioJanela = janela[0]
  if (inicioJanela !== undefined && inicioJanela > 2) lista.push('...')
  lista.push(...janela)
  const fimJanela = janela[janela.length - 1]
  if (fimJanela !== undefined && fimJanela < total - 1) lista.push('...')
  lista.push(total)
  return lista
})

function ir(pagina: number) {
  emit('update:pagina', Math.min(Math.max(1, pagina), totalPaginas.value))
}
</script>

<template>
  <div v-if="total > 0 || pagina > 1" class="paginacao">
    <p class="paginacao__resumo">{{ rotuloIntervalo }}</p>

    <div class="paginacao__navegacao" v-if="totalPaginas > 1">
      <button
        type="button"
        class="botao-pagina"
        :disabled="pagina === 1"
        aria-label="Página anterior"
        @click="ir(pagina - 1)"
      >
        <AppIcone name="seta-esquerda" :size="15" />
      </button>

      <template v-for="(item, i) in paginas" :key="`${item}-${i}`">
        <span v-if="item === '...'" class="paginacao__reticencias">...</span>
        <button
          v-else
          type="button"
          class="botao-pagina botao-pagina--numero"
          :class="{ 'botao-pagina--ativo': item === pagina }"
          :aria-current="item === pagina ? 'page' : undefined"
          @click="ir(item)"
        >
          {{ item }}
        </button>
      </template>

      <button
        type="button"
        class="botao-pagina"
        :disabled="pagina === totalPaginas"
        aria-label="Próxima página"
        @click="ir(pagina + 1)"
      >
        <AppIcone name="seta-direita" :size="15" />
      </button>
    </div>

    <label class="paginacao__tamanho">
      <span>Exibir</span>
      <select
        :value="itensPorPagina"
        aria-label="Cães por página"
        @change="emit('update:itensPorPagina', Number(($event.target as HTMLSelectElement).value))"
      >
        <option v-for="op in tamanhosPagina" :key="op" :value="op">{{ op }}</option>
      </select>
      <span>por página</span>
    </label>
  </div>
</template>

<style scoped lang="scss">
.paginacao {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  padding-top: 8px;
}

.paginacao__resumo {
  font-size: 0.84rem;
  color: $tinta-400;
  font-weight: 500;
}

.paginacao__navegacao {
  display: flex;
  align-items: center;
  gap: 6px;
}

.botao-pagina {
  min-width: 36px;
  height: 36px;
  padding: 0 8px;
  border-radius: $raio-pequeno;
  display: grid;
  place-items: center;
  background: $creme-50;
  border: 1px solid $linha-200;
  font: 600 0.85rem/1 $fonte-sans;
  color: $tinta-700;
  transition: all 0.15s ease;

  &:hover:not(:disabled):not(.botao-pagina--ativo) {
    border-color: $marrom-500;
    color: $marrom-700;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &--ativo {
    background: $marrom-700;
    border-color: $marrom-700;
    color: $creme-50;
  }
}

.paginacao__reticencias {
  color: $tinta-400;
  padding: 0 2px;
}

.paginacao__tamanho {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
  color: $tinta-600;

  select {
    @include superficie-campo;
    width: auto;
    padding: 7px 30px 7px 12px;
    border-radius: $raio-pequeno;
    cursor: pointer;
  }
}
</style>
