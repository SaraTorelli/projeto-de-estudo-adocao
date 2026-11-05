<script setup lang="ts">
// Input de busca reativo com debounce  mantém o valor local e só
// propaga para a store depois de uma pequena pauna de digitação
interface Props {
  modelValue: string
  placeholder?: string
  delay?: number
}

const props = withDefaults(defineProps<Props>(), { placeholder: 'Busque por nome ou temperamento...', delay: 300 })
const emit = defineEmits<{ 'update:modelValue': [valor: string] }>()

const inner = ref(props.modelValue)

// mudanças externas (ex.: limpar filtros) refletem no campo
watch(
  () => props.modelValue,
  (value) => {
    if (value !== inner.value) inner.value = value
  }
)

let timer: ReturnType<typeof setTimeout> | undefined
watch(inner, (value) => {
  clearTimeout(timer)
  timer = setTimeout(() => emit('update:modelValue', value), props.delay)
})

onBeforeUnmount(() => clearTimeout(timer))

function clear() {
  clearTimeout(timer)
  inner.value = ''
  emit('update:modelValue', '')
}
</script>

<template>
  <div class="busca">
    <AppIcone name="lupa" :size="17" class="busca__icone" />
    <input
      v-model="inner"
      type="search"
      class="busca__campo"
      :placeholder="placeholder"
      aria-label="Buscar cães por nome ou temperamento"
    />
    <button v-if="inner" type="button" class="busca__limpar" aria-label="Limpar busca" @click="clear">
      <AppIcone name="fechar" :size="14" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.busca {
  position: relative;
  width: 100%;

  &__icone {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: $tinta-400;
    pointer-events: none;
  }

  &__campo {
    @include superficie-campo;
    padding-left: 40px;
    padding-right: 38px;
    border-radius: $raio-pill;

    &::-webkit-search-cancel-button {
      display: none;
    }
  }

  &__limpar {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 26px;
    height: 26px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: $creme-200;
    color: $tinta-600;

    &:hover {
      background: $linha-300;
    }
  }
}
</style>
